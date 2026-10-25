"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProduct, updateQuantity, clearCart } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, LogIn } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createOrder } from "@/services/Order";
import { getClientToken } from "@/lib/clientAuthFetch";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(getClientToken()));
  }, []);

  const subtotal = products.reduce(
    (total, product) => total + product.price * product.orderQuantity,
    0
  );
  
  const deliveryFee = 50; // Fixed delivery fee for now
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (products.length === 0) return;
    setIsCheckingOut(true);

    try {
      const items = products.map((p) => ({
        product: p.id,
        quantity: p.orderQuantity,
      }));

      const orderData = {
        products: items,
        shippingAddress: "Random User Address",
        paymentMethod: "CASH_ON_DELIVERY",
      };

      const result = await createOrder(orderData);

      if (result?.success) {
        toast.success("Order placed successfully! (Payment on hold)");
        dispatch(clearCart());
        // Redirect to shop or orders
        window.location.href = "/";
      } else {
        toast.error(result?.message || "Failed to create order");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-4 rounded-2xl bg-card shadow-sm"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-20 h-20 relative flex-shrink-0 bg-white rounded-xl border border-border/60 p-1 flex items-center justify-center">
                  <img
                    src={product.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80"}
                    alt={product.name}
                    className="object-contain rounded-md w-full h-full mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base text-foreground leading-snug truncate">{product.name}</h3>
                  <p className="text-muted-foreground text-xs truncate">{product.manufacturer}</p>
                  {product.requiredPrescription && (
                    <span className="inline-block mt-1 bg-orange-100 text-orange-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Rx Required
                    </span>
                  )}
                  <div className="mt-1 text-primary font-bold text-sm">
                    ৳ {product.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                <div className="flex items-center gap-2 bg-secondary/50 p-1.5 rounded-xl border border-border/60">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: product.id, type: "decrement" }))
                    }
                    className="p-1 hover:bg-white rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-7 text-center font-bold text-sm">
                    {product.orderQuantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: product.id, type: "increment" }))
                    }
                    className="p-1 hover:bg-white rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-extrabold text-base text-foreground sm:text-right min-w-[70px]">
                    ৳ {(product.price * product.orderQuantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeProduct(product.id))}
                    className="text-muted-foreground hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96 h-fit bg-card p-5 sm:p-6 rounded-2xl shadow-sm border border-border">
          <h2 className="text-xl font-bold mb-4 text-foreground">Checkout Details</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Shipping Address</label>
              <textarea 
                id="shippingAddress"
                className="w-full border rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                rows={3} 
                placeholder="Enter full delivery address"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Payment Method</label>
              <select 
                id="paymentMethod"
                className="w-full border rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
              >
                <option value="SSLCOMMERZ">Online Payment (SSLCommerz)</option>
                <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 mb-6 bg-white p-4 rounded-md border">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Subtotal</span>
              <span className="font-medium text-sm">৳ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Delivery Fee</span>
              <span className="font-medium text-sm">৳ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-lg text-primary">
                ৳ {total.toFixed(2)}
              </span>
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3.5 rounded-xl font-medium">
                Please <span className="font-bold">Sign In</span> to place an order with SSLCommerz payment or Cash on Delivery.
              </div>
              <Link href="/login" className="block w-full">
                <Button className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" /> Sign In to Checkout
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
              onClick={async () => {
                const address = (document.getElementById('shippingAddress') as HTMLTextAreaElement)?.value;
                const method = (document.getElementById('paymentMethod') as HTMLSelectElement)?.value || "SSLCOMMERZ";
                
                if (!address) {
                  toast.error("Please enter a shipping address");
                  return;
                }

                if (products.length === 0) return;
                setIsCheckingOut(true);
            
                try {
                  const items = products.map((p) => ({
                    product: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.orderQuantity,
                  }));
            
                  const orderData = {
                    products: items,
                    shippingAddress: address,
                    paymentMethod: method,
                  };
            
                  const result = await createOrder(orderData);
            
                  if (result?.success) {
                    dispatch(clearCart());
                    // If SSLCommerz payment URL returned, redirect directly to SSLCommerz Sandbox Gateway
                    if (result?.data?.paymentUrl) {
                      toast.success("Redirecting to SSLCommerz Secure Gateway...");
                      window.location.href = result.data.paymentUrl;
                      return;
                    }
                    if (method === "SSLCOMMERZ") {
                      toast.warning("Payment gateway initialization is processing. Redirecting to your orders.");
                    } else {
                      toast.success("Order placed successfully (Cash on Delivery)!");
                    }
                    window.location.href = "/orders";
                  } else {
                    toast.error(result?.message || "Failed to place order. Please make sure you are logged in.");
                  }
                } catch (error: any) {
                  toast.error(error?.message || "An error occurred during checkout.");
                } finally {
                  setIsCheckingOut(false);
                }
              }}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Connecting to Gateway..." : "Proceed to Secure Payment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
