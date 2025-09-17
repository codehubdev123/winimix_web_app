import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
// import "./globals.css";
import TopNavbar from "@/components/navbars/TopNavbar";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Navbar from "@/components/navbars/Navbar";
import Footer from "@/components/footers/Footer";
import NewsLetter from "@/components/newsletters/NewsLetter";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import TopHeader from "@/components/headers/TopHeader";
import Features from "@/components/Features";
import Newa from "@/components/Newa";
import NewBanner from "@/components/newdesign/NewBanner";
import NewCategories from "@/components/newdesign/NewCategories";
import NewProductSlider from "@/components/newdesign/NewProductSlider";
import NewFeatures from "@/components/newdesign/NewFeatures";
import NewFooter from "@/components/newdesign/NewFooter";
import AnimationWrapper from "@/components/animations/AnimationWrapper";
import NewStoresSlider from "@/components/newdesign/NewStoresSlider";
import BrandSlider from "@/components/sliders/BrandSlider";
import NewBrands from "@/components/newdesign/NewBrands";
import NewHeader from "@/components/newdesign/NewHeader";
import NewMobileSidebar from "@/components/newdesign/NewMobileSidebar";

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

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  ${geistSans.variable} ${geistMono.variable} ${tajawal.variable} antialiased bg-white dark:bg-primary-dark`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LocaleProvider>
            <CartProvider>
              {/* <NewCategories /> */}
              {/* <AnimationWrapper direction="left" delay={1}> */}
              {/*   <NewProductSlider /> */}
              {/* </AnimationWrapper> */}
              {/* <AnimationWrapper direction="right" delay={1}> */}
              {/*   <NewFeatures /> */}
              {/* </AnimationWrapper> */}
              {/* <AnimationWrapper direction="right" delay={2}> */}
              {/*   <NewStoresSlider /> */}
              {/* </AnimationWrapper> */}
              {/* <AnimationWrapper direction="left" delay={2}> */}
              {/*   <NewBrands /> */}
              {/* </AnimationWrapper> */}
              {/* <AnimationWrapper direction="left" delay={2}> */}
              {/*   <BrandSlider /> */}
              {/* </AnimationWrapper> */}
              {/* <TopHeader /> */}
              {/* <Header /> */}
              {/* <Features /> */}
              {/* <Newa /> */}
              {/* <div className="mt-[300px]"></div> */}
              {/* <TopNavbar /> */}
              {/* <Navbar /> */}
              {/* <NewMobileSidebar /> */}
              {children}
              {/* <Footer /> */}
            </CartProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
