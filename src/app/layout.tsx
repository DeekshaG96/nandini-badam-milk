import type { Metadata, Viewport } from "next";
import { Cinzel, Outfit, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-kannada",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nandini Badam Milk | KMF Karnataka Milk Federation",
  description:
    "Experience the iconic taste of Karnataka: Nandini Badam Milk. Infused with Kashmiri Kesar, crunchy badam flakes, and 100% pure KMF cow milk. Served chilled at 4°C or steaming warm at 60°C.",
  keywords: [
    "Nandini Badam Milk",
    "KMF Nandini",
    "Karnataka Milk Federation",
    "Badam Milk",
    "Flavoured Milk",
    "Kashmiri Saffron",
    "Almond Milk",
    "Bengaluru Dairy",
  ],
  authors: [{ name: "Karnataka Milk Federation (KMF)" }],
  openGraph: {
    title: "Nandini Badam Milk | The Royal Taste of Karnataka",
    description:
      "Interactive 3D cinematic showcase of KMF Nandini Badam Milk with real-time fluid simulation and Kashmiri Kesar infusion.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F59E0B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Nandini Badam Flavoured Milk",
    brand: {
      "@type": "Brand",
      name: "Nandini (KMF)",
    },
    description:
      "Pasteurized homogenized flavoured toned cow milk with real badam and saffron.",
    nutrition: {
      "@type": "NutritionInformation",
      calories: "174 kcal",
      proteinContent: "6.4 g",
      calciumContent: "230 mg",
      servingSize: "200 ml",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "35.00",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable} ${notoKannada.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream-pure text-bronze dark:bg-zinc-950 dark:text-cream-pure min-h-screen transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
