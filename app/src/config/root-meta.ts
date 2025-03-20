"server only";

export const rootMeta = {
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
