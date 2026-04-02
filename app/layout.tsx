import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "PaceMap — Race Shape Analysis",
  description: "Pace maps for every UK & Irish horse racing meeting.",
  openGraph: {
    title: "PaceMap — Race Shape Analysis",
    description: "Pace maps for every UK & Irish horse racing meeting.",
    url: "https://pacemap.co.uk",
    siteName: "PaceMap",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://pacemap.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "PaceMap — Race Shape Analysis",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider ui={ui}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <Script id="gtm-head" strategy="beforeInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NNXCSGPJ');
          `}</Script>
        </head>
        <body>
          <CookieBanner />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NNXCSGPJ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
