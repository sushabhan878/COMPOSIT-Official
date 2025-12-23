import type { Metadata } from "next";
import { Josefin_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/Provider";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COMPOSIT | 2026",
  description: "A festival celebrating the fusion of art, technology, and creativity, in the field of Metallurgy and Materials Science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
      </Provider>
      </body>
    </html>
  );
}
