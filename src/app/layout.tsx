import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/navbars/TopNavbar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Navbar from "@/components/navbars/Navbar";
import Footer from "@/components/footers/Footer";
import NewsLetter from "@/components/newsletters/NewsLetter";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import TopHeader from "@/components/headers/TopHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  weight: ["300", "400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Winimix | Shop",
  description: "Dropshipping Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tajawal.variable}  ${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-primary-dark`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LocaleProvider>
            <CartProvider>
              <TopHeader />
              <Header />
              <TopNavbar />
              <Navbar />
              {children}
              <NewsLetter />
              <Footer />
            </CartProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
