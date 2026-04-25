import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Cuddle Paw | Premium Pet Care & Accessories",
  description: "Because your pet deserves the same love you give them. Experience the 2026 standard in pet living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <Preloader />
        {children}
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
