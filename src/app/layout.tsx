import type { Metadata } from "next";


import { Toaster } from 'react-hot-toast';

import "./globals.css";
import { LogginProvider } from "./context/LogginContext";
import { ProgressProvider } from "./context/ProgressContext";
import { Inter, Ubuntu, Poppins } from 'next/font/google'

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
})
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

const inter = Inter({ subsets: ["latin"] ,variable: '--font-inter',});

export const metadata: Metadata = {
  title: "Fursphere",
  description: "fursphere - The ultimate pet platform",
  icons: {
    icon: "/icon.png", // 你的 Favicon 图标路径
    shortcut: "/icon.png",
    apple: "/icon.png", // 适用于 iOS
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${poppins.variable} ${ubuntu.className}`}>
      <body className={inter.className}>
      <LogginProvider>
        <ProgressProvider>
          {children}
          <Toaster />
        </ProgressProvider>
      </LogginProvider>
      </body>
    </html>
  );
}
