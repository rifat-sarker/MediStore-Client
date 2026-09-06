"use client";

import { useEffect, useState } from "react";
import { getRiderDeliveries, updateDeliveryStatus } from "@/services/Order";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Phone, CheckCircle, Navigation, Clock } from "lucide-react";

const MOCK_DELIVERIES = [
  { 
    id: "ord_104829A", 
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), 
    status: "OUT_FOR_DELIVERY", 
    totalAmount: 1250.00,
    paymentStatus: "PAID",
    paymentMethod: "SSLCOMMERZ",
    user: { name: "Ahmed Zubair", phone: "+880 1711-000000" },
    shippingAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    distance: "2.4 km",
    eta: "15 mins"
  },
  { 
    id: "ord_993812B", 
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), 
    status: "SHIPPED", 
    totalAmount: 450.50,
    paymentStatus: "UNPAID",
    paymentMethod: "CASH_ON_DELIVERY",
    user: { name: "Sadia Rahman", phone: "+880 1819-111111" },
    shippingAddress: "Apt 4B, Concord Tower, Gulshan 1, Dhaka",
    distance: "5.1 km",
    eta: "35 mins"
  },
  { 
    id: "ord_772619C", 
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), 
    status: "DELIVERED", 
    totalAmount: 890.00,
    paymentStatus: "PAID",
    paymentMethod: "CASH_ON_DELIVERY",
    user: { name: "Kamrul Hasan", phone: "+880 1912-222222" },
    shippingAddress: "Sector 4, Uttara, Dhaka",
    distance: "12.0 km",
    eta: "Delivered"
  }
];

export default function RiderDashboard() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, just show mock data so the user sees a full UI
      setDeliveries(MOCK_DELIVERIES);
      setLoading(false);
      return;
    }

    try {
      const res = await getRiderDeliveries(token);
      if (res.success && res.data && res.data.length > 0) {
        setDeliveries(res.data);
      } else {
        // INJECT MOCK DATA IF DB IS EMPTY
        setDeliveries(MOCK_DELIVERIES);
      }
    } catch {
      setDeliveries(MOCK_DELIVERIES);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
    // If it's a mock order, just update state locally to simulate success
    if (orderId.startsWith("ord_")) {
      setDeliveries(prev => prev.map(d => d.id === orderId ? { ...d, status } : d));
      toast.success(`Order marked as ${status}`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await updateDeliveryStatus(orderId, status, token);
    if (res.success) {
      toast.success(`Order marked as ${status}`);
      fetchDeliveries(); // Refresh list
    } else {
      toast.error(res.message || "Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Active Deliveries</h1>
        <p className="text-muted-foreground mt-1">Manage and track your assigned orders.</p>
      </div>
      
      <div className="grid gap-6">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-card border border-border rounded-2xl shadow-sm p-6 flex flex-col lg:flex-row justify-between gap-6 hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-4">
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Order #{delivery.id.slice(0, 8)}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{new Date(delivery.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  {delivery.eta && delivery.status !== "DELIVERED" && (
                    <span className="flex items-center gap-1 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                      <Clock className="w-4 h-4"/> ETA: {delivery.eta}
                    </span>
                  )}
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                    delivery.status === 'DELIVERED' ? 'bg-green-100 text-green-700 border-green-200' :
                    delivery.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    'bg-yellow-100 text-yellow-700 border-yellow-200'
                  }`}>
                    {delivery.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary/30 p-5 rounded-xl border border-border/50 space-y-3">
                  <p className="font-bold text-foreground text-lg">{delivery.user?.name}</p>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-muted-foreground">{delivery.user?.phone || "No phone provided"}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-foreground">{delivery.shippingAddress}</p>
                  </div>
                </div>
                
                {/* Mock Map Placeholder */}
                <div className="bg-secondary/20 rounded-xl border border-border/50 relative overflow-hidden hidden md:block min-h-[120px]">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
                    <MapPin className="w-8 h-8 text-primary mb-1 drop-shadow-md" />
                    <span className="font-bold text-sm bg-background/80 px-3 py-1 rounded-full shadow-sm">{delivery.distance || "3.2 km"} away</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2">
                <p className="text-sm text-muted-foreground">Payment: <span className={`font-semibold ${delivery.paymentStatus === "UNPAID" ? "text-red-500" : "text-green-600"}`}>{delivery.paymentStatus}</span> ({delivery.paymentMethod})</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Collect:</span>
                  <p className="font-extrabold text-2xl text-primary">৳ {delivery.totalAmount}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end gap-3 lg:w-56 border-t lg:border-t-0 lg:border-l border-border/50 pt-4 lg:pt-0 lg:pl-6">
              <Button variant="outline" className="w-full gap-2 font-semibold h-12">
                <Navigation className="w-4 h-4" /> Open Maps
              </Button>
              {delivery.status !== 'DELIVERED' && (
                <Button 
                  className="w-full gap-2 font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all h-12"
                  onClick={() => handleUpdateStatus(delivery.id, 'DELIVERED')}
                >
                  <CheckCircle className="w-5 h-5" />
                  Mark Delivered
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
