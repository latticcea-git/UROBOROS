# Publicación estática en HostGator

El build final está en `out/`. Sube **el contenido interno** de esa carpeta a `public_html`, no la carpeta `out` como subcarpeta.

## Antes de subir

1. Conserva un respaldo del sitio actual y de los registros DNS.
2. Verifica que el dominio principal sea `latticce.com` y que `www` redirija a esa versión desde el hosting o DNS.
3. No modifiques registros de correo.

## Archivos a publicar

Después de ejecutar `pnpm build`, publica todo el contenido de `out/`, incluidos `_next/`, `assets/`, `robots.txt`, `sitemap.xml` e `icon.svg`.

La exportación usa rutas con barra final: `/studio/`, `/book/` y similares. Cada una contiene su propio `index.html`, por lo que es compatible con Apache/cPanel sin un proceso Node.js.

## Después de subir

Comprueba en `https://latticce.com/` Home, Studio, Sound, Time, Design, Agency, Films, Cinema, Book, Blog, WhatsApp y el formulario de correo. Activa HTTPS desde cPanel antes de anunciar el sitio.

## Cinema

El sitio no requiere Node.js. La reproducción protegida de Cinema solo requerirá que `NEXT_PUBLIC_CINEMA_TOKEN_ENDPOINT` apunte al Worker de Cloudflare ya publicado. Si no se configura, las experiencias con preview local continúan disponibles.
