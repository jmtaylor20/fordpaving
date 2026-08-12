import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { GA_TAG_ID } from "./gtag";
import { CallConversionTracker } from "./call-conversion-tracker";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "https://fordpaving.com"),
  title: {
    default: "Ford Paving & Sealing | Asphalt, Sealcoating & Striping",
    template: "%s | Ford Paving & Sealing",
  },
  description:
    "Professional asphalt paving, sealcoating, striping, thermoplastic markings, driveways, parking lots, patching, and free estimates in Opelika and Beauregard, Alabama.",
  keywords: [
    "asphalt",
    "sealcoating",
    "striping",
    "driveway",
    "patching",
    "parking lot",
    "thermoplastic",
    "thermoplast",
    "thermo",
    "pavement",
    "black top",
    "sealer",
    "free estimates",
  ],
  icons: {
    icon: "/favicon-64.png",
    shortcut: "/favicon-64.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ford Paving & Sealing",
    description:
      "Built smooth. Finished sharp. Professional pavement work and free estimates in Opelika and Beauregard, Alabama.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ford Paving & Sealing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ford Paving & Sealing",
    description: "Built smooth. Finished sharp.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Google tag (gtag.js) — Google Ads conversion tracking */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TAG_ID}');`}
        </Script>
        {children}
        <CallConversionTracker />
      </body>
    </html>
  );
}
