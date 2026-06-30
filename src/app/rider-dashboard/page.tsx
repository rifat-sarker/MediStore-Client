"use client";

import { useEffect, useState } from "react";
import { getRiderDeliveries, updateDeliveryStatus } from "@/services/Order";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function RiderDashboard() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeliveries = async () => {
    // NOTE: In a real app we would get the token from cookies or auth context
    // For demo purposes, assuming token is stored in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login as rider");
      setLoading(false);
      return;
    }

    const res = await getRiderDeliveries(token);
    if (res.success) {
      setDeliveries(res.data || []);
    } else {
      toast.error(res.message || "Failed to load deliveries");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string) => {
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

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Deliveries</h1>
      
      {deliveries.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
          No deliveries assigned to you yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white border rounded-lg shadow-sm p-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{delivery.id.slice(-6)}</h3>
                    <p className="text-sm text-gray-500">{new Date(delivery.createdAt).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    delivery.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    delivery.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium text-gray-900">{delivery.user?.name}</p>
                  <p className="text-gray-600 text-sm">📞 {delivery.user?.phone}</p>
                  <p className="text-gray-600 text-sm">📍 {delivery.shippingAddress}</p>
                </div>
                
                <div className="pt-2">
                  <p className="font-semibold text-gray-900">Total: ৳{delivery.totalAmount}</p>
                  <p className="text-sm text-gray-500">Payment: {delivery.paymentStatus} ({delivery.paymentMethod})</p>
                </div>
              </div>
              
              <div className="flex flex-col justify-end gap-2 md:w-48">
                {delivery.status !== 'DELIVERED' && (
                  <Button 
                    className="w-full"
                    onClick={() => handleUpdateStatus(delivery.id, 'DELIVERED')}
                  >
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
