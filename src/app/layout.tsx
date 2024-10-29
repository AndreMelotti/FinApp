import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google'
import localFont from "next/font/local";
import "./globals.css";
import { TopBar } from "@/components/top-bar"
import { ThemeProvider } from "@/components/theme-provider"

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: 'Monetrix',
  description: 'Plataforma que une ferramentas de gestão financeira pessoal e ferramentas de investimento',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

