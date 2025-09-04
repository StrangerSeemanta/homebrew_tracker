import type { Metadata } from "next";
import { Poppins, Matemasie, Caprasimo } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const mateMasie = Matemasie({
  variable: "--font-mate",
  weight: ["400"],
  subsets: ["latin"],
});
const cap = Caprasimo({
  variable: "--font-cap",
  weight: ["400"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Homebrew Tracker",
  description: "Track your Fementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${cap.variable} ${mateMasie.variable} ${poppins.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
