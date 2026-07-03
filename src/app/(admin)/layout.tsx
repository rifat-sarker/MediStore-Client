import AdminSidebar from "@/components/modules/admin/AdminSidebar";
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
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-muted/30">
        {children}
      </main>
    </div>
  );
}
