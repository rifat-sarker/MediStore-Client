"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, X, CheckCircle } from "lucide-react";
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

interface Category { id: string; name: string; imageUrl?: string; }

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const data = await authFetch(`${BASE}/categories?limit=100`);
    setCategories(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => { setEditing(null); setForm({ name: "", imageUrl: "" }); setShowModal(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, imageUrl: c.imageUrl || "" }); setShowModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const url = editing ? `${BASE}/categories/${editing.id}` : `${BASE}/categories`;
    const method = editing ? "PATCH" : "POST";
    const res = await authFetch(url, { method, body: JSON.stringify(form) });
    if (res.success) {
      toast.success(editing ? "Category updated!" : "Category created!");
      setShowModal(false);
      fetchData();
    } else {
      toast.error(res.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? All associated medicines will be affected.")) return;
    const res = await authFetch(`${BASE}/categories/${id}`, { method: "DELETE" });
    if (res.success) { toast.success("Category deleted"); fetchData(); }
    else toast.error(res.message || "Delete failed");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">{categories.length} categories total</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(c => (
            <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground/30">{c.name.charAt(0)}</div>
                )}
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{c.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold">{editing ? "Edit Category" : "Add Category"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  required className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Image URL</label>
                <input
                  value={form.imageUrl}
                  onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                  type="url" className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {form.imageUrl && <img src={form.imageUrl} className="w-full h-32 object-cover rounded-xl" />}
              <button type="submit" disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting ? "Saving..." : <><CheckCircle className="w-4 h-4" />{editing ? "Save Changes" : "Create Category"}</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
