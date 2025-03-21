import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import type { Metadata } from "next";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { geistSans, manRope } from "@/config/font";
import { rootMeta } from "@/config/root-meta";
import { initMocks } from "@/lib/msw/setup/init";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { jaJP } from '@clerk/localizations'

if (process.env.NODE_ENV === "development") {
  initMocks();
}

export const metadata: Metadata = rootMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body
          className={`${geistSans.variable} ${manRope.variable} cursor-default antialiased`}
        >
          <Toaster richColors position="top-right" theme="light" />
          {children}
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.UMAMI_DABA_WEBSITE_ID}
          />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
