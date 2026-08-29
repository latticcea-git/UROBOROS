import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteMenu from "../../site-menu";
import { bookProjects } from "../../book/book-data";
import { articleContent } from "../article-content";
import { blogPosts, getBlogNode, getBlogPost } from "../blog-data";
import ReadingProgress from "../reading-progress";
import styles from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — LATTICCE BLOG`,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, alt: post.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
      images: [post.image],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const content = articleContent[slug];
  if (!post || !content) notFound();

  const node = getBlogNode(post.node);
  const bookProject = bookProjects.find((project) => project.slug === content.bookProjectSlug);
  const related = [
    ...blogPosts.filter((candidate) => candidate.node === post.node && candidate.slug !== post.slug),
    ...blogPosts.filter((candidate) => candidate.node !== post.node && candidate.slug !== post.slug),
  ].slice(0, 3);

  return (
    <main className={styles.articleRoot} data-node={post.node}>
      <SiteMenu homeHref="/" logoSrc="/UROBOROS/assets/logos/LTT_LOGO_1920_FX.png" logoAlt="LATTICCE" />
      <ReadingProgress />

      <article>
        <header className={styles.articleHeader}>
          <nav aria-label="Ruta del artículo"><Link href="/blog">BLOG</Link><span>/</span><span>{node.name}</span><span>/</span><span>{post.category}</span></nav>
          <div className={styles.articleIdentity}>
            <Image src={node.logo} width={320} height={82} alt={`LATTICCE ${node.name}`} priority />
            <span>{node.territory}</span>
          </div>
          <div className={styles.articleMeta}><span>{post.category}</span><span>{post.displayDate}</span><span>{post.readingTime} de lectura</span></div>
          <h1>{post.title}</h1>
          <p>{post.dek}</p>
          <div className={styles.articleByline}><span>Texto</span><strong>{post.author}</strong></div>
        </header>

        <figure className={styles.articleHero}>
          <Image src={post.image} alt={post.alt} fill priority sizes="100vw" style={{ objectPosition: post.imagePosition }} />
          <figcaption>{post.category} / Imagen conceptual para prototipo editorial</figcaption>
        </figure>

        <div className={styles.articleBody}>
          <p className={styles.articleIntro}>{content.intro}</p>
          {content.sections.map((section, index) => (
            <section className={styles.articleSection} key={section.title}>
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {index === 0 && (
                <blockquote>{content.quote}</blockquote>
              )}
            </section>
          ))}

          <aside className={styles.articleNotes} aria-label="Datos del artículo">
            {content.notes.map((note) => <div key={note.label}><span>{note.label}</span><strong>{note.value}</strong></div>)}
          </aside>
        </div>
      </article>

      <section className={styles.articleEnd} aria-label="Final del artículo">
        <span>Fin del artículo</span>
        <i aria-hidden="true" />
      </section>

      {bookProject && (
        <section className={styles.bookBridge} aria-labelledby="book-bridge-title" data-node={bookProject.node}>
          <div className={styles.bookBridgeHead}><span>Verlo en práctica / BOOK</span><h2 id="book-bridge-title">Del pensamiento<br /><em>a la obra.</em></h2></div>
          <Link href={`/book/${bookProject.slug}`}>
            <Image src={bookProject.image} alt={bookProject.alt} fill sizes="100vw" style={{ objectPosition: bookProject.imagePosition }} />
            <span className={styles.bookBridgeShade} />
            <div><span>{bookProject.node} / {bookProject.category}</span><h3>{bookProject.title}</h3><p>{bookProject.summary}</p><b>Ver proyecto ↗︎</b></div>
          </Link>
        </section>
      )}

      <section className={styles.related} aria-labelledby="related-title">
        <header><span>Continuar leyendo</span><h2 id="related-title">Otras <em>miradas</em></h2></header>
        <div>
          {related.map((candidate) => {
            const candidateNode = getBlogNode(candidate.node);
            return (
              <Link href={`/blog/${candidate.slug}`} key={candidate.slug} data-node={candidate.node}>
                <div><Image src={candidate.image} alt={candidate.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <span>{candidateNode.name} / {candidate.category}</span>
                <h3>{candidate.title}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className={styles.blogFooter}>
        <span>LATTICCE / BLOG / 2026</span>
        <Link href="/blog">Volver al archivo <i aria-hidden="true">↗︎</i></Link>
      </footer>
    </main>
  );
}
