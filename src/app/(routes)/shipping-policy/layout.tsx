import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy at Zextons Tech Store",
  description:
    "At Zextons Tech Store, we understand that receiving your order swiftly is essential. That's why we offer same-day dispatch for orders placed and paid for before 3 PM on any regular business day.",
  keywords:
    "shop tech products, tech deals, mobiles, laptops, gaming consoles, tech accessories, fast delivery, Zextons products",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons",
    title: "Shipping Policy at Zextons Tech Store",
    url: "https://zextons.co.uk/shipping-policy",
    description:
      "At Zextons Tech Store, we understand that receiving your order swiftly is essential. That's why we offer same-day dispatch for orders placed and paid for before 3 PM on any regular business day.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Shipping Policy at Zextons Tech Store",
    description:
      "At Zextons Tech Store, we understand that receiving your order swiftly is essential. That's why we offer same-day dispatch for orders placed and paid for before 3 PM on any regular business day.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/shipping-policy",
    languages: { "en-gb": "https://zextons.co.uk/shipping-policy" },
  },
};

export default function ShippingPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />
      {children}
    </>
  );
}
