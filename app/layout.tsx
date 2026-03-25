import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import "./globals.css";

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
        </head>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
