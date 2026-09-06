"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenPromo");
    if (!hasSeenPopup) {
      // Small delay to make it feel natural
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenPromo", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 text-white rounded-full transition-colors backdrop-blur"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-primary to-teal-700 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_10%,_transparent_10%)] bg-[length:20px_20px]" />
          
          <div className="relative z-10 bg-white/20 p-4 rounded-full backdrop-blur-md mb-4 shadow-xl">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h2 className="relative z-10 text-3xl font-extrabold tracking-tight">Special Offer!</h2>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center bg-card">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Get <span className="text-primary font-extrabold text-2xl">20% OFF</span> your first order
          </h3>
          <p className="text-muted-foreground mb-6">
            Join MediStore today and use code <strong className="text-foreground bg-secondary px-2 py-1 rounded">WELCOME20</strong> at checkout to claim your discount on all medicines!
          </p>
          
          <Button 
            onClick={handleClose}
            className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
          >
            Claim My Discount Now
          </Button>
          
          <button 
            onClick={handleClose}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground font-medium underline underline-offset-4"
          >
            No thanks, I prefer paying full price
          </button>
        </div>
      </div>
    </div>
  );
}
