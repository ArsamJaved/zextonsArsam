import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Frequently Asked Questions | Zextons UK",
  description:
    "Find answers to common questions about selling, trading, and purchasing devices at Zextons UK. Learn about our policies, payment methods, and more!",
  keywords:
    "refurbished mobile phones, buy mobile phones, sell mobile phones, new phones, Zextons, eBay, Amazon, Back Market, mobile phone deals",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons",
    title: "Frequently Asked Questions | Zextons UK",
    url: "https://zextons.co.uk/faqs",
    description:
      "Find answers to common questions about selling, trading, and purchasing devices at Zextons UK. Learn about our policies, payment methods, and more!",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Frequently Asked Questions | Zextons UK",
    description:
      "Find answers to common questions about selling, trading, and purchasing devices at Zextons UK. Learn about our policies, payment methods, and more!",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/faqs",
    languages: { "en-gb": "https://zextons.co.uk/faqs" },
  },
};

export default function FAQSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
