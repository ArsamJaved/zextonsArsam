import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Subscribe to Zextons Tech Store Newsletter | Exclusive Offers & Tech News",
  description:
    "Stay updated with the latest product launches, exclusive deals, and tech news. Subscribe to Zextons Tech Store's newsletter for special offers on mobile phones, tablets, and more.",
  keywords:
    "Zextons newsletter, tech news, exclusive tech deals, latest product launches, mobile phone offers, Zextons updates",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title:
      "Subscribe to Zextons Tech Store Newsletter | Exclusive Offers & Tech News",
    url: "https://zextons.co.uk/subscribe-newsletter",
    description:
      "Stay updated with the latest product launches, exclusive deals, and tech news. Subscribe to Zextons Tech Store's newsletter for special offers on mobile phones, tablets, and more.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title:
      "Subscribe to Zextons Tech Store Newsletter | Exclusive Offers & Tech News",
    description:
      "Stay updated with the latest product launches, exclusive deals, and tech news. Subscribe to Zextons Tech Store's newsletter for special offers on mobile phones, tablets, and more.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/subscribe-newsletter",
    languages: { "en-gb": "https://zextons.co.uk/subscribe-newsletter" },
  },
};

export default function SubscribeNewsletterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
