"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Link from "next/link";
import { registerUser, verifyOtpUser, resendOtpUser, googleAuthUser } from "@/services/AuthService";
import { Mail, CheckCircle, ArrowLeft, RefreshCw, LockKeyholeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registrationSchema } from "./registerValidation";

const RegisterForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<"REGISTER" | "OTP">("REGISTER");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message || "OTP sent to your email!");
        setRegisteredEmail(data.email);
        setStep("OTP");
      } else {
        toast.error(res?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Registration failed. Please check network connection.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setVerifying(true);
    try {
      const res = await verifyOtpUser({ email: registeredEmail, otp });
      if (res?.success) {
        toast.success("Account verified successfully! 🎉 Please sign in.");
        router.push("/login");
      } else {
        toast.error(res?.message || "Invalid OTP");
      }
    } catch {
      toast.error("OTP verification failed.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    try {
      const res = await resendOtpUser(registeredEmail);
      if (res?.success) {
        toast.success("New OTP sent to your email!");
      } else {
        toast.error(res?.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Network error resending OTP");
    } finally {
      setResending(false);
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
                  toast.success(`Welcome to MediStore, ${name || ""}! 🎉`);
                  router.push("/");
                  router.refresh();
                } else {
                  toast.error(res?.message || "Google registration failed on server.");
                }
              } catch (err: any) {
                toast.error("Failed to parse Google response: " + err.message);
              } finally {
                setGoogleLoading(false);
              }
            }
          },
        });

        const btnContainer = document.getElementById("google-register-btn-container");
        if (btnContainer) {
          google.accounts.id.renderButton(btnContainer, {
            theme: "outline",
            size: "large",
            width: btnContainer.offsetWidth || 350,
            text: "signup_with",
            shape: "pill",
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
  }, [router, step]);

  if (step === "OTP") {
    return (
      <div className="border border-border/80 bg-card shadow-2xl rounded-3xl max-w-md w-full p-8">
        <button
          onClick={() => setStep("REGISTER")}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Register
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Verify Your Email</h2>
          <p className="text-xs text-muted-foreground mt-1">
            We sent a 6-digit verification code to:
          </p>
          <p className="text-sm font-bold text-primary mt-0.5">{registeredEmail}</p>
        </div>

        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block mb-2">
              Enter 6-Digit OTP
            </label>
            <Input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="text-center tracking-[0.5em] text-2xl font-black h-14 rounded-2xl bg-secondary/30 focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={verifying || otp.length !== 6}
            className="w-full h-12 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            {verifying ? "Verifying..." : "Verify & Activate Account"}
          </Button>

          <div className="flex items-center justify-between pt-3 text-xs">
            <span className="text-muted-foreground">Didn&apos;t receive code?</span>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
              className="font-bold text-primary hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${resending ? 'animate-spin' : ''}`} />
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="border border-border/80 bg-card shadow-2xl rounded-3xl max-w-md w-full p-8 my-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground">Create Account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Join MediStore for instant medicine delivery & healthcare
        </p>
      </div>

      {/* Official Google Register Container */}
      <div className="flex flex-col items-center justify-center mb-5 w-full">
        <div
          id="google-register-btn-container"
          className="w-full flex justify-center min-h-[44px]"
        />
        {googleLoading && (
          <p className="text-xs text-muted-foreground mt-1">Verifying Google account...</p>
        )}
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">or with Email</span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="01700000000" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold">City / Address</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Dhaka, Bangladesh" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" className="rounded-xl h-11 bg-secondary/30" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={Boolean(isSubmitting || (password && password !== passwordConfirm))}
            className="w-full h-12 mt-4 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
            type="submit"
          >
            {isSubmitting ? "Sending OTP..." : "Register with Email OTP"}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
