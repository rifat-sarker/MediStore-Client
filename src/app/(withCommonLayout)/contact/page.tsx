"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! Our support team will respond shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl font-extrabold text-foreground mt-4 tracking-tight">Contact Customer Support</h1>
          <p className="text-muted-foreground mt-2">Have a question regarding orders, prescription verification, or partnerships? We are here 24/7.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">HQ Address</h3>
                <p className="text-muted-foreground text-sm mt-1">123 Health Ave, Medical District, NY 10001, United States</p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Phone Helpline</h3>
                <p className="text-muted-foreground text-sm mt-1">+1 (800) 555-0199 (Toll Free 24/7)</p>
              </div>
            </div>

            <div className="bg-card border border-border p-6 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Email Inquiries</h3>
                <p className="text-muted-foreground text-sm mt-1">support@medistore.health</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-xl font-bold mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Your Name</label>
                <input required placeholder="Dr. John Doe" className="w-full border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Message</label>
                <textarea required rows={4} placeholder="How can we help you today?" className="w-full border rounded-xl p-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
