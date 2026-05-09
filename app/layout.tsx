import "./globals.css";
import StoreProvider from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import FAQChatbot from "@/components/FAQChatbot";

export const metadata = {
  title: "Noire | Elegance in Every Shade",
  description:
    "Noire is a modern beauty brand created for those who believe makeup should enhance, not hide. Soft luxury, timeless elegance.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain-bg">
        <StoreProvider>
          <Navbar />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
          <FAQChatbot />
        </StoreProvider>
      </body>
    </html>
  );
}
