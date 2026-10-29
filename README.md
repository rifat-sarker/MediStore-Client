# 🏥 MediStore — Modern Full-Stack Healthcare & Pharmacy Platform (Client)

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-white?style=for-the-badge&logo=vercel)](https://medistore.rifatsarker.com)

> **MediStore Client** is a production-ready, accessible, and high-performance frontend for an online medicine marketplace and pharmacy management system. Built with Next.js App Router, Tailwind CSS, Shadcn UI, and Redux Toolkit.

🌐 **Live Website:** [https://medistore.rifatsarker.com](https://medistore.rifatsarker.com)  
📦 **Backend Repository:** [MediStore-Server](https://github.com/rifat-sarker/MediStore-Server)

---

## 🌟 Key Features

### 🛒 Customer Experience
- **Interactive Medicine Catalog:** Instant multi-category filtering, real-time search with live suggestions, price range slider, and stock availability indicators.
- **Dynamic Packaging & Pricing Tiers:** Buy medicines by Strip, Box, or Unit with live price calculation and savings highlights.
- **Smart Cart & Local Persistence:** Persistent client-side cart synced across tabs with Redux Toolkit and `localStorage`.
- **Prescription Upload System:** Integrated prescription attachment flow for prescription-only pharmaceutical items.
- **Seamless Checkout & SSLCommerz Payment:** Instant payment gateway redirect and automated order tracking.

### 🔐 Authentication & Security
- **Multi-Factor Registration:** Email registration with 6-digit OTP verification via Gmail SMTP SSL.
- **Google One-Tap / OAuth:** Official Google Identity Services integration with branded localized Sign-in buttons.
- **Role-Based Routing:** Protected routes for `CUSTOMER`, `ADMIN`, and `RIDER` with JWT authentication cookies.

### 📊 Admin & Rider Dashboards
- **Executive Dashboard:** Live metrics for revenue, order velocity, inventory health, and recent transactions.
- **Inventory & Category Management:** Rich modal forms with Cloudinary image upload, stock adjustments, and dosage guidelines.
- **Order Dispatch & Tracking:** Change order statuses (`PENDING` ➔ `PROCESSING` ➔ `SHIPPED` ➔ `DELIVERED`).
- **Dedicated Rider Portal:** Delivery assignees can view assigned deliveries and update doorstep status.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Components & Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React Context API
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **UI Notifications:** [Sonner Toast](https://sonner.emilkowal.ski/)
- **Deployment:** [Vercel](https://vercel.com/) with Custom Domain SSL

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.18.0 or **Bun**
- Package manager: `npm`, `yarn`, or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rifat-sarker/MediStore-Client.git
   cd MediStore-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` or `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_BASE_API="https://medistore-server-chi.vercel.app/api/v1"
   NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_oauth_client_id.apps.googleusercontent.com"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Architecture

```
src/
├── app/                  # Next.js App Router (Routes & Layouts)
│   ├── (admin)/          # Admin Dashboard & Inventory pages
│   ├── (withCommonLayout)# Public store pages (Home, Medicines, Cart, Checkout)
│   ├── rider-dashboard/  # Rider delivery tracking portal
│   ├── layout.tsx        # Root layout with fonts, metadata, and scripts
│   └── page.tsx          # Homepage
├── components/           # Modular & reusable UI components
│   ├── modules/          # Domain-specific modules (Auth, Cart, Medicines, Admin)
│   ├── shared/           # Global Navbar, Footer, Mobile Navigation
│   └── ui/               # Radix / Shadcn accessible UI primitives
├── context/              # User Context & App Providers
├── redux/                # Redux Toolkit store, slices, and selectors
├── services/             # Client-side API fetchers & Server Actions
└── types/                # Global TypeScript definitions
```

---

## 👨‍💻 Author

**Rifat Sarker**
- **Portfolio:** [rifatsarker.com](https://www.rifatsarker.com)
- **GitHub:** [@rifat-sarker](https://github.com/rifat-sarker)
- **LinkedIn:** [linkedin.com/in/rifatswd](https://linkedin.com/in/rifatswd)
- **Email:** [rifatswd@gmail.com](mailto:rifatswd@gmail.com)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

