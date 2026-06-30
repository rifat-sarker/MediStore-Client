import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import { Open_Sans } from "next/font/google";

const open_Sans = Open_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={open_Sans.className}>
      <body>
        <Providers>
          {/* <Navbar /> */}
          {children}
          <Toaster richColors position={"top-center"} />
        </Providers>
      </body>
    </html>
  );
}

