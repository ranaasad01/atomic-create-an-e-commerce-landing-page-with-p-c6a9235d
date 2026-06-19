import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Premium Shopping Experience",
  description:
    "Discover curated collections of premium products. Shop the latest trends in fashion, electronics, and lifestyle at Lumière.",
  keywords: ["e-commerce", "shopping", "premium", "fashion", "electronics"],
  openGraph: {
    title: "Lumière — Premium Shopping Experience",
    description: "Discover curated collections of premium products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}