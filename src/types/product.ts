export interface IProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  manufacturer: string;
  imageUrl?: string;
  categoryId?: string;
  requiredPrescription?: boolean;
  expiryDate?: string | Date;
  category?: {
    id: string;
    name: string;
  };
  genericName?: string;
  strength?: string;
  dosageForm?: string;
  packSize?: string;
}

export const MEDEX_BANGLADESH_PRODUCTS: IProduct[] = [
  {
    id: "medex-1",
    name: "Napa Extra Tablet",
    genericName: "Paracetamol + Caffeine (500mg + 65mg)",
    dosageForm: "Tablet",
    strength: "500 mg + 65 mg",
    packSize: "10 x 10's Pack",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    price: 3.50,
    stock: 500,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5e4b7b34b?q=80&w=600&auto=format&fit=crop",
    description: "Rapid relief for severe headache, toothache, backache, migraine, dysmenorrhea and feverishness.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-2",
    name: "Ace Plus Tablet",
    genericName: "Paracetamol + Caffeine (500mg + 65mg)",
    dosageForm: "Tablet",
    strength: "500 mg + 65 mg",
    packSize: "20 x 10's Pack",
    manufacturer: "Square Pharmaceuticals PLC",
    price: 3.50,
    stock: 650,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    description: "Indicated for tension headache, post-vaccination fever, neuralgia and musculoskeletal pain.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-3",
    name: "Seclo 20 Capsule",
    genericName: "Omeprazole",
    dosageForm: "Capsule",
    strength: "20 mg",
    packSize: "10 x 10's Alu-Alu",
    manufacturer: "Square Pharmaceuticals PLC",
    price: 7.00,
    stock: 450,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop",
    description: "Treatment of gastroesophageal reflux disease (GERD), duodenal & gastric ulcers, and Zollinger-Ellison syndrome.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-4",
    name: "Pantonix 20 Tablet",
    genericName: "Pantoprazole Sodium Sesquihydrate",
    dosageForm: "Tablet",
    strength: "20 mg",
    packSize: "10 x 10's Alu-Alu",
    manufacturer: "Incepta Pharmaceuticals Ltd.",
    price: 8.00,
    stock: 380,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop",
    description: "Relieves heartburn, acid indigestion and heals erosive esophagitis with sustained acid suppression.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-5",
    name: "Sergel 20 Capsule",
    genericName: "Esomeprazole Magnesium Trihydrate",
    dosageForm: "Capsule",
    strength: "20 mg",
    packSize: "10 x 10's Pack",
    manufacturer: "Healthcare Pharmaceuticals Ltd.",
    price: 8.00,
    stock: 290,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edb9894e7724?q=80&w=600&auto=format&fit=crop",
    description: "Proton pump inhibitor formulated for rapid recovery from acid-related dyspepsia and gastric lesions.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-6",
    name: "Bextram Gold Multivitamin",
    genericName: "32 Multivitamins & Multiminerals with Lutein",
    dosageForm: "Film Coated Tablet",
    strength: "Complete A-Z Formula",
    packSize: "30's Bottle",
    manufacturer: "Beximco Pharmaceuticals Ltd.",
    price: 15.00,
    stock: 220,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1550572017-edb9c46d3e8f?q=80&w=600&auto=format&fit=crop",
    description: "Comprehensive adult daily nutritional boost providing vital immunity, stamina, brain and bone health.",
    category: { id: "c2", name: "Vital Wellness" }
  },
  {
    id: "medex-7",
    name: "D-Rise 20,000 IU Capsule",
    genericName: "Cholecalciferol (Vitamin D3)",
    dosageForm: "Soft Gelatin Capsule",
    strength: "20,000 IU",
    packSize: "1 x 10's Blister",
    manufacturer: "Square Pharmaceuticals PLC",
    price: 45.00,
    stock: 140,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    description: "High potency Vitamin D3 replenishment for osteomalacia, osteoporosis prevention and severe Vitamin D deficiency.",
    category: { id: "c2", name: "Vital Wellness" }
  },
  {
    id: "medex-8",
    name: "Accu-Chek Instant Glucometer Kit",
    genericName: "Blood Glucose Monitoring System",
    dosageForm: "Medical Device",
    strength: "Instant Target Range Indicator",
    packSize: "Meter + 10 Strips + Lancing Device",
    manufacturer: "Roche Diabetes Care",
    price: 1850.00,
    stock: 45,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
    description: "Effortlessly accurate diabetic blood testing within 4 seconds with painless Softclix lancets.",
    category: { id: "c3", name: "Diabetic Care" }
  },
  {
    id: "medex-9",
    name: "Accu-Chek Instant Test Strips",
    genericName: "Glucose Biosensor Test Strips",
    dosageForm: "Diagnostic Strips",
    strength: "50 Test Strips",
    packSize: "50's Vial",
    manufacturer: "Roche Diagnostics Germany",
    price: 1150.00,
    stock: 120,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop",
    description: "Wide dosing area requiring only a small pinprick droplet of blood for lab-quality testing at home.",
    category: { id: "c3", name: "Diabetic Care" }
  },
  {
    id: "medex-10",
    name: "Omron HEM-7120 Digital BP Monitor",
    genericName: "Automatic Upper Arm Blood Pressure Monitor",
    dosageForm: "Medical Equipment",
    strength: "IntelliSense Precision",
    packSize: "1 Unit with Medium Cuff (22-32 cm)",
    manufacturer: "Omron Healthcare Japan",
    price: 2650.00,
    stock: 35,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5e4b7b34b?q=80&w=600&auto=format&fit=crop",
    description: "One-touch operation with body movement detection and hypertension indicators recommended by cardiologists.",
    category: { id: "c4", name: "Health & Devices" }
  },
  {
    id: "medex-11",
    name: "Pampers Baby Dry Diapers",
    genericName: "Magic Gel Absorbent Core Diapers",
    dosageForm: "Diaper Pants",
    strength: "Size 4 (Large 9-14 kg)",
    packSize: "64 Pieces Pack",
    manufacturer: "Procter & Gamble",
    price: 1680.00,
    stock: 65,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=600&auto=format&fit=crop",
    description: "Locks wetness away for up to 12 hours of peaceful sleep with ultra-soft breathable waistbands.",
    category: { id: "c5", name: "Baby & Mom" }
  },
  {
    id: "medex-12",
    name: "CeraVe Daily Moisturizing Lotion",
    genericName: "Essential Ceramides 1, 3, 6-II + Hyaluronic Acid",
    dosageForm: "Lotion",
    strength: "MVE Technology",
    packSize: "236 ml Bottle",
    manufacturer: "CeraVe / L'Oréal",
    price: 1450.00,
    stock: 80,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
    description: "Lightweight, non-greasy 24-hour hydration formulated for normal to dry and sensitive skin.",
    category: { id: "c6", name: "Personal Care" }
  },
  {
    id: "medex-13",
    name: "Ciprocin 500 Tablet",
    genericName: "Ciprofloxacin Hydrochloride USP",
    dosageForm: "Film Coated Tablet",
    strength: "500 mg",
    packSize: "3 x 10's Blister",
    manufacturer: "Square Pharmaceuticals PLC",
    price: 18.00,
    stock: 200,
    requiredPrescription: true,
    imageUrl: "https://images.unsplash.com/photo-1585698436531-97b76e1045a5?q=80&w=600&auto=format&fit=crop",
    description: "Broad-spectrum antibacterial medicine for urinary tract infections, typhoid fever and respiratory bacterial conditions.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-14",
    name: "Monas 10 Tablet",
    genericName: "Montelukast Sodium",
    dosageForm: "Chewable Tablet",
    strength: "10 mg",
    packSize: "3 x 10's Alu-Alu",
    manufacturer: "Acme Laboratories Ltd.",
    price: 17.50,
    stock: 250,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop",
    description: "Preventative control of asthma and day/night symptom relief for allergic rhinitis and exercise-induced bronchospasm.",
    category: { id: "c1", name: "Medicines" }
  },
  {
    id: "medex-15",
    name: "Glucerna SR Vanilla Powder",
    genericName: "Slow Release Carbohydrate Diabetic Nutrition",
    dosageForm: "Powdered Drink",
    strength: "Low GI Triple Care Formula",
    packSize: "400g Tin",
    manufacturer: "Abbott Laboratories",
    price: 1250.00,
    stock: 50,
    requiredPrescription: false,
    imageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=600&auto=format&fit=crop",
    description: "Scientifically formulated meal replacement that minimizes blood sugar spikes and sustains fullness.",
    category: { id: "c3", name: "Diabetic Care" }
  }
];
