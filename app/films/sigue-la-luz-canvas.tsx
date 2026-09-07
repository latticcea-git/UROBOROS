"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import {
  cinematicFrames,
  reducedMotionFrameIds,
  withFilmsBasePath,
} from "./sigue-la-luz-data";
import type { CinematicFrame } from "./sigue-la-luz-data";
import styles from "./films.module.css";

type ProgressRef = MutableRefObject<{ value: number }>;
type DecodedFrame = ImageBitmap | HTMLImageElement;
type CachedBitmap = { bitmap: DecodedFrame; lastUsed: number };
type PendingBitmap = { controller: AbortController; promise: Promise<DecodedFrame> };
type ViewportTier = "desktop" | "tablet" | "mobile";

const CINEMATIC_START = 0.49;
const CINEMATIC_END = 0.96;

function getViewportTier(): ViewportTier {
  if (window.matchMedia("(max-width: 700px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1100px)").matches) return "tablet";
  return "desktop";
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function masterToCinematic(masterProgress: number) {
  const value = clamp(masterProgress);
  if (value <= CINEMATIC_START) return 0;
  if (value >= CINEMATIC_END) return 1;
  return (value - CINEMATIC_START) / (CINEMATIC_END - CINEMATIC_START);
}

function interpolateScale(start: number, end: number, progress: number) {
  const safeStart = Math.max(start, 0.0001);
  const safeEnd = Math.max(end, safeStart);
  return Math.exp(
    Math.log(safeStart) + (Math.log(safeEnd) - Math.log(safeStart)) * clamp(progress),
  );
}

function smoothstep(start: number, end: number, value: number) {
  const progress = clamp((value - start) / Math.max(end - start, 0.0001));
  return progress * progress * (3 - 2 * progress);
}

function drawCover(
  canvas: HTMLCanvasElement,
  bitmap: DecodedFrame,
  descriptor: CinematicFrame,
  cropScale = 1,
  cropPivotX = 0.5,
  cropPivotY = 0.5,
) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imageWidth = bitmap.width;
  const imageHeight = bitmap.height;
  const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
  let sourceWidth = canvasWidth / scale;
  let sourceHeight = canvasHeight / scale;
  const focalX = descriptor.focalX ?? 0.5;
  const focalY = descriptor.focalY ?? 0.5;
  let sourceX = clamp(imageWidth * focalX - sourceWidth / 2, 0, imageWidth - sourceWidth);
  let sourceY = clamp(imageHeight * focalY - sourceHeight / 2, 0, imageHeight - sourceHeight);

  if (cropScale > 1) {
    const anchorX = sourceX + sourceWidth * cropPivotX;
    const anchorY = sourceY + sourceHeight * cropPivotY;
    sourceWidth /= cropScale;
    sourceHeight /= cropScale;
    sourceX = clamp(anchorX - sourceWidth * cropPivotX, 0, imageWidth - sourceWidth);
    sourceY = clamp(anchorY - sourceHeight * cropPivotY, 0, imageHeight - sourceHeight);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "medium";
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(
    bitmap,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    canvasWidth,
    canvasHeight,
  );
}

async function fetchBitmap(primary: string, fallback: string, signal: AbortSignal) {
  const load = async (source: string) => {
    const response = await fetch(withFilmsBasePath(source), { cache: "force-cache", signal });
    if (!response.ok) throw new Error(`Unable to load cinematic frame: ${source}`);
    const blob = await response.blob();
    if ("createImageBitmap" in window) return window.createImageBitmap(blob);

    const image = new Image();
    const objectUrl = URL.createObjectURL(blob);
    image.decoding = "async";
    image.src = objectUrl;
    try {
      await image.decode();
      return image;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  try {
    return await load(primary);
  } catch (error) {
    if (signal.aborted) throw error;
    return load(fallback);
  }
}

export default function SigueLaLuzCanvas({
  progress,
  reducedMotion,
}: {
  progress: ProgressRef;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const cache = new Map<string, CachedBitmap>();
    const pending = new Map<string, PendingBitmap>();
    let renderedId = "";
    let activeProtectedIds = new Set<string>();
    let request = 0;
    let requestedRevision = 0;
    let renderInFlight = false;
    let renderQueued = false;
    let queuedForce = false;
    let lastProgress = -1;
    let displayedProgress = reducedMotion ? 0 : clamp(progress.current.value);
    let lastTickTime = performance.now();
    let lastWidth = 0;
    let lastHeight = 0;

    const selectedFrames = reducedMotion
      ? cinematicFrames.filter((item) => reducedMotionFrameIds.includes(item.id as (typeof reducedMotionFrameIds)[number]))
      : cinematicFrames;

    let viewportTier = getViewportTier();

    const getSources = (descriptor: CinematicFrame, tier: ViewportTier) => {
      if (tier === "mobile") return [descriptor.mobile, descriptor.mobileFallback];
      if (tier === "tablet") return [descriptor.tablet, descriptor.tabletFallback];
      return [descriptor.desktop, descriptor.desktopFallback];
    };

    let decodeTimer = 0;

    const touch = (id: string) => {
      const item = cache.get(id);
      if (item) item.lastUsed = performance.now();
    };

    const trimCache = (protectedIds: Set<string>) => {
      const candidates = [...cache.entries()]
        .filter(([id]) => !protectedIds.has(id))
        .sort((a, b) => a[1].lastUsed - b[1].lastUsed);

      // Public V1 intentionally uses a small set of long camera plates. Keeping the
      // complete active tier decoded removes the pause that used to happen at
      // every photographic handoff while staying below the previous memory
      // budget (five plates instead of twenty-seven).
      const maxDecodedFrames = selectedFrames.length;
      while (cache.size > maxDecodedFrames && candidates.length) {
        const [id, item] = candidates.shift()!;
        if ("close" in item.bitmap) item.bitmap.close();
        cache.delete(id);
      }
      root.dataset.decodedFrames = String(cache.size);
    };

    const loadFrame = (descriptor: CinematicFrame, tier: ViewportTier) => {
      const cacheKey = `${tier}:${descriptor.id}`;
      const cached = cache.get(cacheKey);
      if (cached) {
        touch(cacheKey);
        return Promise.resolve(cached.bitmap);
      }

      const loading = pending.get(cacheKey);
      if (loading) return loading.promise;

      const [primary, fallback] = getSources(descriptor, tier);
      const controller = new AbortController();
      const clearPending = () => {
        if (pending.get(cacheKey)?.controller === controller) pending.delete(cacheKey);
        root.dataset.pendingFrames = String(pending.size);
      };
      const promise = fetchBitmap(primary, fallback, controller.signal)
        .then((bitmap) => {
          clearPending();
          if (controller.signal.aborted) {
            if ("close" in bitmap) bitmap.close();
            throw new DOMException("Frame load cancelled", "AbortError");
          }
          cache.set(cacheKey, { bitmap, lastUsed: performance.now() });
          trimCache(activeProtectedIds);
          return bitmap;
        })
        .catch((error) => {
          clearPending();
          throw error;
        });
      pending.set(cacheKey, { controller, promise });
      root.dataset.pendingFrames = String(pending.size);
      return promise;
    };

    const decodeTier = async (tier: ViewportTier) => {
      await Promise.all(
        selectedFrames.map((descriptor) =>
          loadFrame(descriptor, tier).catch(() => undefined),
        ),
      );
      root.dataset.predecodedTier = tier;
      root.dataset.predecodeComplete = "true";
    };

    // The approved opening gives enough time to decode every camera plate
    // before photography begins. A handoff therefore never waits on I/O.
    decodeTimer = window.setTimeout(() => {
      void decodeTier(viewportTier);
    }, 40);

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const nextTier = getViewportTier();
      const tierChanged = nextTier !== viewportTier;
      viewportTier = nextTier;
      if (tierChanged) {
        root.dataset.predecodeComplete = "false";
        void decodeTier(viewportTier);
      }
      root.dataset.viewportTier = viewportTier;
      // The web derivatives already match their target tier. Rendering beyond
      // their native pixel density only adds canvas work and makes scroll feel
      // sticky without revealing more detail.
      const dpr = 1;
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      if (width === lastWidth && height === lastHeight && !tierChanged) return false;
      lastWidth = width;
      lastHeight = height;
      canvas.width = width;
      canvas.height = height;
      renderedId = "";
      return true;
    };

    const render = async (force = false, localRevision = requestedRevision) => {
      const masterValue = reducedMotion ? 0 : displayedProgress;
      const value = reducedMotion ? 0 : masterToCinematic(masterValue);
      let currentIndex = selectedFrames.length - 1;
      for (let index = 0; index < selectedFrames.length - 1; index += 1) {
        if (value < selectedFrames[index + 1].at) {
          currentIndex = index;
          break;
        }
      }
      const nextIndex = Math.min(selectedFrames.length - 1, currentIndex + 1);
      const current = selectedFrames[currentIndex];
      const next = selectedFrames[nextIndex];
      if (!current || !next) return;
      const isLastFrame = currentIndex === selectedFrames.length - 1;
      const segmentEnd = isLastFrame ? 1 : next.at;
      const segmentDuration = Math.max(segmentEnd - current.at, 0.0001);
      const fraction = clamp((value - current.at) / segmentDuration);
      const renderTier = viewportTier;

      const protectedIndexes = [currentIndex - 1, currentIndex, nextIndex, nextIndex + 1]
        .filter((index) => index >= 0 && index < selectedFrames.length);
      const protectedIds = new Set(
        protectedIndexes.map((index) => `${renderTier}:${selectedFrames[index].id}`),
      );
      activeProtectedIds = protectedIds;
      protectedIndexes.forEach((index) => {
        void loadFrame(selectedFrames[index], renderTier).catch(() => undefined);
      });

      try {
        const cacheKey = `${renderTier}:${current.id}`;
        const cached = cache.get(cacheKey);
        let currentBitmap: DecodedFrame;

        // A resolved Promise still yields to the microtask queue. During rapid
        // scrubbing that allowed the next scroll event to invalidate every
        // pending paint, making a fully decoded sequence appear to freeze and
        // then jump. Cached plates now paint synchronously in the same RAF.
        if (cached) {
          touch(cacheKey);
          currentBitmap = cached.bitmap;
          root.dataset.renderSource = "decoded-cache";
        } else {
          root.dataset.renderSource = "decode";
          currentBitmap = await loadFrame(current, renderTier);
          if (localRevision !== requestedRevision) return;
        }
        const currentScale = interpolateScale(
          current.cameraEntryScale,
          current.cameraScale,
          fraction,
        );
        const currentRenderId = `${renderTier}:${current.id}:${currentScale.toFixed(4)}`;
        if (force || renderedId !== currentRenderId) {
          drawCover(
            canvas,
            currentBitmap,
            current,
            currentScale,
            current.pivotX,
            current.pivotY,
          );
          renderedId = currentRenderId;
        }
        const nextExposure = isLastFrame ? current.exposure ?? 0 : next.exposure ?? 0;
        const frameExposure = (current.exposure ?? 0) + (nextExposure - (current.exposure ?? 0)) * fraction;
        // The last approved composition stays on screen through the complete
        // light transition. No overexposed replacement plate is introduced,
        // so exposure cannot cause a final lens or framing jump.
        const finalWhiteout = smoothstep(0.9, 1, value);
        const exposure = Math.max(frameExposure, finalWhiteout);
        const depthTarget = isLastFrame ? 1 : next.depth;
        const depth = current.depth + (depthTarget - current.depth) * fraction;
        root.style.setProperty("--cinema-exposure", exposure.toFixed(3));
        root.dataset.frameCurrent = current.id;
        root.dataset.frameNext = next.id;
        root.dataset.frameMix = "0.000";
        root.dataset.masterProgress = masterValue.toFixed(4);
        root.dataset.targetProgress = clamp(progress.current.value).toFixed(4);
        root.dataset.cinematicProgress = value.toFixed(4);
        root.dataset.depth = depth.toFixed(4);
        root.dataset.renderScale = currentScale.toFixed(4);
        root.dataset.finalWhiteout = finalWhiteout.toFixed(4);
        root.dataset.handoff = "single-frame";
        root.dataset.ready = "true";
        trimCache(protectedIds);
      } catch {
        root.dataset.ready = "false";
      }
    };

    const drainRenderQueue = () => {
      renderQueued = false;
      renderInFlight = true;
      const localForce = queuedForce;
      const localRevision = requestedRevision;
      queuedForce = false;
      void render(localForce, localRevision).finally(() => {
        renderInFlight = false;
        if (renderQueued || localRevision !== requestedRevision) {
          drainRenderQueue();
        }
      });
    };

    const queueRender = (force = false) => {
      requestedRevision += 1;
      queuedForce ||= force;
      renderQueued = true;
      if (!renderInFlight) drainRenderQueue();
    };

    const scheduleTick = () => {
      request = window.requestAnimationFrame(tick);
    };

    const tick = (time: number) => {
      const resized = resize();
      const target = reducedMotion ? 0 : clamp(progress.current.value);
      const elapsed = Math.min(64, Math.max(0, time - lastTickTime));
      lastTickTime = time;
      const response = 1 - Math.exp(-elapsed / 95);
      displayedProgress += (target - displayedProgress) * response;
      if (Math.abs(target - displayedProgress) < 0.00001) displayedProgress = target;
      if (resized || Math.abs(displayedProgress - lastProgress) > 0.00002) {
        lastProgress = displayedProgress;
        queueRender(resized);
      }
      if (!document.hidden) scheduleTick();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(request);
        return;
      }
      lastProgress = -1;
      lastTickTime = performance.now();
      scheduleTick();
    };

    const observer = new ResizeObserver(() => {
      if (resize()) queueRender(true);
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleTick();

    return () => {
      requestedRevision += 1;
      window.clearTimeout(decodeTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(request);
      cache.forEach(({ bitmap }) => {
        if ("close" in bitmap) bitmap.close();
      });
      cache.clear();
      pending.forEach(({ controller }) => controller.abort());
      pending.clear();
    };
  }, [progress, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.cinematicCanvas} data-cinematic-canvas data-ready="false" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className={styles.cinematicExposure} />
      <div className={styles.cinematicGrain} />
    </div>
  );
}
