import "./globals.css";
import type { Metadata } from "next";

import "./styles/toastify-lite.css";
import Script from "next/script";
import { Providers } from "./providers";
import mobileinhandbg from "@/app/assets/mobileinhandbg.webp";
import mobileinhandbgsmall from "@/app/assets/mobileinhandbgsmall.png";

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
        {/* Preload LCP hero image for better performance */}
        <link
          rel="preload"
          as="image"
          href={mobileinhandbg.src}
          imageSrcSet={`${mobileinhandbgsmall.src} 639w, ${mobileinhandbg.src} 640w`}
          imageSizes="100vw"
          fetchPriority="high"
          type="image/webp"
        />
        {/* Removed brittle preloads that can 404 across builds/envs */}
        {/* Add media query for third-party CSS to optimize loading */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          /* Optimize third-party CSS loading with media queries */
          @media print {
            /* This will never be applied but ensures the CSS is loaded non-render blocking */
            #__next { display: none; }
          }
        `,
          }}
        />
        <meta
          name="google-site-verification"
          content="J8rGyz7n3ocPGH8yORrkVkqXeC0lmRIgbvrN6eWQr30"
        />
        {process.env.NODE_ENV !== "production" && (
          <Script id="dev-fbq-shim" strategy="beforeInteractive">
            {`
              (function() {
                if (typeof window === 'undefined') return;
                // Define a minimal fbq shim in development to avoid ReferenceError from GTM
                if (!('fbq' in window)) {
                  var fbq = function() {
                    (fbq.q = fbq.q || []).push(arguments);
                  };
                  // expose
                  window.fbq = fbq;
                }
              })();
            `}
          </Script>
        )}
        {/* Defer GTM to reduce unused JS. Loads on idle if consent is granted, otherwise waits for a custom consent event. */}
        <Script id="gtm-delayed-loader" strategy="lazyOnload">
          {`
            (function () {
              var GTM_ID = 'GTM-P938DWL3';
              function hasConsent() {
                try {
                  return (
                    localStorage.getItem('consent_analytics') === 'granted' ||
                    localStorage.getItem('consent_marketing') === 'granted'
                  );
                } catch (e) { return false; }
              }

              function loadGTM() {
                if (window.__gtmLoaded) return; // guard
                window.__gtmLoaded = true;
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
                var f = document.getElementsByTagName('script')[0];
                var j = document.createElement('script');
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
                f.parentNode.insertBefore(j, f);
              }

              if (hasConsent()) {
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(loadGTM, { timeout: 3000 });
                } else {
                  setTimeout(loadGTM, 2000);
                }
              } else {
                // wait for app to dispatch when user grants consent
                window.addEventListener('consent_granted', loadGTM, { once: true });
              }
            })();
          `}
        </Script>
        <Script
          id="schema-org"
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
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="uvqeroCgZqjugCBgl++DGQ"
          strategy="lazyOnload"
          defer
        />
        <Script
          id="tawk-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                // Consent gate for marketing/chat
                try {
                  var __consent = (typeof window !== 'undefined') && (localStorage.getItem('consent_marketing') === 'granted');
                  if (!__consent) return;
                } catch(e) { return; }

                var Tawk_API = (window.Tawk_API = window.Tawk_API || {});
                var Tawk_LoadStart = new Date();
                
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
                
                var s1 = document.createElement("script");
                var s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.defer = true;
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
          strategy="lazyOnload"
          defer
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try { if (localStorage.getItem('consent_analytics') !== 'granted') return; } catch(e) {}
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);
                  t.defer=true;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "ok17wd71hr");
              })();
            `,
          }}
        />
        <Script
          id="kk-resources-leadtag"
          src="https://s.kk-resources.com/leadtag.js"
          strategy="lazyOnload"
          defer
        />
      </head>

      <body suppressHydrationWarning className="bg-white font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
