import Hero from "@/components/modules/home/Hero";
import CategoryCard from "@/components/modules/home/CategoryCard";
import MedicineCard from "@/components/modules/home/MedicineCard";
import { fetchCategories, fetchMedicines } from "@/lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "MediStore — Your Health, Delivered Fast",
  description: "Premium healthcare products and medicines delivered to your door within hours.",
};

export default async function HomePage() {
  const categories = await fetchCategories();
  const medicines = await fetchMedicines();
  const featuredMedicines = medicines.slice(0, 8);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Find what you need quickly from our well-organized product categories.</p>
          </div>

          {categories.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No categories found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category: any) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Essentials</h2>
              <p className="text-muted-foreground">Handpicked health products trusted by our customers.</p>
            </div>
            <Link
              href="/medicines"
              className="flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all shrink-0"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredMedicines.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No medicines found. Check that the backend is running.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMedicines.map((medicine: any) => (
                <MedicineCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-primary to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of customers who trust MediStore for fast, reliable healthcare delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-colors shadow-lg"
            >
              Create Account
            </Link>
            <Link
              href="/medicines"
              className="border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Browse Medicines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
