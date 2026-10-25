import AdminSidebar from "@/components/modules/admin/AdminSidebar";
import AdminHeader from "@/components/modules/admin/AdminHeader";
import { AdminSidebarProvider } from "@/context/AdminSidebarContext";
import { getCurrentUser } from "@/services/AuthService/userUtils";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <AdminSidebarProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
