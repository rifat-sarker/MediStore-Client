"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Package, CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react";
import { clientAuthFetch, API_BASE_URL } from "@/lib/clientAuthFetch";

const BASE = API_BASE_URL;

const STATUS_ICONS: Record<string, any> = {
  PENDING: Clock,
  VERIFYING: Clock,
  PROCESSING: Package,
  SHIPPED: Package,
  OUT_FOR_DELIVERY: Package,
  DELIVERED: CheckCircle,
  CANCELLED: XCircle,
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  VERIFYING: "bg-blue-100 text-blue-700 border-blue-200",
  PROCESSING: "bg-indigo-100 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700 border-orange-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  createdAt: string;
  items?: { quantity: number; medicine?: { name: string; imageUrl?: string; price: number } }[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchMyOrders = useCallback(async () => {
    try {
      const data = await clientAuthFetch(`${BASE}/orders/my-orders`);
      setOrders(data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancellingId(orderId);
    try {
      const data = await clientAuthFetch(`${BASE}/orders/${orderId}/cancel`, {
        method: "PATCH",
      });
      if (data.success) {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: "CANCELLED" } : o));
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch {
      alert("Error cancelling order");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">My Orders</h1>
          <p className="text-muted-foreground mt-2">Track and manage your past and current deliveries.</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-card rounded-2xl animate-pulse border border-border"></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <a href="/medicines" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              const Icon = STATUS_ICONS[order.status] || Package;
              const canCancel = order.status === "PENDING" || order.status === "VERIFYING";

              return (
                <div key={order.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-border/50 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          Order #{order.id.slice(0, 8)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${STATUS_COLORS[order.status] || "bg-secondary"}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {order.status.replace("_", " ")}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.paymentStatus === "PAID" ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-left md:text-right">
                        <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-2xl font-extrabold text-primary">৳ {order.totalAmount.toFixed(2)}</p>
                      </div>
                      {canCancel && (
                        <button
                          disabled={cancellingId === order.id}
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 py-2 text-xs font-semibold rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                        >
                          {cancellingId === order.id ? "Cancelling..." : "Cancel Order"}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-secondary/30 p-3 rounded-xl border border-border/50">
                        {item.medicine?.imageUrl ? (
                          <img src={item.medicine.imageUrl} alt={item.medicine.name} className="w-12 h-12 rounded-lg object-cover bg-white" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                            <Package className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-sm">{item.medicine?.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm">৳ {((item.medicine?.price || 0) * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
