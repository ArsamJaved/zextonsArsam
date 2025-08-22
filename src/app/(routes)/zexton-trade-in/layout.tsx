import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Trade-In Your Phone | Sell Your Mobile Phone | Zextons UK",
  description:
    "Sell your old mobile phones, iPhones, watches, iPads, game consoles, and tablets, or trade them in at Zextons in the UK. Get fast or instant cash today!",
  keywords:
    "trade-in phones, sell mobile phones, refurbished phones, Zextons UK, trade-in iPads, trade-in game consoles, instant cash for phones",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Trade-In Your Phone | Sell Your Mobile Phone | Zextons UK",
    url: "https://zextons.co.uk/zexton-trade-in",
    description:
      "Sell your old devices or trade them in at Zextons UK. Fast and eco-friendly trade-in options for mobile phones, tablets, iPads, and more.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Trade-In Your Phone | Sell Your Mobile Phone | Zextons UK",
    description:
      "Trade in or sell your old mobile phones, iPhones, tablets, and more at Zextons UK. Get instant cash with our fast and eco-friendly process.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/zexton-trade-in",
    languages: { "en-gb": "https://zextons.co.uk/zexton-trade-in" },
  },
};

export default function ZextonsTradeInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
