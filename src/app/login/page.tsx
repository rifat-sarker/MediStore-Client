import LoginForm from "@/components/modules/auth/login/LoginForm";
import { HeartPulse } from "lucide-react";

export const metadata = {
  title: "Login — MediStore",
  description: "Sign in to your MediStore account.",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-teal-600 to-emerald-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="relative z-10 text-white text-center max-w-md">
          <div className="inline-flex items-center gap-3 bg-white/20 px-5 py-3 rounded-2xl mb-8">
            <HeartPulse className="w-7 h-7" />
            <span className="text-xl font-bold">MediStore</span>
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Your Health,<br />Our Priority
          </h2>
          <p className="text-white/80 text-lg">
            Access thousands of medicines, track orders, and manage subscriptions — all in one place.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10 text-center">
            {[["10k+", "Customers"], ["500+", "Medicines"], ["24/7", "Support"]].map(([val, label]) => (
              <div key={label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">{val}</p>
                <p className="text-sm text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
