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
import { loginUser, googleAuthUser, forgotPasswordUser, resetPasswordUser } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";
import { KeyRound, ArrowLeft, Mail, RefreshCw } from "lucide-react";

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
  const [googleLoading, setGoogleLoading] = useState(false);

  // Forgot password states
  const [forgotModal, setForgotModal] = useState<"CLOSED" | "EMAIL" | "RESET">("CLOSED");
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

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
        const errorDetail = res?.errorSources?.length
          ? res.errorSources.map((err: any) => err.message).join(", ")
          : res?.message;
        toast.error(errorDetail || "Invalid credentials.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "109689675909-d32kko3680egvhu49dll33me77c70iir.apps.googleusercontent.com";

    const initGoogle = () => {
      if (typeof window !== "undefined" && (window as any).google?.accounts?.id) {
        const google = (window as any).google;
        google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            if (response.credential) {
              setGoogleLoading(true);
              try {
                const base64Url = response.credential.split(".")[1];
                const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                const jsonPayload = decodeURIComponent(
                  atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
                );
                const googlePayload = JSON.parse(jsonPayload);
                const { name, email } = googlePayload;

                const res = await googleAuthUser({ name: name || "Google User", email });
                if (res?.success) {
                  toast.success(`Welcome back ${name || ""}! 🎉`);
                  setIsLoading(true);
                  router.push("/");
                  router.refresh();
                } else {
                  toast.error(res?.message || "Google sign-in failed on server.");
                }
              } catch (err: any) {
                toast.error("Failed to authenticate Google user");
              } finally {
                setGoogleLoading(false);
              }
            }
          },
        });

        // Render official Google button
        const btnContainer = document.getElementById("google-signin-btn-container");
        if (btnContainer) {
          google.accounts.id.renderButton(btnContainer, {
            theme: "outline",
            size: "large",
            width: btnContainer.offsetWidth || 350,
            text: "signin_with",
            shape: "pill",
            locale: "en",
          });
        }
      }
    };

    const timer = setInterval(() => {
      if ((window as any).google?.accounts?.id) {
        initGoogle();
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [router]);

  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("Please enter your account email");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await forgotPasswordUser(resetEmail);
      if (res?.success) {
        toast.success(res.message || "Reset OTP sent to your email!");
        setForgotModal("RESET");
      } else {
        toast.error(res?.message || "Failed to send reset OTP");
      }
    } catch {
      toast.error("Error sending reset OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetOtp || resetOtp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setForgotLoading(true);
    try {
      const res = await resetPasswordUser({
        email: resetEmail,
        otp: resetOtp,
        newPassword,
      });
      if (res?.success) {
        toast.success("Password reset successfully! Please log in.");
        setForgotModal("CLOSED");
        form.setValue("email", resetEmail);
        form.setValue("password", newPassword);
      } else {
        toast.error(res?.message || "Password reset failed");
      }
    } catch {
      toast.error("Error resetting password");
    } finally {
      setForgotLoading(false);
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
        <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-2xl mb-6">
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

        {/* Google Sign-in Button */}
        <div className="flex flex-col items-center justify-center mb-5 w-full">
          <div
            id="google-signin-btn-container"
            className="w-full flex justify-center min-h-[44px]"
          />
          {googleLoading && (
            <p className="text-xs text-muted-foreground mt-1">Verifying Google account...</p>
          )}
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-border/60" />
          <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">or with Credentials</span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
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
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-xs font-semibold">Password</FormLabel>
                    <button
                      type="button"
                      onClick={() => setForgotModal("EMAIL")}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
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

      {/* Forgot Password Flow Modal */}
      {forgotModal !== "CLOSED" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {forgotModal === "EMAIL" ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Forgot Password</h3>
                  </div>
                  <button
                    onClick={() => setForgotModal("CLOSED")}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Enter your registered email address and we will send you a 6-digit OTP code to reset your password.
                </p>
                <form onSubmit={handleSendResetOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5 text-foreground">Email Address</label>
                    <Input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-xl h-11 bg-secondary/30"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={forgotLoading || !resetEmail}
                    className="w-full h-11 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90"
                  >
                    {forgotLoading ? "Sending OTP..." : "Send Reset OTP"}
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setForgotModal("EMAIL")}
                      className="text-muted-foreground hover:text-foreground mr-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <h3 className="text-lg font-bold text-foreground">Reset Password</h3>
                  </div>
                  <button
                    onClick={() => setForgotModal("CLOSED")}
                    className="text-muted-foreground hover:text-foreground text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Enter the 6-digit OTP code sent to <strong className="text-primary">{resetEmail}</strong> and your new password.
                </p>
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5 text-foreground">6-Digit OTP</label>
                    <Input
                      type="text"
                      maxLength={6}
                      value={resetOtp}
                      onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className="rounded-xl h-11 bg-secondary/30 tracking-widest text-center font-bold text-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-1.5 text-foreground">New Password</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      className="rounded-xl h-11 bg-secondary/30"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={forgotLoading || resetOtp.length !== 6 || newPassword.length < 8}
                    className="w-full h-11 rounded-xl text-sm font-bold bg-primary hover:bg-primary/90"
                  >
                    {forgotLoading ? "Resetting..." : "Confirm New Password"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
