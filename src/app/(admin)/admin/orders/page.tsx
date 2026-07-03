"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

const BASE = process.env.NEXT_PUBLIC_BASE_API!;

const STATUS_OPTIONS = ["PENDING", "VERIFYING", "PROCESSING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  VERIFYING: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-indigo-100 text-indigo-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress: string;
  createdAt: string;
  user?: { name: string; email: string };
  items?: { quantity: number; medicine?: { name: string } }[];
}

export default function OrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${BASE}/orders`, { credentials: "include" });
    const data = await res.json();
    setOrders(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    const res = await fetch(`${BASE}/orders/${orderId}/status`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Order status updated");
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } else {
      toast.error(data.message || "Update failed");
    }
    setUpdatingId(null);
  };

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} total orders</p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by order ID or customer..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Order ID</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Customer</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Payment</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">Loading orders...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">No orders found</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <code className="text-xs bg-secondary px-2 py-1 rounded-md">{order.id.slice(0, 8)}…</code>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium">{order.user?.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-primary">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.paymentStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-none outline-none cursor-pointer ${STATUS_COLORS[order.status] || "bg-secondary"}`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
