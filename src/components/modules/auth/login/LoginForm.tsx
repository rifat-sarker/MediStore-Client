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
import { LogIn, HeartPulse } from "lucide-react";
import { loginUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";

const LoginForm = () => {
  const form = useForm({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const { setUser, setIsLoading } = useUser();

  const {
    formState: { isSubmitting },
  } = form;

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
                      className="rounded-xl h-11"
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
                      className="rounded-xl h-11"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full h-11 rounded-xl text-sm font-semibold gap-2 shadow-md shadow-primary/20"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Demo credentials */}
        <div className="mt-5 p-3 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Demo Credentials</p>
          <p><span className="font-medium">Admin:</span> admin@medistore.com / Admin@12345</p>
          <p><span className="font-medium">Customer:</span> customer1@example.com / password123</p>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
