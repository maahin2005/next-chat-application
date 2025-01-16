import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionsProviderWrapper from "@/components/SessionsProviderWrapper";
import StoreProvider from "./StoreProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Let's Chat",
  description: "Simple & Free Chats Everyday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <SessionsProviderWrapper>
        <StoreProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1800px] m-auto font-ubuntu`}
          >
            <EdgeStoreProvider>
              {children} <Toaster />
            </EdgeStoreProvider>
          </body>
        </StoreProvider>
      </SessionsProviderWrapper>
    </html>
  );
}
