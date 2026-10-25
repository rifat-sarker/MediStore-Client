"use client";

import { ArrowRight, ShieldCheck, Zap, Truck, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              24/7 Delivery Available
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Your Health, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">Delivered Fast.</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Get premium healthcare products, expert-approved supplements, and essential medicines delivered to your door within hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/medicines"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                Shop Medicines
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#categories"
                className="flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold border-2 border-border hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300"
              >
                Browse Categories
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
              {[
                { icon: ShieldCheck, label: "100% Genuine" },
                { icon: Zap, label: "Fast Delivery" },
                { icon: Truck, label: "Live Tracking" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center lg:items-start gap-2">
                  <Icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000&auto=format&fit=crop"
                alt="Healthcare Professional"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute bottom-3 left-3 sm:-bottom-6 sm:-left-6 bg-white/95 dark:bg-card/95 backdrop-blur-md border border-border p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 shadow-xl z-20"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <HeartPulse className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Trusted by</p>
                <p className="text-sm font-bold text-foreground">10k+ Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
