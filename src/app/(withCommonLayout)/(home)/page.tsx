import Hero from "@/components/modules/home/Hero";
import CategoryCard from "@/components/modules/home/CategoryCard";
import MedicineCard from "@/components/modules/home/MedicineCard";
import { fetchCategories, fetchMedicines } from "@/lib/api";
import { MEDEX_BANGLADESH_PRODUCTS } from "@/types/product";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Clock, CheckCircle2, TrendingUp, Mail, 
  UploadCloud, FileText, Sparkles, Award, Headphones, Truck, Stethoscope, 
  Percent, HeartPulse, Check
} from "lucide-react";

export const metadata = {
  title: "MediStore — Online Pharmacy & Healthcare Bangladesh",
  description: "Order genuine prescription medicines, OTC items, baby care, diabetic care and diagnostic equipment with instant delivery across Bangladesh.",
};

const MOCK_CATEGORIES = [
  { id: "c1", name: "Medicines", description: "Prescription & OTC drugs", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5e4b7b34b?q=80&w=300&auto=format&fit=crop" },
  { id: "c2", name: "Baby & Mom", description: "Diapers, formula & care", imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=300&auto=format&fit=crop" },
  { id: "c3", name: "Diabetic Care", description: "Glucometers & insulin care", imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=300&auto=format&fit=crop" },
  { id: "c4", name: "Health & Devices", description: "BP meters, nebulizers & masks", imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop" },
  { id: "c5", name: "Personal Care", description: "Skincare, haircare & hygiene", imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&auto=format&fit=crop" },
  { id: "c6", name: "Vital Wellness", description: "Vitamins & dietary health", imageUrl: "https://images.unsplash.com/photo-1550572017-edb9894e7724?q=80&w=300&auto=format&fit=crop" },
];

export default async function HomePage() {
  let categories = await fetchCategories();
  let medicines = await fetchMedicines();

  // If DB is empty, use verified MedEx dataset
  if (!categories || categories.length === 0) categories = MOCK_CATEGORIES;
  if (!medicines || medicines.length === 0) medicines = MEDEX_BANGLADESH_PRODUCTS;

  // Filter sections
  const trendingMedicines = medicines.slice(0, 8);
  const chronicCare = medicines.filter((m: any) => 
    m.name.includes("Seclo") || m.name.includes("Pantonix") || m.name.includes("Glucerna") || m.name.includes("Monas") || m.name.includes("Accu-Chek")
  ).slice(0, 4);

  return (
    <div className="flex flex-col bg-background">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Prescription Quick Upload & Service Highlights (ePharma inspired) */}
      <section className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white py-10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Quick Upload CTA */}
            <div className="lg:col-span-7 bg-white/10 backdrop-blur-md border border-white/15 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="p-4 bg-teal-500/20 border border-teal-400/30 rounded-2xl text-teal-300 shrink-0">
                <UploadCloud className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/30 text-teal-200 text-xs font-black rounded-full mb-2 uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" /> Doctor Prescription
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-white">Have a Prescription?</h3>
                <p className="text-white/80 text-xs md:text-sm mt-1">
                  Upload your doctor’s prescription now. Our registered "A-Grade" pharmacists will verify items and deliver them to your doorstep.
                </p>
              </div>
              <Link 
                href="/cart" 
                className="shrink-0 px-6 py-3.5 bg-white text-teal-900 font-extrabold rounded-xl shadow-lg hover:bg-teal-50 hover:scale-105 transition-all text-xs"
              >
                Upload Now
              </Link>
            </div>

            {/* Guarantees */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Truck className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Fast Home Delivery</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Express delivery within Dhaka and nationwide courier.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">100% Genuine</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Directly sourced from DGDA verified manufacturers.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Stethoscope className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Doctor Consultation</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Free pharmacist guidance and dosage directions.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <Percent className="w-6 h-6 text-teal-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Best Market Rates</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Regular MRP discounts on essential medications.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section id="categories" className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-xs mb-1 block">Catalog Explorer</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Shop by Department</h2>
              <p className="text-muted-foreground text-sm mt-1">Browse Bangladesh’s most comprehensive medicine and health equipment catalog.</p>
            </div>
            <Link 
              href="/medicines" 
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
            >
              Browse All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Most Prescribed / Trending Bangladesh Medicines (MedEx inspired) */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-extrabold rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Most In Demand
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Top Prescribed Medicines & Essentials
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Verified genuine brands from Square, Beximco, Incepta & Healthcare Pharmaceuticals.
              </p>
            </div>
            <Link
              href="/medicines"
              className="group flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl text-xs font-bold transition-all shrink-0 shadow-md shadow-primary/20"
            >
              View Full Catalog <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingMedicines.map((medicine: any) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Special Chronic Care & Diabetic Corner (ePharma inspired) */}
      {chronicCare.length > 0 && (
        <section className="py-16 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-primary font-bold tracking-wider uppercase text-xs mb-1 block">Specialized Care</span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Diabetic & Gastric Care Management</h2>
                <p className="text-muted-foreground text-xs mt-1">Reliable blood sugar testing strips, machines, and PPI gastric relief.</p>
              </div>
              <Link 
                href="/medicines?category=Diabetic%20Care" 
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                Explore Diabetic Care &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {chronicCare.map((medicine: any) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Bangladesh Pharmaceutical Partners */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">
            Authorised Sourcing from Leading Bangladesh & International Manufacturers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {[
              { name: "Square Pharma", tag: "Largest in BD" },
              { name: "Beximco Pharma", tag: "US FDA Approved" },
              { name: "Incepta Pharma", tag: "Trusted Vaccines" },
              { name: "Healthcare Pharma", tag: "Specialized Care" },
              { name: "Roche Diagnostics", tag: "Global Leader" },
              { name: "Omron Healthcare", tag: "Medical Precision" }
            ].map((brand, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-secondary/30 border border-border/60 hover:border-primary/40 transition-colors">
                <h4 className="font-black text-sm text-foreground">{brand.name}</h4>
                <span className="text-[10px] text-primary font-semibold block mt-0.5">{brand.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How It Works */}
      <section className="py-20 bg-background border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold mb-3">How MediStore Works</h2>
            <p className="text-muted-foreground text-sm">Safe, transparent, and compliant healthcare delivery right to your room.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "1. Order or Upload Rx", desc: "Select OTC medicines or upload your prescription at checkout." },
              { icon: ShieldCheck, title: "2. Pharmacist Verification", desc: "Our licensed pharmacists cross-check batch, expiry, and dosage safety." },
              { icon: Clock, title: "3. Fast Doorstep Delivery", desc: "Our riders transport medicine with proper temperature protection to your address." }
            ].map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-xl mb-4 font-black">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Mail className="w-10 h-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Stay Updated on Healthcare Tips & Offers
          </h2>
          <p className="text-white/80 text-sm mb-8">
            Subscribe for free health guides, dosage alerts, and special member discount coupons on your monthly medicine refill.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-5 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white text-xs"
            />
            <button type="button" className="px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-white/95 transition-all text-xs">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
