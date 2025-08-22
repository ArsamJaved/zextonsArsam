import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Zextons UK",
  description:
    "Have questions or need assistance? Contact Zextons UK for support with your mobile phone purchases. Our team is here to help you with any inquiries or concerns!",
  keywords:
    "refurbished mobile phones, buy mobile phones, sell mobile phones, new phones, Zextons, eBay, Amazon, Back Market, mobile phone deals",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons Tech Store",
    title: "Contact Us - Get in Touch with Zextons UK",
    url: "https://zextons.co.uk/contact-us",
    description:
      "Have questions or need assistance? Contact Zextons UK for support with your mobile phone purchases. Our team is here to help you with any inquiries or concerns!",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Contact Us - Get in Touch with Zextons UK",
    description:
      "Have questions or need assistance? Contact Zextons UK for support with your mobile phone purchases. Our team is here to help you with any inquiries or concerns!",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/contact-us",
    languages: { "en-gb": "https://zextons.co.uk/contact-us" },
  },
};
export default function ContactUsLayout({
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
