import type { Metadata } from "next";
import {
  extractBaseProductName,
  getSeoMetaData,
} from "../components/HelperFunctions";
import DynamicHead from "./head";

async function getProductData(producturl: string) {
  try {
    const res = await fetch(
      `https://api.zextons.co.uk/get/productmetadata/url/${encodeURIComponent(
        producturl
      )}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds for caching
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Product Data");
    }

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Product data:", error);
    return null; // Return null if an error occurs
  }
}
const getProductUrl = (
  productType: { type: string },
  baseProductName: string,
  variantInfo: string | null
) => {
  if (!productType || !baseProductName) return baseProductName;

  switch (productType.type) {
    case "variant":
      return variantInfo
        ? `${baseProductName}-${variantInfo}`
        : baseProductName;
    case "single":
      return baseProductName;
    default:
      return baseProductName;
  }
};
// Generate dynamic metadata for the subcategory page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slugParam = await params;
  if (!slugParam?.slug) {
    throw new Error("Invalid slug provided for product.");
  }

  const productSlug = slugParam.slug;
  const { baseProductName, variantInfo } = extractBaseProductName(productSlug);

  const response = await getProductData(baseProductName);
  console.log(response);
  if (!response) {
    // Fallback SEO
    return {
      title: `Buy ${baseProductName} limited time offers at Zextons Tech Store`,
      description: `Buy ${baseProductName} limited time offers at Zextons Tech Store to enjoy the best deals on the latest tech products.`,
    };
  }
  // Generate SEO data using the response and variantInfo
  const { metaTitle, metaDescription, metaKeywords, metaImage } =
    getSeoMetaData(response, variantInfo);
  const { productType } = response; // Assuming you have the productType from the fetched data
 const producturl = getProductUrl(productType, baseProductName, variantInfo);
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords || "",
    robots: "index, follow",
    openGraph: {
      siteName: "Zextons Tech Store",
      title:
        metaTitle ||
        `Buy ${baseProductName} limited time offers at Zextons Tech Store`,
      url: `https://zextons.co.uk/products/${producturl}`,
      description:
        metaDescription ||
        `Buy ${baseProductName} limited time offers at Zextons Tech Store to enjoy the best deals on the latest tech products.`,
      type: "website",
      images: [
        {
          url: metaImage
            ? `https://api.zextons.co.uk/${metaImage}`
            : "https://api.zextons.co.uk/uploads/web/Zextons.webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@ZextonsTechStore",
      title:
        metaTitle ||
        `Buy ${baseProductName} limited time offers at Zextons Tech Store`,
      description:
        metaDescription ||
        `Buy ${baseProductName} limited time offers at Zextons Tech Store to enjoy the best deals on the latest tech products.`,
      images: [
        {
          url: metaImage
            ? `https://api.zextons.co.uk/${metaImage}`
            : "https://api.zextons.co.uk/uploads/web/Zextons.webp",
        },
      ],
    },
    alternates: {
      canonical: `https://zextons.co.uk/products/${producturl}`,
      languages: {
        "en-gb": `https://zextons.co.uk/products/${producturl}`,
      },
    },
  };
}

// Layout Component for SubCategory
export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  // const subCategoryName = transformSubCategoryName((await params).slug);

  return (
    <>
      <DynamicHead productSlug={(await params).slug} />
      {children}
    </>
  );
}
