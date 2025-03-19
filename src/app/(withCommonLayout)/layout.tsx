import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
// import "./global.css";
export default function CommonLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen"> {children}</main>
      <Toaster richColors position={"top-center"} />
      <Footer />
    </>
  );
}
