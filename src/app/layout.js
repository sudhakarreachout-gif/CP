import { Fraunces, Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Cuddle Paw | Premium Pet Care & Accessories",
  description: "Because your pet deserves the same love you give them. Experience the 2026 standard in pet living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fraunces.variable} ${jakarta.variable} ${nunito.variable} font-sans`} suppressHydrationWarning>
        <Preloader />
        {children}
        <WhatsAppButton />
        <BackToTop />
      </body>
    </html>
  );
}
