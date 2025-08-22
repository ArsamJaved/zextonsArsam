import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Recycle Phone | Sell Mobile Phone Recycling at Zextons UK",
  description:
    "Recycle your old phones with Zextons in the UK. Quick, secure, and eco-friendly mobile phone recycling. Trade-in Instant cash for your unused phones today!",
  keywords: "Phone Recycling",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons",
    title: "Recycle Phone | Sell Mobile Phone Recycling at Zextons UK",
    url: "https://zextons.co.uk/recycle-mobile-phone",
    description:
      "Recycle your old phones with Zextons in the UK. Quick, secure, and eco-friendly mobile phone recycling. Trade-in Instant cash for your unused phones today!",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Recycle Phone | Sell Mobile Phone Recycling at Zextons UK",
    description:
      "Recycle your old phones with Zextons in the UK. Quick, secure, and eco-friendly mobile phone recycling. Trade-in Instant cash for your unused phones today!",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/recycle-mobile-phone",
    languages: { "en-gb": "https://zextons.co.uk/recycle-mobile-phone" },
  },
};

export default function BulkRecyclingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
