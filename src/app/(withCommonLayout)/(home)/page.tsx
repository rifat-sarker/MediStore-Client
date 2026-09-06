import Hero from "@/components/modules/home/Hero";
import CategoryCard from "@/components/modules/home/CategoryCard";
import MedicineCard from "@/components/modules/home/MedicineCard";
import { fetchCategories, fetchMedicines } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, TrendingUp, Mail } from "lucide-react";

export const metadata = {
  title: "MediStore — Your Health, Delivered Fast",
  description: "Premium healthcare products and medicines delivered to your door within hours.",
};

const MOCK_CATEGORIES = [
  { id: "c1", name: "Vitamins & Supplements", description: "Daily health essentials", imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop" },
  { id: "c2", name: "Pain Relief", description: "Fast acting pain medication", imageUrl: "https://images.unsplash.com/photo-1550572017-edb9c46d3e8f?q=80&w=300&auto=format&fit=crop" },
  { id: "c3", name: "First Aid", description: "Bandages, antiseptics & more", imageUrl: "https://images.unsplash.com/photo-1585698436531-97b76e1045a5?q=80&w=300&auto=format&fit=crop" },
  { id: "c4", name: "Personal Care", description: "Skincare, haircare & hygiene", imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&auto=format&fit=crop" },
  { id: "c5", name: "Cold & Flu", description: "Cough syrups & cold medicine", imageUrl: "https://images.unsplash.com/photo-1583947581924-860bda6a5c83?q=80&w=300&auto=format&fit=crop" },
  { id: "c6", name: "Digestive Health", description: "Antacids & probiotics", imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=300&auto=format&fit=crop" },
];

const MOCK_MEDICINES = [
  { id: "m1", name: "Omega-3 Fish Oil 1000mg", manufacturer: "Nature's Bounty", price: 25.99, stock: 50, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=300&auto=format&fit=crop" },
  { id: "m2", name: "Paracetamol 500mg (100 pack)", manufacturer: "Tylenol", price: 8.50, stock: 120, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=300&auto=format&fit=crop" },
  { id: "m3", name: "Amoxicillin 250mg", manufacturer: "Pfizer", price: 15.00, stock: 30, requiredPrescription: true, imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=300&auto=format&fit=crop" },
  { id: "m4", name: "Vitamin C with Zinc", manufacturer: "Centrum", price: 18.99, stock: 200, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1550572017-edb9c46d3e8f?q=80&w=300&auto=format&fit=crop" },
  { id: "m5", name: "Ibuprofen 400mg Liquid Gels", manufacturer: "Advil", price: 12.99, stock: 85, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1583947581924-860bda6a5c83?q=80&w=300&auto=format&fit=crop" },
  { id: "m6", name: "Cetirizine Allergy Relief", manufacturer: "Zyrtec", price: 22.50, stock: 60, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1585698436531-97b76e1045a5?q=80&w=300&auto=format&fit=crop" },
  { id: "m7", name: "Protein Whey Isolate 2kg", manufacturer: "Optimum Nutrition", price: 65.00, stock: 15, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300&auto=format&fit=crop" },
  { id: "m8", name: "Melatonin 5mg Sleep Aid", manufacturer: "Nature Made", price: 10.99, stock: 150, requiredPrescription: false, imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=300&auto=format&fit=crop" },
];

export default async function HomePage() {
  let categories = await fetchCategories();
  let medicines = await fetchMedicines();

  // INJECT MOCK DATA IF DB IS EMPTY
  if (!categories || categories.length === 0) categories = MOCK_CATEGORIES;
  if (!medicines || medicines.length === 0) medicines = MOCK_MEDICINES;

  const featuredMedicines = medicines.slice(0, 8);

  return (
    <div className="flex flex-col bg-background">
      <Hero />

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Our Catalog</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground tracking-tight">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">Find what you need quickly from our well-organized, premium product categories.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section [NEW] */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How MediStore Works</h2>
            <p className="text-muted-foreground text-lg">We've simplified healthcare delivery so you can focus on feeling better.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "1. Upload Prescription", desc: "Easily upload a valid prescription for restricted medicines directly at checkout." },
              { icon: CheckCircle2, title: "2. Expert Verification", desc: "Our certified pharmacists review and approve your order within minutes." },
              { icon: Clock, title: "3. Lightning Delivery", desc: "Our dedicated riders bring your health essentials straight to your door, fast." }
            ].map((step, idx) => (
              <div key={idx} className="relative group p-8 rounded-[2rem] bg-background border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="absolute -top-6 left-8 bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg rotate-3 group-hover:-rotate-3 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mt-6 mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Top Rated</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Featured Essentials</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">Handpicked health products trusted and reviewed by thousands of our verified customers.</p>
            </div>
            <Link
              href="/medicines"
              className="group flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full font-semibold transition-all shrink-0"
            >
              View All Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMedicines.map((medicine: any) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands Marquee [NEW] */}
      <section className="py-16 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by global pharmaceutical brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders since we don't have brand SVGs */}
            <span className="text-2xl font-black font-serif">Pfizer</span>
            <span className="text-2xl font-extrabold tracking-tighter">Johnson & Johnson</span>
            <span className="text-2xl font-bold font-sans italic">GSK</span>
            <span className="text-2xl font-bold tracking-widest">SANOFI</span>
            <span className="text-2xl font-black">BAYER</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section [NEW] */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/95" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-xl border border-white/20 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center">
            <Mail className="w-12 h-12 text-white mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Get 15% Off Your First Order</h2>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive health tips, early access to sales, and premium discounts delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all"
                required
              />
              <button type="submit" className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-lg">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
