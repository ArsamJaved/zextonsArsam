import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductPage from "@/app/(routes)/products/[slug]/ProductPage";
import Loading from "@/app/components/Loading";

async function getProductData(productName: string) {
  console.log(productName);
  const res = await fetch(`https://api.zextons.co.uk/get/product/by/url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ producturl: productName }),

  });

  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  console.log(data);
  return data.product || null;
}

function extractBaseProductName(fullName: string) {
  // Remove the leading '/' if present
  const cleanedName = fullName.startsWith("/")
    ? fullName.substring(1)
    : fullName;
  // Define an array of possible conditions to identify where to split the product name
  const conditions = [
    "brand-new",
    "refurbished",
    "open-box",
    "like-new",
    "used-excellent",
    "used-very-good",
    "used-good",
    "certified-pre-owned",
    "factory-refurbished",
    "for-parts-or-not-working",
  ];
  // Create a regex pattern that matches any of the conditions as whole words
  const conditionPattern = conditions.join("|");
  const regex = new RegExp(`\\b(${conditionPattern})\\b`, "i");
  // Search for the first occurrence of any condition in the cleanedName
  const match = cleanedName.match(regex);
  if (match && match.index !== undefined) {
    const index = match.index;
    const conditionLength = match[0].length;
    // Include the condition in the base product name
    const baseProductName = cleanedName
      .substring(0, index + conditionLength)
      .replace(/-+$/g, "");
    // Extract the variant information after the condition
    const variantInfo = cleanedName
      .substring(index + conditionLength)
      .replace(/^-+/g, "");

    return { baseProductName, variantInfo };
  } else {
    // If no condition is found, return the original name as base product name
    return { baseProductName: cleanedName, variantInfo: "" };
  }
}

export default async function Product({
  params,
}: {
    params: Promise<{ slug: string }>
}) {
  // Await the params.slug
  const { slug } = await params;
  const { baseProductName, variantInfo } = extractBaseProductName(slug);
  const product = await getProductData(baseProductName);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductPage product={product} variantInfo={variantInfo} />
      </Suspense>
    </div>
  );
}
