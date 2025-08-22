import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy - Zextons Tech Store",
  description:
    "At Zextons, our main priority is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by Zextons and how we use it.",
  keywords:
    "Zextons privacy policy, data privacy, information collection, Zextons visitor privacy, data usage policy, Zextons Tech Store privacy",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Privacy Policy - Zextons Tech Store",
    url: "https://zextons.co.uk/privacy-policy",
    description:
      "At Zextons, our main priority is the privacy of our visitors. Learn about the information we collect and how we use it in our Privacy Policy.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Privacy Policy - Zextons Tech Store",
    description:
      "At Zextons, our main priority is the privacy of our visitors. This Privacy Policy outlines the types of information collected and how we use it.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/privacy-policy",
    languages: { "en-gb": "https://zextons.co.uk/privacy-policy" },
  },
};

export default function PrivacyandPolicyLayout({
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
