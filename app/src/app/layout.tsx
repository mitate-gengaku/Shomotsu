import { Geist } from "next/font/google";
import Script from "next/script";

import type { Metadata } from "next";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shomotsu | オンライン読書・執筆プラットフォーム",
  description:
    "Shomotsuは、3D技術を活用した没入感あふれる読書体験を提供するプラットフォームです。お気に入りの物語を臨場感のあるページめくりアニメーションで楽しんだり、自分の創作を世界に発信したりできます。新しい読書の形をお試しください。",
  metadataBase: new URL(process.env.SHOMOTSU_URL || "http://localhost:3000"),
  openGraph: {
    title: "Shomotsu | オンライン読書・執筆プラットフォーム",
    description:
      "Shomotsuは、3D技術を活用した没入感あふれる読書体験を提供するプラットフォームです。お気に入りの物語を臨場感のあるページめくりアニメーションで楽しんだり、自分の創作を世界に発信したりできます。新しい読書の形をお試しください。",
    url: process.env.SHOMOTSU_URL,
    siteName: "Shomotsu",
    /*images: [
      {
        url: `${process.env.SHOMOTSU_URL}/site.png`,
        width: 800,
        height: 600,
      },
    ],*/
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shomotsu | オンライン読書・執筆プラットフォーム",
    description:
      "Shomotsuは、3D技術を活用した没入感あふれる読書体験を提供するプラットフォームです。お気に入りの物語を臨場感のあるページめくりアニメーションで楽しんだり、自分の創作を世界に発信したりできます。新しい読書の形をお試しください。",
    /*images: [
      {
        url: `${process.env.SHOMOTSU_URL}/site.png`,
        width: 800,
        height: 600,
      },
    ],*/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Script
          async
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.UMAMI_DABA_WEBSITE_ID}
        />
      </body>
    </html>
  );
}
