import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/useAuthContext';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Journal",
  description: "A personal journal to go through life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthProvider>
  );
}
