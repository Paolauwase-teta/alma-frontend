import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/app/components/LayoutWrapper";

import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "ALMA | From Farm to Fork - Food Spoilage Detection",
  description: "Science-based food spoilage detection and food management system reducing waste using IoT and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
