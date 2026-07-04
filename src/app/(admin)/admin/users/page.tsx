"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, ShieldCheck, User } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_API!;

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

import { getAccessToken } from "@/services/AuthService/userUtils";

async function authFetch(url: string, options: RequestInit = {}) {
  const token = await getAccessToken();
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: { 
      "Content-Type": "application/json", 
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...(options.headers || {}) 
    },
  });
  return res.json();
}

export default function UsersManager() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPage: 1, total: 0 });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await authFetch(`${BASE}/users?limit=10&page=${page}`);
    setUsers(data.data || []);
    setMeta(data.meta || { totalPage: 1, total: 0 });
    setLoading(false);
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const ROLE_COLORS: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-700",
    CUSTOMER: "bg-blue-100 text-blue-700",
    RIDER: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">{users.length} registered users</p>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or role..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">User</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Phone</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Role</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-16 text-muted-foreground">Loading users...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-16 text-muted-foreground">No users found</td></tr>
            ) : filtered.map(u => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      {u.role === "ADMIN"
                        ? <ShieldCheck className="w-4 h-4 text-primary" />
                        : <User className="w-4 h-4 text-primary" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-muted-foreground">{u.phone || "—"}</td>
                <td className="px-5 py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[u.role] || "bg-secondary"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell text-muted-foreground text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && meta.totalPage > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-muted-foreground">Showing page {page} of {meta.totalPage}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl disabled:opacity-50 transition-colors text-sm font-medium">Previous</button>
            <button disabled={page >= meta.totalPage} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl disabled:opacity-50 transition-colors text-sm font-medium">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
