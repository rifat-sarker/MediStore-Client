import { ShieldCheck, Truck, Clock, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            About MediStore
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mt-4 tracking-tight">
            Healthcare Delivered Fast, Safely & Authentically
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            MediStore is your premier digital pharmacy platform connecting licensed pharmaceutical distributors with patients across the nation. We bring essential medicines directly to your door with certified quality checks.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: ShieldCheck, title: "100% Genuine", desc: "All medicines are sourced exclusively from licensed global manufacturers." },
            { icon: Truck, title: "Superfast Delivery", desc: "Express delivery straight to your doorstep within hours." },
            { icon: Clock, title: "24/7 Availability", desc: "Round-the-clock ordering and prescription verification." },
            { icon: Award, title: "Licensed Pharmacists", desc: "Every prescription is reviewed by registered medical practitioners." },
          ].map((item, idx) => (
            <div key={idx} className="bg-card border border-border p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary/40 border border-border rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Need help finding your medicine?</h2>
            <p className="text-muted-foreground mt-1">Browse our complete digital inventory or upload your prescription.</p>
          </div>
          <Link
            href="/medicines"
            className="bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
