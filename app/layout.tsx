import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "CompressKit — Free Image Compressor | Compress, Resize & Convert Images",
  description:
    "Compress images up to 80% without losing quality. Bulk compress, resize, and convert to WebP/PNG/JPEG — 100% free, no upload needed. All processing happens in your browser.",
  keywords: [
    "image compressor",
    "bulk image compression",
    "WebP converter",
    "resize images",
    "optimize images",
    "compress PNG",
    "compress JPEG",
    "client-side image compression",
  ],
  openGraph: {
    title: "CompressKit — Free Image Compressor",
    description:
      "Compress images up to 80% without losing quality. Bulk process, resize, and convert — all in your browser.",
    type: "website",
    siteName: "CompressKit",
  },
  twitter: {
    card: "summary_large_image",
    title: "CompressKit — Free Image Compressor",
    description:
      "Compress images up to 80% without losing quality. Bulk process, resize, and convert — all in your browser.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
