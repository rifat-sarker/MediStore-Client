import Link from "next/link";
import { HeartPulse, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-xl">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">
                MediStore
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner in healthcare. Delivering essential medicines and health products directly to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/medicines?category=pain-relief" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pain Relief</Link></li>
              <li><Link href="/medicines?category=vitamins" className="text-muted-foreground hover:text-primary transition-colors text-sm">Vitamins</Link></li>
              <li><Link href="/medicines?category=first-aid" className="text-muted-foreground hover:text-primary transition-colors text-sm">First Aid</Link></li>
              <li><Link href="/medicines" className="text-muted-foreground hover:text-primary transition-colors text-sm">View All</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">Careers</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Contact Info</h3>
            <ul className="space-y-4">
              <li className="text-sm text-muted-foreground">
                <strong className="block text-foreground">Address:</strong>
                123 Health Ave, Medical District, NY 10001
              </li>
              <li className="text-sm text-muted-foreground">
                <strong className="block text-foreground">Phone:</strong>
                +1 (800) 123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                <strong className="block text-foreground">Email:</strong>
                support@medistore.com
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MediStore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
