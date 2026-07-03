"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Pill,
  Tag,
  ShoppingCart,
  Users,
  HeartPulse,
  LogOut,
  Bike,
} from "lucide-react";
import { logoutUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

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
  const { setUser, setIsLoading } = useUser();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoading(true);
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">MediStore</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
