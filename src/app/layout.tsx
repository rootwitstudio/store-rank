import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({ 
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "StoreRankly - Trusted E-commerce Store Reviews",
  description:
    "StoreRankly helps you find and share honest reviews about online stores. Make informed shopping decisions with real customer experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} font-sans antialiased`}>
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
