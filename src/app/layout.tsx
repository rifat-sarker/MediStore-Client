import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { Outfit } from "next/font/google";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "MediStore | Premium Pharmacy",
  description: "Your trusted online pharmacy, delivering care everywhere.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <Script
          src="https://accounts.google.com/gsi/client?hl=en"
          strategy="beforeInteractive"
        />
        <Providers>
          {children}
          <Toaster richColors position={"top-center"} />
        </Providers>
      </body>
    </html>
  );
}


