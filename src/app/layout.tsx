import "./globals.css";
import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Best Refurbished and New Mobile Phones - Zextons",
  description:
    "Zextons offers high-quality refurbished and new mobile phones at competitive prices. Shop now on eBay, Amazon, Back Market, or our own site!",
  keywords:
    "refurbished mobile phones, buy mobile phones, sell mobile phones, new phones, Zextons, eBay, Amazon, Back Market, mobile phone deals",
  robots: "index, follow",
  openGraph: {
    siteName: "Zextons",
    title: "Buy Refurbished Mobile Phones in the UK | Zextons Tech Store",
    url: "https://zextons.co.uk/",
    description:
      "Zextons offers high-quality refurbished and new mobile phones at competitive prices. Shop now on eBay, Amazon, Back Market, or our own site!",
    type: "website",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ZextonsTechStore",
    title: "Buy Refurbished Mobile Phones in the UK | Zextons Tech Store",
    description:
      "Zextons offers high-quality refurbished and new mobile phones at competitive prices. Shop now on eBay, Amazon, Back Market, or our own site!",
    images: [{ url: "https://api.zextons.co.uk/uploads/web/Zextons.webp" }],
  },
  alternates: {
    canonical: "https://zextons.co.uk/",
    languages: { "en-gb": "https://zextons.co.uk/" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="J8rGyz7n3ocPGH8yORrkVkqXeC0lmRIgbvrN6eWQr30"
        />
        <GoogleTagManager gtmId="GTM-P938DWL3" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zextons",
              alternateName: "Zextons",
              url: "https://zextons.co.uk/",
              logo: "https://api.zextons.co.uk/uploads/web/Zextons.webp",
            }),
          }}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="uvqeroCgZqjugCBgl++DGQ"
          async
        ></script>
        <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {},
              Tawk_LoadStart = new Date();
              
              // Define custom styles before loading Tawk script
              Tawk_API.customStyle = {
                visibility: {
                  desktop: {
                    position: "br",
                    xOffset: "20px",
                    yOffset: 80
                  },
                  mobile: {
                    position: "br",
                    xOffset: "20px",
                    yOffset: 160
                  },
                  bubble: {
                    rotate: "0deg",
                    xOffset: "-20",
                    yOffset: 0
                  }
                }
              };
              
              (function() {
                var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = "https://embed.tawk.to/6304ab5554f06e12d8903cd9/1i945jnfs";
                s1.charset = "UTF-8";
                s1.setAttribute("crossorigin", "*");
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
        {/* Microsoft Clarity Integration */}
        <Script
          id="microsoft-clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);
                t.defer=true;
                t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];
                y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ok17wd71hr");
            `,
          }}
        />
        <Script
          id="kk-resources-leadtag"
          src="https://s.kk-resources.com/leadtag.js"
          strategy="afterInteractive"
          async
        />
      </head>

      <body className="bg-white font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
