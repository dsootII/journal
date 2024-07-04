import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import { Theme,ThemePanel  } from '@radix-ui/themes';
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
  debugger;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>            
            {children}
        </Theme>
      </body>
    </html>
  );
}
