export type CinematicHandoff = "match" | "light";

export type CinematicFrame = {
  id: string;
  at: number;
  depth: number;
  desktop: string;
  desktopFallback: string;
  tablet: string;
  tabletFallback: string;
  mobile: string;
  mobileFallback: string;
  focalX?: number;
  focalY?: number;
  exposure?: number;
  cameraEntryScale: number;
  cameraScale: number;
  pivotX?: number;
  pivotY?: number;
  handoff?: CinematicHandoff;
  handoffWindow?: number;
};

export type CinematicCopy = {
  id: string;
  text: string;
  start: number;
  end: number;
};

type FrameOptions = Partial<Pick<
  CinematicFrame,
  | "focalX"
  | "focalY"
  | "exposure"
  | "cameraEntryScale"
  | "cameraScale"
  | "pivotX"
  | "pivotY"
  | "handoff"
  | "handoffWindow"
>>;

const frame = (
  id: string,
  at: number,
  depth: number,
  options: FrameOptions = {},
): CinematicFrame => ({
  id,
  at,
  depth,
  desktop: `/assets/images/films/sigue-la-luz/desktop/${id}.webp`,
  desktopFallback: `/assets/images/films/sigue-la-luz/desktop/${id}.jpg`,
  tablet: `/assets/images/films/sigue-la-luz/tablet/${id}.webp`,
  tabletFallback: `/assets/images/films/sigue-la-luz/tablet/${id}.jpg`,
  mobile: `/assets/images/films/sigue-la-luz/mobile/${id}.webp`,
  mobileFallback: `/assets/images/films/sigue-la-luz/mobile/${id}.jpg`,
  focalX: 0.5,
  focalY: 0.5,
  exposure: 0,
  cameraEntryScale: 1,
  cameraScale: 1,
  pivotX: 0.5,
  pivotY: 0.54,
  handoff: "match",
  handoffWindow: 0.42,
  ...options,
});

/**
 * Public V1 treats every bitmap as a camera plate, not as an animation frame. The
 * approved frame-003 move now continues until the exterior architecture has
 * nearly left the viewport. Redundant crop-only bridge files were removed so
 * the renderer can advance continuously inside one plate for longer. The
 * former frame-010 plate was also removed because its wider architectural
 * perspective made the camera appear to move backwards. The overexposed
 * frame-016 plate is no longer used: frame-012 holds the final composition
 * while the web exposure consumes it without another change of framing.
 */
export const cinematicFrames: CinematicFrame[] = [
  frame("frame-003", 0, 0, { cameraScale: 2.55, pivotY: 0.54 }),
  frame("bridge-005-008-prelude-v2", 0.34, 0.34, {
    cameraEntryScale: 1.15,
    cameraScale: 2.1,
    pivotY: 0.55,
  }),
  frame("frame-008", 0.52, 0.52, {
    cameraScale: 1.55,
    pivotY: 0.56,
  }),
  frame("frame-009", 0.65, 0.65, {
    cameraEntryScale: 1.7,
    cameraScale: 2.05,
    pivotY: 0.56,
  }),
  frame("frame-012", 0.89, 0.89, {
    cameraScale: 1.12,
    pivotY: 0.48,
  }),
];

for (let index = 0; index < cinematicFrames.length; index += 1) {
  const current = cinematicFrames[index];
  const previous = cinematicFrames[index - 1];
  if (current.cameraEntryScale < 1) {
    throw new Error(`FILMS PUBLIC V1: frame ${current.id} cannot enter behind its source camera.`);
  }
  if (current.cameraScale < current.cameraEntryScale) {
    throw new Error(`FILMS PUBLIC V1: frame ${current.id} cannot move its local camera backwards.`);
  }
  if (!previous) continue;
  if (current.at <= previous.at) {
    throw new Error(`FILMS PUBLIC V1: frame ${current.id} must have a strictly increasing progress value.`);
  }
  if (current.depth <= previous.depth) {
    throw new Error(`FILMS PUBLIC V1: frame ${current.id} must have a strictly increasing camera depth.`);
  }
}

export const reducedMotionFrameIds = [
  "frame-003",
  "frame-008",
  "frame-009",
  "frame-012",
] as const;

export const cinematicCopy: CinematicCopy[] = [
  {
    id: "enter",
    text: "Ingresa a la morada del espíritu.",
    start: 0.035,
    end: 0.14,
  },
  {
    id: "distance",
    text: "Al principio parece distante e imposible.",
    start: 0.17,
    end: 0.29,
  },
  {
    id: "advance",
    text: "Pero si continúas avanzando.",
    start: 0.355,
    end: 0.47,
  },
  {
    id: "path",
    text: "Creas un camino.",
    start: 0.53,
    end: 0.615,
  },
  {
    id: "company",
    text: "Que no debes recorrer solo.",
    start: 0.65,
    end: 0.725,
  },
  {
    id: "voice",
    text: "Si deseas que tu voz",
    start: 0.755,
    end: 0.83,
  },
  {
    id: "see",
    text: "Vea la",
    start: 0.835,
    end: 1.05,
  },
];

export const FILMS_BASE_PATH = "";
export const FILMS_EXPERIENCE_VERSION = "sigue-la-luz-public-v1.0.0";

export function withFilmsBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  if (path === FILMS_BASE_PATH || path.startsWith(`${FILMS_BASE_PATH}/`)) return path;
  return `${FILMS_BASE_PATH}${path}`;
}
