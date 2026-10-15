import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const roles = [
    { title: "Licensed Clinical Pharmacist", department: "Medical Operations", type: "Full-Time", location: "Dhaka, BD / Remote" },
    { title: "Delivery Fleet Rider", department: "Logistics", type: "Full-Time / Part-Time", location: "Multiple Zones" },
    { title: "Full-Stack Node / Next.js Engineer", department: "Engineering", type: "Full-Time", location: "Remote" },
    { title: "Customer Care Specialist", department: "Support", type: "Shift-based", location: "HQ Office" },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Join the MediStore Team</h1>
          <p className="text-muted-foreground mt-2">Help us build the most accessible, high-speed pharmaceutical network in the region.</p>
        </div>

        <div className="space-y-4 mb-12">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-card border border-border p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">{role.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md font-medium">{role.department}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-md font-medium">{role.type}</span>
                  <span className="text-xs text-muted-foreground self-center">{role.location}</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all flex items-center gap-1.5 shrink-0"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
