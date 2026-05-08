import type { Metadata } from "next";
import "./globals.css";
import { Lato, Lora } from "next/font/google";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "HANKET — Premium Fashion",
  description: "Premium fashion house blending heritage craftsmanship with contemporary design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${lora.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-flat-bg text-flat-text antialiased min-w-0 overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
