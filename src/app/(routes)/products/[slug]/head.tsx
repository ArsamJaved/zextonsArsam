'use client';
import { useEffect, useState } from "react";
import Head from "next/head";
import {
  extractBaseProductName,
  getSeoMetaData,
} from "../components/HelperFunctions";

interface Metadata {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords: string;
}

const defaultMetadata: Metadata = {
  title: "Default Title",
  description: "Default Description",
  image: "https://api.zextons.co.uk/uploads/web/Zextons.webp",
  url: "https://zextons.co.uk",
  keywords: "",
};

async function getProductData(productUrl: string): Promise<any> {
  try {
    const res = await fetch(
      `https://api.zextons.co.uk/get/productmetadata/url/${encodeURIComponent(
        productUrl
      )}`
    );
    if (!res.ok) throw new Error("Failed to fetch metadata");

    return await res.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export default function DynamicHead({ productSlug }: { productSlug: string }) {
  const [metadata, setMetadata] = useState<Metadata>(defaultMetadata);

  useEffect(() => {
    async function updateMetadata() {
      const { baseProductName, variantInfo } =
        extractBaseProductName(productSlug);
      const response = await getProductData(baseProductName);

      if (response) {
        const { metaTitle, metaDescription, metaKeywords, metaImage } =
          getSeoMetaData(response, variantInfo);

        setMetadata({
          title: metaTitle || defaultMetadata.title,
          description: metaDescription || defaultMetadata.description,
          keywords: metaKeywords || "",
          image: metaImage
            ? `https://api.zextons.co.uk/${metaImage}`
            : defaultMetadata.image,
          url: `https://zextons.co.uk/products/${productSlug}`,
        });
      } else {
        setMetadata(defaultMetadata);
      }
    }

    updateMetadata();
  }, [productSlug]);

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <link rel="canonical" href={metadata.url} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.image} />
      <meta property="og:url" content={metadata.url} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
