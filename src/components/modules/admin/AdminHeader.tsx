"use client";

import { useAdminSidebar } from "@/context/AdminSidebarContext";
import { useUser } from "@/context/UserContext";
import { Menu, Bell, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  const { toggleSidebar } = useAdminSidebar();
  const { user } = useUser();

  return (
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-xl border border-border bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:inline-block">
            Management Console
          </span>
          <h2 className="text-sm sm:text-base font-extrabold text-foreground">
            MediStore Operations
          </h2>
        </div>
      </div>

      {/* Right: Status badge & profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Healthy</span>
        </div>

        <Link
          href="/"
          className="text-xs font-bold text-primary hover:underline hidden sm:inline-block"
        >
          Storefront &rarr;
        </Link>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-2 sm:border-l border-border">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-sm shadow-primary/25">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-foreground leading-none">{user?.name || "Admin"}</span>
            <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
