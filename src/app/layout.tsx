import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-background">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
