import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { StoreProvider } from "./providers/Themcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const coffeeFont = localFont({
  src: "../public/fonts/Vazirmatn-Bold.ttf",
  variable: "--font-coffee",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={coffeeFont.variable}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-coffee
          antialiased
        `}
      >
        <StoreProvider>
        {children}
        </StoreProvider>
      </body>
    </html>
  );
}
