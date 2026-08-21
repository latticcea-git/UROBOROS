#!/bin/zsh
set -e

cd "/Users/emmcinne/Documents/ChatGPT/UROBOROS"
RUNTIME_NODE="/Users/emmcinne/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
RUNTIME_TOOLS="/Users/emmcinne/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback"
export PATH="$RUNTIME_NODE:$RUNTIME_TOOLS:$PATH"
PORT=3000
if lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  PORT=3001
fi

URL="http://127.0.0.1:$PORT/studio"
echo "LATTICCE Studio se abrirá en $URL"
echo "Mantén esta ventana abierta mientras navegas el sitio."

pnpm dev --hostname 127.0.0.1 --port "$PORT" &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM

for attempt in {1..30}; do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    open "$URL" >/dev/null 2>&1 || true
    break
  fi
  sleep 1
done

wait "$SERVER_PID"
