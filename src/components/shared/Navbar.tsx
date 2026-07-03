"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  HeartPulse,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/AuthService";

export default function Navbar() {
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoading(true);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
            MediStore
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary/60 border border-border/40 focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>

        {/* Nav Links + Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/medicines"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block"
          >
            Medicines
          </Link>
          <div className="h-4 w-px bg-border hidden md:block" />

          {/* Cart */}
          <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Auth Area */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-full text-sm font-medium transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden md:block max-w-[100px] truncate">
                  {user.name || user.email}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs text-muted-foreground">Signed in as</p>
                      <p className="text-sm font-semibold truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">
                        {user.role.toLowerCase()}
                      </span>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-primary" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                      My Orders
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors border-t border-border mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
