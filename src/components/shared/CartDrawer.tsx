"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProduct, updateQuantity } from "@/redux/features/cartSlice";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = products.reduce(
    (total, product) => total + product.price * product.orderQuantity,
    0
  );
  const totalItems = products.reduce((total, p) => total + p.orderQuantity, 0);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-card border-l border-border h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-foreground">Your Cart</h2>
              <p className="text-xs text-muted-foreground">{totalItems} {totalItems === 1 ? 'item' : 'items'} added</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {products.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-secondary/60 flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">Your cart is empty</h3>
              <p className="text-xs max-w-xs mb-6">Looks like you haven&apos;t added any medicines or health products yet.</p>
              <Link 
                href="/medicines" 
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md hover:bg-primary/90 transition-transform active:scale-95"
              >
                Browse Medicines
              </Link>
            </div>
          ) : (
            products.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-3.5 bg-background border border-border/70 rounded-2xl shadow-sm hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl bg-secondary/30 overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&auto=format&fit=crop"} 
                    alt={item.name} 
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate text-foreground leading-snug">{item.name}</h4>
                  <p className="text-[11px] text-muted-foreground truncate">{item.manufacturer}</p>
                  <p className="text-sm font-black text-primary mt-1">৳ {item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button 
                    onClick={() => dispatch(removeProduct(item.id))}
                    className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-secondary/70 border border-border px-2 py-1 rounded-lg">
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, type: "decrement" }))}
                      className="text-muted-foreground hover:text-foreground text-xs p-0.5"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.orderQuantity}</span>
                    <button 
                      onClick={() => dispatch(updateQuantity({ id: item.id, type: "increment" }))}
                      className="text-muted-foreground hover:text-foreground text-xs p-0.5"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {products.length > 0 && (
          <div className="p-5 border-t border-border bg-secondary/20 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-black text-foreground">৳ {subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link 
                href="/cart"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl border border-border text-center text-xs font-bold hover:bg-secondary transition-colors"
              >
                View Full Cart
              </Link>
              <Link 
                href="/cart"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-transform active:scale-95"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
