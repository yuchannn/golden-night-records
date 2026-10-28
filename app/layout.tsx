import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { label, siteDescription } from "@/lib/content";
import { getConfiguredSiteUrl } from "@/lib/catalogue";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: "normal",
  display: "swap",
  variable: "--font-dm",
});

const notoSerifTC = localFont({
  src: "./fonts/noto-serif-tc-600.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  variable: "--font-noto-serif",
  adjustFontFallback: false,
  fallback: ["Songti TC", "PMingLiU", "serif"],
});

const notoSansTC = localFont({
  src: [
    { path: "./fonts/noto-sans-tc-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-sans-tc-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-noto-sans",
  adjustFontFallback: false,
  fallback: ["PingFang TC", "Microsoft JhengHei", "sans-serif"],
});

const siteUrl = getConfiguredSiteUrl();
const siteTitle = `${label.nameZh} ${label.nameEn}`;
const shareImage = siteUrl
  ? [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "金宵唱片 Golden Night Records。把今宵，留在歌裡。",
      },
    ]
  : undefined;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${label.nameZh}`,
  },
  description: siteDescription,
  applicationName: label.nameZh,
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "zh_TW",
    type: "website",
    siteName: label.nameZh,
    images: shareImage,
  },
  twitter: {
    card: siteUrl ? "summary_large_image" : "summary",
    title: siteTitle,
    description: siteDescription,
    images: shareImage,
  },
};

export const viewport: Viewport = {
  themeColor: "#F1EEE5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${playfair.variable} ${dmSans.variable} ${notoSerifTC.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main" className="skip-link font-medium">
          跳至主要內容
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
