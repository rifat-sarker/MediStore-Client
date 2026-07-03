import { API_BASE_URL } from "@/lib/api";
import { getCurrentUser } from "@/services/AuthService/userUtils";
import { cookies } from "next/headers";
import { Package, Pill, Tag, ShoppingCart, Users, TrendingUp } from "lucide-react";

async function getStats(token: string) {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const [medicines, categories, orders, users] = await Promise.all([
      fetch(`${API_BASE_URL}/medicines?limit=1`, { headers, cache: "no-store" }).then(r => r.json()),
      fetch(`${API_BASE_URL}/categories?limit=1`, { headers, cache: "no-store" }).then(r => r.json()),
      fetch(`${API_BASE_URL}/orders`, { headers, cache: "no-store" }).then(r => r.json()),
      fetch(`${API_BASE_URL}/users`, { headers, cache: "no-store" }).then(r => r.json()),
    ]);
    return {
      medicines: medicines?.meta?.total ?? 0,
      categories: categories?.meta?.total ?? 0,
      orders: orders?.meta?.total ?? orders?.data?.length ?? 0,
      users: users?.meta?.total ?? users?.data?.length ?? 0,
    };
  } catch {
    return { medicines: 0, categories: 0, orders: 0, users: 0 };
  }
}

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || "";
  const stats = await getStats(token);

  const cards = [
    { label: "Total Medicines", value: stats.medicines, icon: Pill, color: "from-primary/20 to-teal-500/10", iconColor: "text-primary" },
    { label: "Categories", value: stats.categories, icon: Tag, color: "from-blue-500/20 to-blue-400/10", iconColor: "text-blue-500" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "from-purple-500/20 to-purple-400/10", iconColor: "text-purple-500" },
    { label: "Registered Users", value: stats.users, icon: Users, color: "from-orange-500/20 to-orange-400/10", iconColor: "text-orange-500" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Admin. Here is what is happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => (
          <div key={card.label} className={`relative overflow-hidden bg-gradient-to-br ${card.color} rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-shadow`}>
            <div className={`absolute top-4 right-4 p-3 rounded-xl bg-white/60 dark:bg-black/20`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
            <p className="text-4xl font-extrabold text-foreground mt-2">{card.value}</p>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/admin/medicines", label: "Manage Medicines", icon: Pill },
            { href: "/admin/categories", label: "Manage Categories", icon: Tag },
            { href: "/admin/orders", label: "View Orders", icon: Package },
            { href: "/admin/users", label: "Manage Users", icon: Users },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group text-center"
            >
              <action.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
