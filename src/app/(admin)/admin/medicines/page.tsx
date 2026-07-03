"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const BASE = process.env.NEXT_PUBLIC_BASE_API!;

async function authFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  return res.json();
}

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  requiredPrescription: boolean;
  manufacturer: string;
  imageUrl?: string;
  categoryId: string;
  category?: { name: string };
}

interface Category { id: string; name: string; }

const EMPTY_FORM = {
  name: "", description: "", price: "", stock: "",
  requiredPrescription: false, manufacturer: "", imageUrl: "", categoryId: "",
  expiryDate: "",
};

export default function MedicinesManager() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Medicine | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [medsData, catsData] = await Promise.all([
      authFetch(`${BASE}/medicines?limit=100`),
      authFetch(`${BASE}/categories?limit=100`),
    ]);
    setMedicines(medsData.data || []);
    setCategories(catsData.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowModal(true); };
  const openEdit = (m: Medicine) => {
    setEditing(m);
    setForm({
      name: m.name, description: m.description, price: String(m.price),
      stock: String(m.stock), requiredPrescription: m.requiredPrescription,
      manufacturer: m.manufacturer, imageUrl: m.imageUrl || "",
      categoryId: m.categoryId, expiryDate: "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      expiryDate: form.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    const url = editing ? `${BASE}/medicines/${editing.id}` : `${BASE}/medicines`;
    const method = editing ? "PATCH" : "POST";
    const res = await authFetch(url, { method, body: JSON.stringify(payload) });
    if (res.success) {
      toast.success(editing ? "Medicine updated!" : "Medicine created!");
      setShowModal(false);
      fetchData();
    } else {
      toast.error(res.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this medicine?")) return;
    setDeleting(id);
    const res = await authFetch(`${BASE}/medicines/${id}`, { method: "DELETE" });
    if (res.success) {
      toast.success("Medicine deleted");
      fetchData();
    } else {
      toast.error(res.message || "Delete failed");
    }
    setDeleting(null);
  };

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Medicines</h1>
          <p className="text-muted-foreground text-sm mt-1">{medicines.length} products in catalog</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search medicines..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Medicine</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground">Price</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Stock</th>
              <th className="text-left px-5 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Rx</th>
              <th className="text-right px-5 py-3 font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-16 text-muted-foreground">No medicines found</td></tr>
            ) : filtered.map(m => (
              <tr key={m.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {m.imageUrl && <img src={m.imageUrl} className="w-9 h-9 rounded-lg object-cover border border-border" />}
                    <div>
                      <p className="font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.manufacturer}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-muted-foreground">{m.category?.name || "—"}</td>
                <td className="px-5 py-3.5 font-semibold text-primary">${m.price.toFixed(2)}</td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${m.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {m.stock} units
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  {m.requiredPrescription ? <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Required</span> : <span className="text-muted-foreground text-xs">No</span>}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(m)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(m.id)} disabled={deleting === m.id} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold">{editing ? "Edit Medicine" : "Add Medicine"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {[
                { label: "Name", key: "name", type: "text" },
                { label: "Manufacturer", key: "manufacturer", type: "text" },
                { label: "Price ($)", key: "price", type: "number" },
                { label: "Stock", key: "stock", type: "number" },
                { label: "Image URL", key: "imageUrl", type: "url" },
                { label: "Expiry Date", key: "expiryDate", type: "date" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-sm font-medium text-foreground block mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    required={f.key !== "imageUrl" && f.key !== "expiryDate"}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Category</label>
                <select
                  value={form.categoryId}
                  onChange={e => setForm(prev => ({ ...prev, categoryId: e.target.value }))}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  required rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.requiredPrescription}
                  onChange={e => setForm(prev => ({ ...prev, requiredPrescription: e.target.checked }))}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm font-medium">Requires Prescription</span>
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? "Saving..." : <><CheckCircle className="w-4 h-4" />{editing ? "Save Changes" : "Create Medicine"}</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
