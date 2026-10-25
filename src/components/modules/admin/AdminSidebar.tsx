"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Pill,
  Tag,
  ShoppingCart,
  Users,
  HeartPulse,
  LogOut,
  Bike,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { logoutUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { useAdminSidebar } from "@/context/AdminSidebarContext";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/medicines", label: "Medicines", icon: Pill },
  { href: "/admin/categories", label: "Categories", icon: Tag },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/riders", label: "Riders", icon: Bike },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser, setIsLoading } = useUser();
  const { sidebarOpen, setSidebarOpen, collapsed, toggleCollapsed } = useAdminSidebar();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoading(true);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen flex flex-col bg-card/95 backdrop-blur-md border-r border-border transition-all duration-300 ease-in-out ${
          collapsed ? "lg:w-20" : "lg:w-64"
        } ${
          sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header / Brand */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-border/80">
          <Link href="/" className="flex items-center gap-3 group overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-teal-600 p-2.5 rounded-2xl text-primary-foreground shadow-md shadow-primary/20 shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            {(!collapsed || sidebarOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="text-base font-black tracking-tight text-foreground truncate">
                  Medi<span className="text-primary">Store</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">
                  Admin Portal
                </span>
              </div>
            )}
          </Link>

          {/* Close on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card when expanded */}
        {(!collapsed || sidebarOpen) && (
          <div className="p-4 mx-3 my-3 bg-secondary/40 border border-border/60 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black text-sm shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{user?.name || "Administrator"}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email || "admin@medistore.com"}</p>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed && !sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                } ${collapsed && !sidebarOpen ? "justify-center px-0" : ""}`}
              >
                <item.icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                {(!collapsed || sidebarOpen) && <span className="truncate">{item.label}</span>}

                {/* Tooltip for collapsed view on desktop */}
                {collapsed && !sidebarOpen && (
                  <div className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions & Collapse Toggle */}
        <div className="p-3 border-t border-border/80 space-y-1">
          {/* View Live Store */}
          <Link
            href="/"
            className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all ${
              collapsed && !sidebarOpen ? "justify-center px-0" : ""
            }`}
            title="View Store"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {(!collapsed || sidebarOpen) && <span>View Storefront</span>}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapsed}
            className={`hidden lg:flex items-center gap-3.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3.5 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 transition-all ${
              collapsed && !sidebarOpen ? "justify-center px-0" : ""
            }`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || sidebarOpen) && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
