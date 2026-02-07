import type { Metadata } from "next";
import { Geist, Geist_Mono,Calligraffitti } from "next/font/google";
import "./globals.css";
import Provider from "@/components/provider/provider";

const calligrafi = Calligraffitti({weight: '400', subsets: ['latin']})
const geist = Geist({weight: '400', subsets: ['latin']})
export const metadata: Metadata = {
  title: "Todo App",
  description: "Create and manage your tasks with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} antialiased`}
      >
        <Provider>
          {children}
          
          </Provider>
      </body>
    </html>
  );
}
