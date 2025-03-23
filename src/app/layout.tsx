import "./globals.css"
import Navbar from "@/components/shared/Navbar";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {/* <Navbar /> */}
          {children}
          <Toaster richColors position={"top-center"} />
        </body>
      </html>
    </Providers>
  );
}
