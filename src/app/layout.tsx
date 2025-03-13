import "./globals.css"
import Navbar from "@/components/shared/Navbar";
import Providers from "@/providers/Providers";

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
        </body>
      </html>
    </Providers>
  );
}
