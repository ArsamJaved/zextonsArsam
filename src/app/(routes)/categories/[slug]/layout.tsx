import type { Metadata } from "next";
async function getCategoryData(categoryName: string) {
  try {
    const res = await fetch(
      `https://api.zextons.co.uk/get/categorydetails/${encodeURIComponent(
        categoryName
      )}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds for caching
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Category Data");
    }

    const data = await res.json();
    return data.category;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  if (!(await params)?.slug) {
    throw new Error("Invalid slug provided for category.");
  }

  // const categoryName = transformCategoryName((await params).slug);
  const categoryName = (await params).slug;
  const category = await getCategoryData(categoryName);

  return {
    title: category?.metaTitle,
    description: category?.metaDescription,
    keywords: category?.metaKeywords || "",
    robots: "index, follow",
    openGraph: {
      siteName: "Zextons Tech Store",
      title: category?.metaTitle,
      url: `https://zextons.co.uk/categories/${(await params).slug}`,
      description: category?.metaDescription,
      type: "website",
      images: [
        {
          url: category?.bannerImage?.path
            ? `https://api.zextons.co.uk/${category.bannerImage.path}`
            : "https://api.zextons.co.uk/uploads/web/Zextons.webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ZextonsTechStore",
      title: category?.metaTitle,
      description: category?.metaDescription,
      images: [
        {
          url: category?.bannerImage?.path
            ? `https://api.zextons.co.uk/${category.bannerImage.path}`
            : "https://api.zextons.co.uk/uploads/web/Zextons.webp",
        },
      ],
    },
    alternates: {
      canonical: `https://zextons.co.uk/categories/${(await params).slug}`,
      languages: {
        "en-gb": `https://zextons.co.uk/categories/${(await params).slug}`,
      },
    },
  };
}

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      {children}
    </>
  );
}
