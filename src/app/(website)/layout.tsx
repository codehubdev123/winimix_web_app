import NewFooter from "@/components/newdesign/NewFooter";
import NewHeader from "@/components/newdesign/NewHeader";
import { CartProvider } from "@/contexts/CartContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <CartProvider>
          <NewHeader />
          <main>{children}</main>
          <NewFooter />
        </CartProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
