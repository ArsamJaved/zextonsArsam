import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "About Zextons: Your Trusted Source for Refurbished Tech",
  description:
    "At Zextons, we're passionate about making top-quality tech accessible to everyone. Explore our wide selection of refurbished mobile devices, laptops, and video game consoles at competitive prices.",
  keywords:
    "about Zextons, refurbished tech, refurbished devices, refurbished laptops, refurbished video game consoles, affordable tech, Zextons mission",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "About Zextons: Your Trusted Source for Refurbished Tech",
    url: "https://zextons.co.uk/about-zextons",
    description:
      "Learn about Zextons, where we provide affordable, top-quality refurbished mobile devices, laptops, and gaming consoles for everyone.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "About Zextons: Your Trusted Source for Refurbished Tech",
    description:
      "At Zextons, we're passionate about making top-quality tech accessible to everyone. Explore our wide selection of refurbished devices, laptops, and gaming consoles.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/about-zextons",
    languages: { "en-gb": "https://zextons.co.uk/about-zextons" },
  },
};

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            name: "Zextons",
            alternateName: "Zextons",
            url: "https://zextons.co.uk/",
            logo: "https://api.zextons.co.uk/uploads/web/Zextons.webp",
          }),
        }}
      />
      <SpeedInsights />
      {children}
    </>
  );
}
