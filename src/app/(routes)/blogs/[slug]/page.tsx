import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/app/components/footer/footer";
import TableOfContentsWrapper from "./TableOfContentsWrapper";
import DateDisplay from "./DateDisplay";
import Nav from "@/app/components/navbar/Nav";
import TopBar from "@/app/topbar/page";

interface BlogData {
  _id: string;
  name: string;
  slug: string;
  content: string;
  blogImage: string;
  blogImageAlt?: string;
  blogShortDescription: string;
  blogCategory: string;
  createdAt: string;
  updatedAt: string;
  blogpublisheddate: string;
  metaschemas?: string[];
  // SEO overrides from backend
  metaTitle?: string;
  metaDescription?: string;
  metakeywords?: string;
  metaImage?: string;
  metaImageAlt?: string;
}

export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour

async function getBlog(slug: string): Promise<BlogData | null> {
  try {
    const res = await fetch(`https://api.zextons.co.uk/get/blog/${slug}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.status === 201 ? (data.blog as BlogData) : null;
  } catch {
    return null;
  }
}

function getStaticContent(html: string): string {
  if (!html) return "<p>No content available</p>";
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "")
    .trim();
}

function formatDateGB(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`; // deterministic SSR/CSR
}

// Return YYYY-MM-DD in UTC, suitable for schema.org date fields (date-only)
function formatDateISO(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    // fallback: best-effort slice if already a string
    return (dateStr || "").slice(0, 10);
  }
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Zextons",
      description: "The requested blog post could not be found.",
      robots: "noindex, nofollow",
    };
  }

  const baseUrl = "https://api.zextons.co.uk";
  const rawOgImage = (blog.metaImage && blog.metaImage) || blog.blogImage;
  const ogImage = rawOgImage?.startsWith("http")
    ? rawOgImage
    : `${baseUrl}/${rawOgImage}`;
  const ogImageAlt = blog.metaImageAlt || blog.blogImageAlt || blog.name;

  // SEO field fallbacks
  const seoTitle = blog.metaTitle || blog.name;
  const seoDesc = blog.metaDescription || blog.blogShortDescription;
  const seoKeywords = blog.metakeywords || blog.blogCategory;
  const publishedISO = (blog.blogpublisheddate || blog.createdAt);

  return {
    title: `${seoTitle} | Zextons`,
    description: seoDesc,
    keywords: seoKeywords,
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: "article",
      publishedTime: publishedISO,
      modifiedTime: blog.updatedAt,
      authors: ["Zextons"],
      siteName: "Zextons",
      locale: "en_GB",
      url: `https://zextons.co.uk/blogs/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://zextons.co.uk/blogs/${slug}`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const baseUrl = "https://api.zextons.co.uk";
  const heroImage = blog.blogImage.startsWith("http")
    ? blog.blogImage
    : `${baseUrl}/${blog.blogImage}`;

  const staticContent = getStaticContent(blog.content);
  const publishedRaw = blog.blogpublisheddate || blog.createdAt;
  const dateDisplay = formatDateGB(publishedRaw);
  const dateModifiedISO = formatDateISO(blog.updatedAt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.metaTitle || blog.name,
    description: blog.metaDescription || blog.blogShortDescription,
    image: heroImage,
    datePublished: formatDateISO(publishedRaw),
    dateModified: dateModifiedISO,
    articleBody: staticContent.replace(/<[^>]*>/g, ""),
    wordCount: staticContent.split(/\s+/).length,
    author: { "@type": "Organization", name: "Zextons", url: "https://zextons.co.uk" },
    publisher: {
      "@type": "Organization",
      name: "Zextons",
      logo: { "@type": "ImageObject", url: "https://zextons.co.uk/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://zextons.co.uk/blogs/${slug}` },
  };

  // Parse any backend-provided metaschemas (array of JSON strings)
  const extraSchemas = Array.isArray(blog.metaschemas)
    ? blog.metaschemas
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null; // skip invalid JSON to avoid injecting malformed data
          }
        })
        .filter(Boolean)
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {extraSchemas.map((schema: unknown, idx: number) => (
        <script
          key={`ldjson-extra-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TopBar />
      <Nav />

      <article className="px-4 py-10">
        {/* HERO (server-rendered) */}
        <header className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="relative">
            <Image
              src={heroImage}
              alt={blog.blogImageAlt || blog.name}
              className="w-full h-[35rem] object-cover"
              width={1200}
              height={700}
              fetchPriority="high"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            {blog.blogCategory && (
              <div className="absolute top-5 right-10">
                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {blog.blogCategory}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
              <div className="text-white max-w-screen-md">
                <DateDisplay 
                  dateString={publishedRaw}
                  dateTime={publishedRaw}
                  className="text-white"
                  fallbackText={dateDisplay}
                />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-3">
                  {blog.name}
                </h1>
                <p className="mt-3 text-md sm:text-lg text-gray-200">
                  {blog.metaDescription || blog.blogShortDescription}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* LAYOUT: ToC (client) + Content (server) */}
        <div className="w-full max-w-screen-xl mx-auto my-5 md:flex gap-6">
          {/* Table of Contents - Client Component */}
          <TableOfContentsWrapper content={staticContent} />

          {/* Main Content - Server Rendered */}
          <main
            id="blog-content"
            className="flex-1 p-6 space-y-6 shadow-lg border rounded-lg bg-white"
          >
            <div
              className="prose prose-lg max-w-none
                prose-headings:scroll-mt-20
                prose-h1:text-3xl prose-h1:font-bold
                prose-h2:text-2xl prose-h2:font-semibold
                prose-h3:text-xl prose-h3:font-medium
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                prose-img:rounded-lg prose-img:shadow-md
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                prose-blockquote:pl-4 prose-blockquote:italic
                prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:text-gray-100"
              dangerouslySetInnerHTML={{ __html: staticContent }}
            />
          </main>
        </div>
      </article>

      <Footer />
    </>
  );
}