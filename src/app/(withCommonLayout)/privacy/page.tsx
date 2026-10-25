export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl prose dark:prose-invert">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-8">Last updated: October 2026</p>

        <section className="space-y-6 text-foreground text-sm leading-relaxed">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Data We Collect</h2>
            <p className="text-muted-foreground">We collect information you provide directly to us when creating an account, uploading a prescription, placing an order, or communicating with support (e.g. name, email, phone number, shipping address, prescription images).</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Medical & Prescription Privacy</h2>
            <p className="text-muted-foreground">Prescription uploads and medical history are encrypted and only accessible by licensed pharmacists and authorized medical personnel to verify dispensing safety.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Payment Security</h2>
            <p className="text-muted-foreground">Payment transactions are processed securely through certified gateway providers (SSLCommerz). MediStore does not store your complete credit card numbers or banking passwords.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Contact Information</h2>
            <p className="text-muted-foreground">If you have any questions about this privacy statement, please contact us at <a href="mailto:rifatswd@gmail.com" className="text-primary hover:underline">rifatswd@gmail.com</a>.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
