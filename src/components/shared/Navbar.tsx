"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import {
  Search, ShoppingCart, User, HeartPulse, LogOut, LayoutDashboard,
  ChevronDown, ShoppingBag, Heart, Pill, Phone, Menu, X, Baby, Activity, HeartHandshake, Stethoscope, Bike
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/AuthService";

const MEGA_MENU_CATEGORIES = {
  "Medicines": ["Acne", "Allergies", "Anaemia", "Anti-Thyroid", "Anxiety", "Arrhythmia", "Arthritis", "Asthma", "Behavioral Disorder", "Blood Clot", "Bone Metabolism", "Cancer/oncology", "Cough & Cold", "Depression", "Diabetes", "Fever & Pain Relief"],
  "Baby & Mom": ["Baby Food", "Diapers", "Baby Skincare", "Maternity Accessories", "Toys"],
  "Diabetic Care": ["Blood Glucose Monitors", "Test Strips", "Sugar Free Nutrition", "Foot Care"],
  "Personal Care": ["Skin Care", "Hair Care", "Oral Care", "Bath & Body", "Fragrances"],
  "Vitamins & Supplements": ["Multivitamins", "Omega 3", "Calcium", "Immunity Boosters"]
};

export default function Navbar() {
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoading(true);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/medicines?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="w-full relative z-50 shadow-sm">
      
      {/* 1. Top Utility Bar (Hidden on Mobile) */}
      <div className="bg-secondary/40 border-b border-border hidden lg:block text-xs font-medium text-muted-foreground">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> +880 1234-567890</span>
            <span>support@medistore.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Find Doctor</Link>
            <Link href="/orders" className="hover:text-primary transition-colors">Track Order</Link>
          </div>
        </div>
      </div>

      {/* 2. Middle Main Bar (Logo, Search, Cart, Profile) */}
      <div className="bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Mobile Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-foreground">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary p-2 rounded-xl text-primary-foreground group-hover:scale-105 transition-transform shadow-lg shadow-primary/30">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-foreground tracking-tight hidden sm:block">
              Medi<span className="text-primary">Store</span>
            </span>
          </Link>

          {/* Search (Desktop) */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Medicine / ঔষধ ও পণ্য সার্চ করুন"
              className="w-full h-12 pl-12 pr-4 rounded-l-md border-y border-l border-border focus:outline-none focus:border-primary text-sm"
            />
            <button type="submit" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-r-md transition-colors">
              Search
            </button>
          </form>

          {/* Icons + Auth */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link href="/favorites" className="relative p-2 hover:bg-secondary rounded-full transition-colors hidden sm:block text-muted-foreground hover:text-red-500">
              <Heart className="w-6 h-6" />
            </Link>

            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors flex items-center gap-2 text-foreground">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-white" />
              </div>
              <span className="hidden lg:block font-bold">Cart</span>
            </Link>

            <div className="h-6 w-px bg-border hidden lg:block mx-2" />

            {/* Auth Area */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-xs text-muted-foreground">Hello,</span>
                    <span className="font-bold max-w-[100px] truncate leading-tight">{user.name || user.email.split('@')[0]}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground hidden lg:block transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-2xl z-20 py-2">
                      <div className="px-4 py-3 border-b border-border/50 mb-2 bg-secondary/20">
                        <p className="text-sm font-bold truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded uppercase tracking-wider bg-primary/10 text-primary font-bold">
                          {user.role}
                        </span>
                      </div>
                      {user.role === "ADMIN" && (
                        <Link href="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary hover:text-primary transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}
                      {user.role === "RIDER" && (
                        <Link href="/rider-dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary hover:text-primary transition-colors">
                          <Bike className="w-4 h-4" /> Rider Dashboard
                        </Link>
                      )}
                      <Link href="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-secondary hover:text-primary transition-colors">
                        <ShoppingBag className="w-4 h-4" /> My Orders
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors mt-2 border-t border-border/50 pt-3">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:bg-secondary px-4 py-2 rounded-lg text-sm font-bold transition-all">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Category Bar (Mega Menu Trigger) */}
      <div className="bg-primary text-primary-foreground hidden lg:block relative">
        <div className="container mx-auto px-4 h-12 flex items-center gap-6">
          
          <div 
            className="h-full flex items-center relative group"
            onMouseEnter={() => setActiveMegaMenu("Medicines")}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <Link href="/medicines" className="flex items-center gap-1 font-bold text-sm tracking-wide hover:text-white/80 h-full">
              Medicines <ChevronDown className="w-4 h-4" />
            </Link>
            
            {/* Mega Menu Dropdown */}
            {activeMegaMenu === "Medicines" && (
              <div className="absolute top-full left-0 w-[800px] bg-white text-foreground shadow-2xl border-t-4 border-primary rounded-b-xl z-50 p-6 flex flex-col cursor-default">
                <div className="grid grid-cols-4 gap-6">
                  {Object.keys(MEGA_MENU_CATEGORIES).map((catName) => (
                    <div key={catName}>
                      <h4 className="font-extrabold text-sm mb-4 border-b border-border/50 pb-2 text-primary">{catName}</h4>
                      <ul className="space-y-2">
                        {MEGA_MENU_CATEGORIES[catName as keyof typeof MEGA_MENU_CATEGORIES].slice(0, 6).map((item) => (
                          <li key={item}>
                            <Link href={`/medicines?category=${encodeURIComponent(item)}`} className="text-xs text-muted-foreground hover:text-primary hover:underline transition-all block">
                              {item}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link href={`/medicines?category=${encodeURIComponent(catName)}`} className="text-xs font-bold text-primary hover:underline mt-2 inline-block">
                            View All &rarr;
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/medicines?category=Baby" className="font-semibold text-sm hover:text-white/80">Baby & Mom</Link>
          <Link href="/medicines?category=Diabetic" className="font-semibold text-sm hover:text-white/80">Diabetic Care</Link>
          <Link href="/medicines?category=Devices" className="font-semibold text-sm hover:text-white/80">Health & Devices</Link>
          <Link href="/medicines?category=Personal" className="font-semibold text-sm hover:text-white/80">Personal Care</Link>
          <Link href="/medicines?category=Wellness" className="font-semibold text-sm hover:text-white/80">Vital Wellness</Link>
          <div className="ml-auto flex gap-4">
            <Link href="#" className="font-bold text-sm text-yellow-300 hover:text-yellow-100 flex items-center gap-1">⭐ New Offer</Link>
            <Link href="#" className="font-semibold text-sm hover:text-white/80">Blog</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-xl z-50 animate-in slide-in-from-top-4">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="flex relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-12 pl-4 pr-12 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-secondary/20"
              />
              <button type="submit" className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-r-lg">
                <Search className="w-5 h-5" />
              </button>
            </form>
            
            <div className="grid grid-cols-2 gap-2">
               <Link onClick={()=>setMobileMenuOpen(false)} href="/medicines" className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg text-sm font-bold text-primary"><Pill className="w-4 h-4"/> Medicines</Link>
               <Link onClick={()=>setMobileMenuOpen(false)} href="/favorites" className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg text-sm font-bold text-primary"><Heart className="w-4 h-4"/> Favorites</Link>
               <Link onClick={()=>setMobileMenuOpen(false)} href="/medicines?category=Baby" className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg text-sm font-bold text-primary"><Baby className="w-4 h-4"/> Baby & Mom</Link>
               <Link onClick={()=>setMobileMenuOpen(false)} href="/medicines?category=Diabetic" className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg text-sm font-bold text-primary"><Activity className="w-4 h-4"/> Diabetic Care</Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
