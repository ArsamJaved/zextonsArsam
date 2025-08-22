import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews | Trusted Feedback on Tech Products",
  description:
    "Read authentic customer reviews about our tech products, including mobiles, laptops, and accessories. Discover why customers trust us for quality and service.",
  keywords:
    "customer reviews, tech product feedback, trusted reviews, Zextons reviews, customer testimonials, quality tech products, mobiles, laptops, accessories",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Customer Reviews | Trusted Feedback on Tech Products",
    url: "https://zextons.co.uk/customer-reviews",
    description:
      "Find out what customers are saying about Zextons' products. Read trusted feedback on our mobiles, laptops, and tech accessories.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Customer Reviews | Trusted Feedback on Tech Products",
    description:
      "Read authentic reviews about Zextons' tech products, including mobiles, laptops, and accessories. See why customers trust our quality and service.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/customer-reviews",
    languages: { "en-gb": "https://zextons.co.uk/customer-reviews" },
  },
};

export default function CustomerReviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
