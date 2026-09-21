import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const outputDirectory = resolve(process.cwd(), "out");

function exportedPage(path) {
  const file = resolve(outputDirectory, path, "index.html");

  assert.ok(
    existsSync(file),
    `No existe ${file}. Ejecuta pnpm build antes de pnpm seo:check.`,
  );

  return readFileSync(file, "utf8");
}

function sitemap() {
  const file = resolve(outputDirectory, "sitemap.xml");

  assert.ok(
    existsSync(file),
    `No existe ${file}. Ejecuta pnpm build antes de pnpm seo:check.`,
  );

  return readFileSync(file, "utf8");
}

const cinemaWorks = [
  "escila-2018",
  "hierba-mala",
  "alejate-los-chicklets",
  "peculiar-karell",
  "hecho-para-ti-performance",
];

test("Cinema indexa las obras autorizadas y protege Interludio", () => {
  const cinema = exportedPage("films/cinema");
  const siteMap = sitemap();

  assert.doesNotMatch(cinema, /name="robots"/i);
  assert.match(siteMap, /https:\/\/latticce\.com\/films\/cinema\//);
  assert.doesNotMatch(siteMap, /interludio/);

  for (const slug of cinemaWorks) {
    assert.doesNotMatch(exportedPage(`films/cinema/${slug}`), /noindex/i);
    assert.match(siteMap, new RegExp(`films/cinema/${slug}/`));
  }

  assert.match(
    exportedPage("films/cinema/interludio"),
    /noindex\s*,\s*nofollow\s*,\s*nocache/i,
  );
});

test("las rutas de adquisición conservan encabezados semánticos", () => {
  assert.match(
    exportedPage("agency"),
    /<h1[^>]*>LATTICCE Agency: estrategia digital, contenido, experiencias y distribución para marcas\.<\/h1>/,
  );
  assert.match(
    exportedPage("studio"),
    /<h1[^>]*>LATTICCE Studio: fotografía, video comercial, postproducción y contenido para marcas y artistas\.<\/h1>/,
  );
  assert.match(
    exportedPage("films"),
    /<h1[^>]*>LATTICCE Films: producción cinematográfica y dirección visual\.<\/h1>/,
  );
});

test("la exportación incluye la entidad y el sitio en datos estructurados", () => {
  const home = exportedPage("");

  assert.match(home, /"@type":"Organization"/);
  assert.match(home, /"@type":"WebSite"/);
});

test("los proyectos demostrativos se presentan con transparencia", () => {
  const project = exportedPage("book/fase-roja");

  assert.match(project, /Proyecto demostrativo/);
  assert.match(project, /"creativeWorkStatus":"Proyecto demostrativo"/);
  assert.doesNotMatch(project, /imagen conceptual generada|obra de ejemplo|proyecto conceptual/i);
});
