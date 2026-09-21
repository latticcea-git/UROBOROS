interface Env {
  ALLOWED_ORIGIN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_STREAM_API_TOKEN: string;
  CLOUDFLARE_STREAM_CUSTOMER_CODE: string;
  CINEMA_ESCILA_UID: string;
}

const TOKEN_TTL_SECONDS = 2 * 60 * 60;

function corsHeaders(origin: string) {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin") ?? "";
    if (!origin || origin !== env.ALLOWED_ORIGIN) return json({ error: "Origin not allowed" }, 403, env.ALLOWED_ORIGIN);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/v1/cinema/playback") {
      return json({ error: "Not found" }, 404, origin);
    }

    let slug = "";
    try {
      const body = await request.json() as { slug?: string };
      slug = body.slug ?? "";
    } catch {
      return json({ error: "Invalid request" }, 400, origin);
    }

    const videoUidBySlug: Record<string, string | undefined> = {
      "escila-2018": env.CINEMA_ESCILA_UID,
    };
    const videoUid = videoUidBySlug[slug];
    if (!videoUid) return json({ error: "Work unavailable" }, 404, origin);

    const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
    const tokenResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/stream/${videoUid}/token`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.CLOUDFLARE_STREAM_API_TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ exp: expiresAt, downloadable: false }),
      },
    );

    if (!tokenResponse.ok) return json({ error: "Playback unavailable" }, 502, origin);
    const payload = await tokenResponse.json() as { result?: { token?: string } };
    const token = payload.result?.token;
    if (!token) return json({ error: "Playback unavailable" }, 502, origin);

    const playerUrl = `https://customer-${env.CLOUDFLARE_STREAM_CUSTOMER_CODE}.cloudflarestream.com/${token}/iframe?autoplay=true&preload=metadata`;
    return json({ playerUrl, expiresAt }, 200, origin);
  },
};
