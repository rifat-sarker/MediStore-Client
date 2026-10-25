"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect, useRef } from "react";
import {
  Search, ShoppingCart, User, HeartPulse, LogOut, LayoutDashboard,
  ChevronDown, ShoppingBag, Heart, Pill, Phone, Menu, X, Baby, Activity, 
  Sparkles, ShieldCheck, Bike, ArrowRight, Loader2
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/AuthService";
import { useAppSelector } from "@/redux/hooks";
import { IProduct, MEDEX_BANGLADESH_PRODUCTS } from "@/types/product";
import CartDrawer from "./CartDrawer";
import FavoritesDrawer from "./FavoritesDrawer";

// Real-world Bangladeshi Pharma & Healthcare categories (ePharma & MedEx model)
export const EPHARMA_CATEGORIES: Record<
  string,
  {
    col1: { title: string; items: string[] };
    col2: { title: string; items: string[] };
    col3: { title: string; items: string[] };
    featured?: string;
  }
> = {
  "Medicines": {
    col1: {
      title: "Common Ailments",
      items: ["Fever & Pain Relief", "Cough & Cold", "Acidity & Gas", "Diarrhea & Vomiting", "Allergies & Skin", "Eye & Ear Care"]
    },
    col2: {
      title: "Chronic Care",
      items: ["Diabetes Management", "Blood Pressure & Heart", "Cholesterol Care", "Thyroid Disorders", "Kidney Care", "Arthritis & Joint Pain"]
    },
    col3: {
      title: "Specialized Therapy",
      items: ["Antibiotics & Anti-fungal", "Respiratory & Asthma", "Mental Health & Sleep", "Neurology & Brain", "Cancer / Oncology", "Liver Health"]
    },
    featured: "Top Brands: Napa, Ace, Seclo, Pantonix, Sergel, Monas, Bizoran"
  },
  "Baby & Mom": {
    col1: {
      title: "Baby Care",
      items: ["Baby Diapers & Wipes", "Baby Food & Formula", "Baby Bath & Shampoo", "Baby Lotions & Oil", "Teething & Oral Care"]
    },
    col2: {
      title: "Mom Maternity",
      items: ["Maternity Pads", "Stretch Mark Creams", "Breast Pumps & Feeding", "Prenatal Vitamins", "Postpartum Care"]
    },
    col3: {
      title: "Baby Healthcare",
      items: ["Baby Gripe Water", "Nasal Aspirators", "Baby Thermometers", "Pediatric Drops", "Vitamins for Kids"]
    },
    featured: "Popular: Cerelac, Pampers, Johnson's Baby, Aveeno Baby, Sudocrem"
  },
  "Diabetic Care": {
    col1: {
      title: "Glucose Monitors",
      items: ["Accu-Chek Glucometers", "On-Call Plus Meter", "Contour Plus Meter", "Test Strips (50 pcs)", "Lancets & Lancing Devices"]
    },
    col2: {
      title: "Insulin & Supplies",
      items: ["Insulin Cartridge (Lantus)", "Insulin Pen (Reusable)", "Insulin Needles 4mm/6mm", "Insulin Cooling Bags", "Alcohol Swabs"]
    },
    col3: {
      title: "Diabetic Nutrition & Foot Care",
      items: ["Sugar Free Natura / Canderel", "Diabetic Milk (Glucerna)", "Diabetic Socks & Shoes", "Foot Moisturizing Creams", "Low GI Healthy Snacks"]
    },
    featured: "Save up to 15% on Accu-Chek & Contour Test Strips bundle packages"
  },
  "Health & Devices": {
    col1: {
      title: "Diagnostic Equipment",
      items: ["Digital BP Monitors", "Pulse Oximeters", "Digital Thermometers", "Weighing Scales", "Stethoscopes"]
    },
    col2: {
      title: "Respiratory & Support",
      items: ["Nebulizer Machines", "Oxygen Concentrators", "Vaporizers & Steamers", "Orthopedic Belts & Braces", "Wheelchairs & Walking Sticks"]
    },
    col3: {
      title: "First Aid & Surgical",
      items: ["Bandages & Gauze", "Surgical Gloves & Masks", "Antiseptic Liquids (Savlon)", "Hot & Cold Gel Packs", "Catheter & Syringes"]
    },
    featured: "Authorized Omron, Beurer, Rossmax Medical Devices with Warranty"
  },
  "Personal Care": {
    col1: {
      title: "Skin & Hair",
      items: ["Facial Cleansers & Face Wash", "Moisturizers & Body Lotion", "Sunscreen (SPF 50+)", "Anti-Dandruff Shampoos", "Hair Fall Serums"]
    },
    col2: {
      title: "Oral & Dental",
      items: ["Toothpaste for Sensitive Teeth", "Dental Floss & Mouthwash", "Electric Toothbrushes", "Denture Care", "Teeth Whitening"]
    },
    col3: {
      title: "Men & Women Grooming",
      items: ["Shaving & Beard Care", "Deodorants & Roll-ons", "Feminine Hygiene Washes", "Sanitary Napkins", "Hand Washes & Sanitizers"]
    },
    featured: "Featuring Cetaphil, CeraVe, Bioderma, Neutrogena & Dettol"
  },
  "Vital Wellness": {
    col1: {
      title: "Vitamins & Minerals",
      items: ["Multivitamins (Bextram Gold)", "Vitamin C & Zinc Tablets", "Vitamin D3 20000 IU", "Calcium & Magnesium", "Iron & Folic Acid"]
    },
    col2: {
      title: "Fitness & Nutrition",
      items: ["Whey Protein & Creatine", "Omega-3 Fish Oil 1000mg", "Green Tea & Detox", "Collagen Peptides", "Energy Drinks & Electrolytes"]
    },
    col3: {
      title: "Herbal & Immunity",
      items: ["Immunity Boosters", "Ashwagandha Extracts", "Tulsi & Honey Cough Drops", "Digestive Enzymes", "Sleep Support (Melatonin)"]
    },
    featured: "100% genuine imported and certified domestic wellness supplements"
  }
};

export default function Navbar() {
  const { user, setUser, setIsLoading } = useUser();
  const router = useRouter();
  const { products } = useAppSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // Live Real-Time Search Suggestions
  const [suggestions, setSuggestions] = useState<IProduct[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [favDrawerOpen, setFavDrawerOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  const navTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cartItemCount = products.reduce((acc, p) => acc + p.orderQuantity, 0);

  useEffect(() => {
    const updateFavCount = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavCount(Array.isArray(stored) ? stored.length : 0);
      } catch {
        setFavCount(0);
      }
    };
    updateFavCount();
    window.addEventListener("storage", updateFavCount);
    return () => window.removeEventListener("storage", updateFavCount);
  }, [favDrawerOpen]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time instant search suggestion filter
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const debounceTimer = setTimeout(() => {
      const tokens = query.split(/\s+/).filter(Boolean);
      const matches = MEDEX_BANGLADESH_PRODUCTS.filter((prod) => {
        const textToSearch = `${prod.name} ${prod.genericName || ""} ${prod.manufacturer || ""} ${prod.category?.name || ""}`.toLowerCase();
        return tokens.every((token) => textToSearch.includes(token));
      }).slice(0, 7);

      setSuggestions(matches);
      setShowSuggestions(true);
      setIsSearching(false);
    }, 120);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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
      setShowSuggestions(false);
      router.push(`/medicines?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (productId: string) => {
    setShowSuggestions(false);
    setSearchQuery("");
    setMobileMenuOpen(false);
    router.push(`/medicines/${productId}`);
  };

  const handleMouseEnter = (cat: string) => {
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    setActiveMegaMenu(cat);
  };

  const handleMouseLeave = () => {
    navTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 180);
  };

  return (
    <>
      <div className="w-full relative z-50 shadow-sm bg-white border-b border-border">
        
        {/* 1. Top Utility Bar (ePharma Style) */}
        <div className="bg-secondary/40 border-b border-border hidden lg:block text-xs font-medium text-muted-foreground">
          <div className="container mx-auto px-4 h-9 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-foreground/80">
                <Phone className="w-3.5 h-3.5 text-primary"/> +880 1800-MEDISTORE (09600-000000)
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground/80">support@medistore.com.bd</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-primary font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Medicine Guaranteed
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/about" className="hover:text-primary transition-colors font-medium">About Us</Link>
              <Link href="/contact" className="hover:text-primary transition-colors font-medium">Contact</Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/orders" className="hover:text-primary transition-colors">Track Your Order</Link>
              <span className="text-muted-foreground">|</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">24/7 Hotline</span>
            </div>
          </div>
        </div>

        {/* 2. Middle Main Bar (Logo, Search, Drawers, Profile) */}
        <div className="bg-white">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Mobile Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="bg-primary p-2.5 rounded-2xl text-primary-foreground group-hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-2xl font-black text-foreground tracking-tight leading-none">
                  Medi<span className="text-primary">Store</span>
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold tracking-wider uppercase mt-0.5">
                  Online Pharmacy & Healthcare
                </span>
              </div>
            </Link>

            {/* Search (Desktop - ePharma inspired wide search with Real-Time Instant Suggestions) */}
            <div ref={searchContainerRef} className="hidden lg:flex flex-1 max-w-2xl relative">
              <form onSubmit={handleSearch} className="w-full relative">
                <div className="relative w-full flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                    placeholder="Search Medicine, Generics, Baby Care, Diagnostic Devices..."
                    className="w-full h-12 pl-12 pr-28 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm transition-colors shadow-sm"
                  />
                  {isSearching ? (
                    <div className="absolute right-28 mr-2 text-muted-foreground animate-spin">
                      <Loader2 className="w-4 h-4" />
                    </div>
                  ) : null}
                  <button 
                    type="submit" 
                    className="absolute right-1.5 h-9 px-5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-extrabold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" /> Search
                  </button>
                </div>
              </form>

              {/* Real-time instant search suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-secondary/40 border-b border-border/60 flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">
                      Matching Products ({suggestions.length})
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Click to view medicine
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-border/40">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSuggestionClick(item.id)}
                        className="w-full px-4 py-3 text-left hover:bg-secondary/60 flex items-center gap-3.5 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-border/60 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                          <img
                            src={item.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80"}
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </span>
                            {item.strength && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold shrink-0">
                                {item.strength}
                              </span>
                            )}
                          </div>
                          {item.genericName && (
                            <p className="text-xs text-muted-foreground truncate">
                              {item.genericName}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-primary/80 font-semibold truncate">
                              {item.manufacturer}
                            </span>
                            <span className="text-[10px] text-muted-foreground">•</span>
                            <span className="text-[10px] bg-primary/10 text-primary font-bold px-1.5 py-0.2 rounded">
                              {item.category?.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-primary">
                            ৳ {item.price.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">In Stock</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-2.5 bg-muted/20 border-t border-border/50 text-center">
                    <button
                      type="button"
                      onClick={(e) => handleSearch(e as any)}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      View all results for &quot;{searchQuery}&quot; &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Icons + Drawers Trigger + Auth */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              
              {/* Favorites Drawer Trigger */}
              <button 
                onClick={() => setFavDrawerOpen(true)}
                className="relative p-2.5 hover:bg-secondary rounded-2xl transition-colors text-muted-foreground hover:text-red-500 flex items-center gap-1"
                title="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {favCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                    {favCount > 9 ? "9+" : favCount}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button 
                onClick={() => setCartDrawerOpen(true)}
                className="relative p-2.5 hover:bg-secondary rounded-2xl transition-colors flex items-center gap-2 text-foreground font-bold"
                title="Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-foreground" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
                      {cartItemCount > 9 ? "9+" : cartItemCount}
                    </span>
                  )}
                </div>
                <div className="hidden xl:flex flex-col items-start text-left leading-tight">
                  <span className="text-[10px] text-muted-foreground font-semibold">My Cart</span>
                  <span className="text-xs font-black text-primary">
                    ৳ {products.reduce((acc, p) => acc + p.price * p.orderQuantity, 0).toFixed(2)}
                  </span>
                </div>
              </button>

              <div className="h-6 w-px bg-border hidden lg:block mx-1" />

              {/* Auth Area */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-2 hover:bg-secondary px-3 py-2 rounded-xl text-sm font-medium transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-bold text-sm">
                      {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden lg:flex flex-col items-start leading-tight">
                      <span className="text-[10px] text-muted-foreground font-semibold">Account</span>
                      <span className="font-bold text-xs max-w-[90px] truncate">{user.name || user.email.split('@')[0]}</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground hidden lg:block transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95">
                        <div className="px-4 py-3 border-b border-border/50 mb-2 bg-secondary/30">
                          <p className="text-sm font-bold truncate text-foreground">{user.name || "Customer"}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider bg-primary/10 text-primary font-extrabold">
                            {user.role}
                          </span>
                        </div>
                        {user.role === "ADMIN" && (
                          <Link href="/admin" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-secondary hover:text-primary transition-colors">
                            <LayoutDashboard className="w-4 h-4 text-primary" /> Admin Portal
                          </Link>
                        )}
                        {user.role === "RIDER" && (
                          <Link href="/rider-dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-secondary hover:text-primary transition-colors">
                            <Bike className="w-4 h-4 text-primary" /> Rider Dashboard
                          </Link>
                        )}
                        <Link href="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-xs font-semibold hover:bg-secondary hover:text-primary transition-colors">
                          <ShoppingBag className="w-4 h-4 text-primary" /> Order History
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-destructive hover:bg-destructive/10 transition-colors mt-2 border-t border-border/50 pt-2.5">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In / Register</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Direct Search Bar (Quick access on phones) */}
          <div className="lg:hidden px-4 pb-3 pt-0">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines, vitamins..."
                className="w-full h-10 pl-10 pr-20 rounded-xl border border-border bg-secondary/30 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 bg-primary text-primary-foreground text-[11px] font-bold rounded-lg transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* 3. Bottom Category Bar (Mega Menu inspired by epharma.com.bd) */}
        <div 
          className="bg-[#0f766e] text-white hidden lg:block relative select-none"
          onMouseLeave={handleMouseLeave}
        >
          <div className="container mx-auto px-4 h-11 flex items-center justify-between text-xs font-semibold tracking-wide">
            
            {/* Centered Categories Bar */}
            <div className="flex-1 flex items-center justify-center gap-1 xl:gap-2 h-full">
              {Object.keys(EPHARMA_CATEGORIES).map((catName) => {
                const isActive = activeMegaMenu === catName;
                return (
                  <div
                    key={catName}
                    className="h-full flex items-center relative"
                    onMouseEnter={() => handleMouseEnter(catName)}
                  >
                    <Link
                      href={`/medicines?category=${encodeURIComponent(catName)}`}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                        isActive ? "bg-white text-teal-900 shadow-sm font-bold" : "hover:bg-white/15 text-white"
                      }`}
                    >
                      <span>{catName}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? "rotate-180 text-primary" : "opacity-80"}`} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right side Hot Deals & Offers */}
            <div className="flex items-center shrink-0 pl-4">
              <Link 
                href="/medicines" 
                className="font-bold text-teal-950 hover:bg-yellow-300 flex items-center gap-1.5 bg-yellow-400 px-3 py-1.5 rounded-full shadow-sm text-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-900" /> Hot Deals & Offers
              </Link>
            </div>
          </div>

          {/* Active Mega Menu Dropdown (Full width ePharma Style) */}
          {activeMegaMenu && EPHARMA_CATEGORIES[activeMegaMenu] && (
            <div 
              className="absolute top-full left-0 w-full bg-white text-foreground shadow-2xl border-t-2 border-primary z-50 animate-in fade-in slide-in-from-top-1 duration-200"
              onMouseEnter={() => {
                if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container mx-auto px-6 py-7">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
                      <span className="text-primary">{activeMegaMenu}</span> Department
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {EPHARMA_CATEGORIES[activeMegaMenu].featured}
                    </p>
                  </div>
                  <Link
                    href={`/medicines?category=${encodeURIComponent(activeMegaMenu)}`}
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    Explore All {activeMegaMenu} &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-3">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col1.title}
                    </h4>
                    <ul className="space-y-2">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col1.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/medicines?search=${encodeURIComponent(item)}`}
                            onClick={() => setActiveMegaMenu(null)}
                            className="text-xs text-muted-foreground hover:text-primary hover:font-bold transition-all block py-0.5"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-3">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col2.title}
                    </h4>
                    <ul className="space-y-2">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col2.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/medicines?search=${encodeURIComponent(item)}`}
                            onClick={() => setActiveMegaMenu(null)}
                            className="text-xs text-muted-foreground hover:text-primary hover:font-bold transition-all block py-0.5"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-3">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col3.title}
                    </h4>
                    <ul className="space-y-2">
                      {EPHARMA_CATEGORIES[activeMegaMenu].col3.items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/medicines?search=${encodeURIComponent(item)}`}
                            onClick={() => setActiveMegaMenu(null)}
                            className="text-xs text-muted-foreground hover:text-primary hover:font-bold transition-all block py-0.5"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Banner Strip at bottom of mega menu */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground bg-secondary/20 p-3 rounded-xl">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Genuine products with batch verification and proper refrigeration control
                  </span>
                  <Link 
                    href="/medicines" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    View All Categories <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Mobile Menu Slide-out */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-border shadow-xl z-50 animate-in slide-in-from-top-4">
            <div className="p-4 space-y-4">
              <div className="relative">
                <form onSubmit={handleSearch} className="flex relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search medicine or brand..."
                    className="w-full h-11 pl-4 pr-12 rounded-xl border border-border focus:outline-none focus:border-primary text-xs bg-secondary/30"
                  />
                  <button type="submit" className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-primary text-primary-foreground rounded-r-xl">
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden divide-y divide-border/40 max-h-60 overflow-y-auto">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSuggestionClick(item.id)}
                        className="w-full px-3 py-2 text-left hover:bg-secondary flex items-center gap-2.5 transition-colors"
                      >
                        <img
                          src={item.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&auto=format&fit=crop&q=80"}
                          alt={item.name}
                          className="w-8 h-8 rounded object-contain shrink-0 mix-blend-multiply bg-white border border-border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{item.genericName || item.manufacturer}</p>
                        </div>
                        <span className="text-xs font-bold text-primary shrink-0">৳ {item.price.toFixed(2)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(EPHARMA_CATEGORIES).map((cat) => (
                  <Link
                    key={cat}
                    onClick={() => setMobileMenuOpen(false)}
                    href={`/medicines?category=${encodeURIComponent(cat)}`}
                    className="flex items-center gap-2 p-3 bg-secondary/40 rounded-xl text-xs font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Pill className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate">{cat}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-border flex justify-between text-xs font-semibold">
                <button 
                  onClick={() => { setMobileMenuOpen(false); setFavDrawerOpen(true); }}
                  className="flex items-center gap-1.5 text-muted-foreground p-2"
                >
                  <Heart className="w-4 h-4 text-red-500" /> Saved Items ({favCount})
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setCartDrawerOpen(true); }}
                  className="flex items-center gap-1.5 text-primary p-2"
                >
                  <ShoppingCart className="w-4 h-4" /> Cart ({cartItemCount})
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Cart and Favorites Slide-out Drawers */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <FavoritesDrawer isOpen={favDrawerOpen} onClose={() => setFavDrawerOpen(false)} />
    </>
  );
}
