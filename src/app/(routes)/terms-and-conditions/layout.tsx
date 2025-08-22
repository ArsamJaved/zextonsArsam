import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Zextons Tech Store",
  description:
    "Welcome to Zextons! These terms and conditions outline the rules for using our website. Learn more about our terms, policies, and guidelines.",
  keywords:
    "Zextons terms and conditions, website rules, Zextons policies, terms of service, Zextons guidelines, Zextons website usage",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Terms and Conditions | Zextons Tech Store",
    url: "https://zextons.co.uk/terms-and-conditions",
    description:
      "Welcome to Zextons! These terms and conditions outline the rules for using our website. Learn about our terms, policies, and guidelines.",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Terms and Conditions | Zextons Tech Store",
    description:
      "These terms and conditions outline the rules for using the Zextons website. Learn more about our policies and guidelines.",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/terms-and-conditions",
    languages: { "en-gb": "https://zextons.co.uk/terms-and-conditions" },
  },
};

export default function TermsandConditionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>{children}</>
  );
}
