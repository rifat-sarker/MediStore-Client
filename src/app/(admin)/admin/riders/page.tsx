"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const BASE = process.env.NEXT_PUBLIC_BASE_API!;

interface Rider {
  id: string;
  vehicleInfo?: string;
  licenseNo?: string;
  currentStatus: string;
  isVerified: boolean;
  user?: { name: string; email: string; phone?: string };
}

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-green-100 text-green-700",
  BUSY: "bg-orange-100 text-orange-700",
  OFFLINE: "bg-gray-100 text-gray-700",
};

export default function RidersManager() {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`${BASE}/riders`, { credentials: "include" });
    const data = await res.json();
    setRiders(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleVerify = async (id: string) => {
    const res = await fetch(`${BASE}/riders/${id}/verify`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Rider verified!");
      fetchData();
    } else {
      toast.error(data.message || "Verification failed");
    }
  };

  const filtered = riders.filter(r =>
    r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.licenseNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Riders</h1>
        <p className="text-muted-foreground text-sm mt-1">{riders.length} registered riders</p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or license..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Rider</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Vehicle</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">License</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Status</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Verified</th>
              <th className="text-right px-5 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">Loading riders...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">No riders found</td></tr>
            ) : filtered.map(rider => (
              <tr key={rider.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="font-medium text-foreground">{rider.user?.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">{rider.user?.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-muted-foreground">{rider.vehicleInfo || "—"}</td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <code className="text-xs bg-secondary px-2 py-1 rounded-md">{rider.licenseNo || "N/A"}</code>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[rider.currentStatus] || "bg-secondary"}`}>
                    {rider.currentStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  {rider.isVerified
                    ? <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-4 h-4" /> Verified</span>
                    : <span className="flex items-center gap-1 text-xs text-muted-foreground"><XCircle className="w-4 h-4" /> Pending</span>
                  }
                </td>
                <td className="px-5 py-3.5 text-right">
                  {!rider.isVerified && (
                    <button
                      onClick={() => handleVerify(rider.id)}
                      className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
