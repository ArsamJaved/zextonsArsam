import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Latest Deals & Discounts - Zextons Tech Store | Exclusive Coupon Codes",
  description:
    "Get the best deals on mobile phones, Apple iPhones, Android phones, tablets, and tech at Zextons Tech Store. Discover exclusive coupon codes, discounts, and special offers on refurbished and new devices.",
  keywords:
    "deals on mobile phones, exclusive coupon codes, tech discounts, refurbished devices, new tech deals, Zextons special offers, Apple iPhone deals, Android phone discounts",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title:
      "Latest Deals & Discounts - Zextons Tech Store | Exclusive Coupon Codes",
    url: "https://zextons.co.uk/deals-and-discounts",
    description:
      "Get the best deals on mobile phones, Apple iPhones, Android phones, tablets, and tech at Zextons Tech Store. Discover exclusive coupon codes, discounts, and special offers on refurbished and new devices.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title:
      "Latest Deals & Discounts - Zextons Tech Store | Exclusive Coupon Codes",
    description:
      "Explore Zextons Tech Store's latest deals and discounts on mobile phones, tablets, and more. Find exclusive coupon codes and offers today!",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/deals-and-discounts",
    languages: { "en-gb": "https://zextons.co.uk/deals-and-discounts" },
  },
};

export default function DealsAndDiscountsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
