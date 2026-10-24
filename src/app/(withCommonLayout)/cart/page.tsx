"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeProduct, updateQuantity, clearCart } from "@/redux/features/cartSlice";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { createOrder } from "@/services/Order";

const CartPage = () => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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
              className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow-sm"
            >
              <div className="w-24 h-24 relative flex-shrink-0">
                <img
                  src={product.imageUrl || ""}
                  alt={product.name}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.manufacturer}</p>
                {product.requiredPrescription && (
                  <span className="inline-block mt-1 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">
                    Prescription Required
                  </span>
                )}
                <div className="mt-2 text-primary font-medium">
                  ৳ {product.price}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-md">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: product.id, type: "decrement" }))
                  }
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">
                  {product.orderQuantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: product.id, type: "increment" }))
                  }
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right ml-4">
                <p className="font-bold text-lg mb-2">
                  ৳ {(product.price * product.orderQuantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeProduct(product.id))}
                  className="text-red-500 hover:text-red-700 flex items-center justify-end w-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-96 h-fit bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Checkout Details</h2>
          
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
                  toast.success("Order placed successfully!");
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
        </div>
      </div>
    </div>
  );
};

export default CartPage;
