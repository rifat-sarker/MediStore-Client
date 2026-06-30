import { ReactNode } from "react";
import Navbar from "@/components/shared/Navbar"; // Assume a standard Navbar exists

export default function RiderDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
