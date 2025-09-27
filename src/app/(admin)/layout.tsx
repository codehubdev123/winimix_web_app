import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
// import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import HeaderAdmin from "@/components/headers/HeaderAdmin";
import SidebarAdmin from "@/components/sidebars/SidebarAdmin";

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
        className={`antialiased bg-white dark:bg-primary-dark`}
        suppressHydrationWarning
      >
        <LocaleProvider>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SidebarAdmin />
            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              {/* Header */}
              <HeaderAdmin />
              <div className="p-6">{children}</div>
            </main>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
