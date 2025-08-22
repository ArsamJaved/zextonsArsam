import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Refund and Return Policy | Zextons Tech Store",
  description:
    "Zextons offers a 30-day return and refund policy. Learn about our process for returning or exchanging products, eligibility, and refund details.",
  keywords:
    "Zextons refund policy, return policy, product exchange, refund eligibility, Zextons returns, Zextons refund process",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Refund and Return Policy | Zextons Tech Store",
    url: "https://zextons.co.uk/refund-and-return-policy",
    description:
      "Zextons offers a 30-day return and refund policy. Learn about the process for returning or exchanging products and refund eligibility.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Refund and Return Policy | Zextons Tech Store",
    description:
      "Learn about Zextons's 30-day return and refund policy. Find out how to return or exchange a product and understand our refund process.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/refund-and-return-policy",
    languages: { "en-gb": "https://zextons.co.uk/refund-and-return-policy" },
  },
};

export default function RefundandReturnLayout({
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
