import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vikramatic Designs — We Build Brands That Move People",
  description:
    "A full-service creative studio specializing in Brand Identity, Motion Graphics, UI Design, Web Development, Workflow Automation, and Social Media Management.",
  keywords: [
    "brand identity",
    "motion graphics",
    "UI design",
    "web development",
    "creative studio",
    "Vikramatic Designs",
    "branding agency",
    "workflow automation",
  ],
  openGraph: {
    title: "Vikramatic Designs — We Build Brands That Move People",
    description:
      "A full-service creative studio crafting digital experiences that convert, inspire, and endure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
        />
        <style>{`
          :root { --font-clash: 'Clash Display', sans-serif; }
          .font-display { font-family: var(--font-clash), sans-serif; }
        `}</style>
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
