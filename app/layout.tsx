import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/redux/store-provider";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/theme-provider";
import TanStackProviders from "@/components/tankstack-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexusCart",
  description: "A shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased box-border`}
    >
      <body className="w-full h-full box-border">
        <StoreProvider>
          <ThemeProvider>
            <Toaster />
            <TanStackProviders>
              {children}
            </TanStackProviders>
            
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
