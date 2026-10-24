"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "./LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { LogIn, HeartPulse, User, ShieldCheck, Bike } from "lucide-react";
import { loginUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { useState } from "react";

const DEMO_CREDENTIALS = {
  CUSTOMER: { email: "customer1@example.com", password: "@Rifat1234" },
  ADMIN: { email: "admin@medistore.com", password: "@Rifat1234" },
  RIDER: { email: "rider1@example.com", password: "@Rifat1234" },
};

const LoginForm = () => {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const { setUser, setIsLoading } = useUser();
  const [activeTab, setActiveTab] = useState("CUSTOMER");

  const {
    formState: { isSubmitting },
  } = form;

  const handleTabClick = (role: "CUSTOMER" | "ADMIN" | "RIDER") => {
    setActiveTab(role);
    form.setValue("email", DEMO_CREDENTIALS[role].email);
    form.setValue("password", DEMO_CREDENTIALS[role].password);
    toast(`Switched to ${role} login`);
  };

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success("Welcome back! 🎉");
        // Decode role from the returned JWT
        let role = "CUSTOMER";
        try {
          const payload = JSON.parse(
            atob(res.data.accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
          );
          role = payload.role;
        } catch {}
        setIsLoading(true);
        if (role === "ADMIN") {
          router.push("/admin");
        } else if (role === "RIDER") {
          router.push("/rider-dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        toast.error(res?.message || "Invalid credentials.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <HeartPulse className="w-7 h-7 text-primary" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
            MediStore
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* Card */}
      <div className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-black/5">
        
        {/* Quick Login Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-2xl mb-8">
          <button
            onClick={() => handleTabClick("CUSTOMER")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'CUSTOMER' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <User className="w-3.5 h-3.5" /> Customer
          </button>
          <button
            onClick={() => handleTabClick("ADMIN")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'ADMIN' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </button>
          <button
            onClick={() => handleTabClick("RIDER")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'RIDER' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
          >
            <Bike className="w-3.5 h-3.5" /> Rider
          </button>
        </div>

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl h-11 bg-secondary/30"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl h-11 bg-secondary/30"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full h-12 rounded-xl text-sm font-bold gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Secure Sign In
                </>
              )}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
