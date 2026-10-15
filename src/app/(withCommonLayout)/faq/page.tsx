import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How do I order prescription medicines?",
      a: "Select the prescription-required medication, add it to your cart, and at checkout upload a clear photo or PDF of your valid doctor's prescription. Our certified pharmacists will verify it before dispatching.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support Online Payment via SSLCommerz (Visa, Mastercard, bKash, Nagad, Rocket) and Cash on Delivery (COD) for supported locations.",
    },
    {
      q: "How fast is delivery?",
      a: "Standard urban deliveries arrive within 2-4 hours. Express priority orders are delivered within 60-90 minutes depending on rider proximity.",
    },
    {
      q: "Can I cancel my order?",
      a: "Yes, you can cancel any order directly from your 'My Orders' page while the status is still PENDING or VERIFYING. Once shipped, orders cannot be cancelled.",
    },
    {
      q: "Are your medicines genuine?",
      a: "All pharmaceuticals are sourced strictly from accredited manufacturers with temperature-controlled cold chain logistics for sensitive medicines.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-2">Answers to the most common questions about orders, prescriptions, and deliveries.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-foreground mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
