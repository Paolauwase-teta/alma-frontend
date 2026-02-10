import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/app/components/LayoutWrapper";

// Using native font loading if available, or relying on globals.css for now
// Assuming fonts are handled in globals.css or previous context

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
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
