export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl prose dark:prose-invert">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: October 2026</p>

        <section className="space-y-6 text-foreground text-sm leading-relaxed">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">By accessing or using the MediStore website and mobile services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Prescription Requirements</h2>
            <p className="text-muted-foreground">Certain medications require a valid prescription written by a licensed healthcare professional. MediStore reserves the right to cancel any order if a prescription cannot be verified or is deemed invalid.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Orders and Deliveries</h2>
            <p className="text-muted-foreground">Prices, product availability, and delivery estimates are subject to change. Cancellations are only permitted prior to courier dispatch.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Medical Disclaimer</h2>
            <p className="text-muted-foreground">Information provided on MediStore is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
