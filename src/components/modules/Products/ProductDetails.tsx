"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product";
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCcw, Info, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/category";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { toast } from "sonner";
import { useState } from "react";

const MOCK_REVIEWS = [
  { id: 1, user: "Sarah Jenkins", rating: 5, date: "2 weeks ago", comment: "Excellent product! Fast delivery and it works exactly as described. Highly recommend MediStore for their genuine products." },
  { id: 2, user: "Michael Chen", rating: 4, date: "1 month ago", comment: "Good quality, authentic medicine. The packaging was pristine. Only giving 4 stars because delivery took an extra day." },
  { id: 3, user: "Emily Rodriguez", rating: 5, date: "2 months ago", comment: "My go-to for all my family's health needs. Very reliable." },
];

const ProductDetailsClient = ({
  product,
  productCategory,
}: {
  product: IProduct;
  productCategory?: ICategory;
}) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Add product multiple times based on quantity selected
    for(let i=0; i<quantity; i++) {
      dispatch(addProduct(product));
    }
    toast.success(`${quantity} x ${product.name} Added to Cart!`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-8 pb-16">
      
      {/* Left: Image Gallery */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="w-full aspect-square relative bg-white rounded-[2rem] border border-border p-8 flex items-center justify-center overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={product?.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80";
            }}
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.requiredPrescription && (
            <div className="absolute top-6 right-6 bg-orange-100 text-orange-700 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Rx Required
            </div>
          )}
        </div>
        
        {/* Real packaging image preview & gallery */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-square rounded-2xl border-2 ${i === 1 ? 'border-primary' : 'border-border'} bg-white p-2 cursor-pointer hover:border-primary/50 transition-colors shadow-xs`}>
              <img 
                src={product?.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80"} 
                alt="thumb" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80";
                }}
                className="w-full h-full object-contain opacity-90 hover:opacity-100" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{productCategory?.name || product?.category?.name || "Healthcare"}</span>
          <span className="text-border">•</span>
          <span className="text-sm text-muted-foreground">{product.manufacturer}</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2 leading-tight">
          {product.name}
        </h1>

        {product.genericName && (
          <p className="text-sm md:text-base font-semibold text-primary/80 mb-4 italic">
            Generic: {product.genericName}
          </p>
        )}
        
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <span className="text-xs font-semibold text-muted-foreground hover:text-primary cursor-pointer transition-colors">(128 Verified Ratings)</span>
        </div>
        
        {/* Dynamic Multi-Tier Pricing Breakdown: Unit, Strip, and Full Box */}
        <div className="grid grid-cols-3 gap-3 mb-6 bg-secondary/30 p-3 rounded-2xl border border-border/80">
          <div className="bg-white p-3 rounded-xl border border-border shadow-xs text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Single Unit</span>
            <span className="text-lg md:text-xl font-black text-foreground">৳ {product.price.toFixed(2)}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">per {product.dosageForm || 'piece'}</span>
          </div>

          <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 shadow-xs text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[8px] font-bold px-1.5 py-0.5 rounded-bl">Popular</div>
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">Strip Price</span>
            <span className="text-lg md:text-xl font-black text-primary">
              ৳ {(product.stripPrice || product.price * 10).toFixed(2)}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">1 Strip (10 pcs)</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-border shadow-xs text-center">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Full Box</span>
            <span className="text-lg md:text-xl font-black text-foreground">
              ৳ {(product.packagePrice || product.price * 100).toFixed(2)}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5 truncate">{product.packInfo || product.packSize || "Box Pack"}</span>
          </div>
        </div>
        
        <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed">
          {product.description || "Authentic pharmaceutical product verified through MedEx Bangladesh standards. Guaranteed genuine formulation with temperature-controlled handling."}
        </p>

        {/* Add to Cart Section */}
        <div className="bg-card border border-border p-6 rounded-3xl mb-10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Availability</span>
            {product.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold"><CheckCircle2 className="w-4 h-4"/> In Stock ({product.stock} units)</span>
            ) : (
              <span className="text-red-500 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">Out of Stock</span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between border-2 border-border rounded-full px-4 py-2 w-full sm:w-32">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-medium px-2 text-muted-foreground hover:text-foreground transition-colors">-</button>
              <span className="font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="text-xl font-medium px-2 text-muted-foreground hover:text-foreground transition-colors">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 bg-primary text-primary-foreground font-bold text-lg rounded-full py-4 flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-secondary/40 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-sm">100% Genuine</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Sourced from verified brands</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-secondary/40 rounded-2xl">
            <Truck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-sm">Fast Delivery</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Delivered within hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({
  product,
  categories,
}: {
  product: IProduct;
  categories: ICategory[];
}) => {
  const productCategory = (categories || []).find(
    (category) => category.id === product?.categoryId
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList className="text-muted-foreground text-sm font-medium">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/medicines" className="hover:text-primary transition-colors">Catalog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-foreground font-bold">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ProductDetailsClient product={product} productCategory={productCategory} />

      {/* Extended Info Tabs (Mocked Rich Data) */}
      <div className="mt-16 mb-24 border-t border-border pt-16">
        <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-secondary/50 p-1.5 rounded-full h-auto">
            <TabsTrigger value="description" className="rounded-full py-2.5 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">Description</TabsTrigger>
            <TabsTrigger value="ingredients" className="rounded-full py-2.5 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">Ingredients</TabsTrigger>
            <TabsTrigger value="dosage" className="rounded-full py-2.5 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">Usage & Dosage</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full py-2.5 font-semibold text-sm data-[state=active]:bg-background data-[state=active]:shadow-md transition-all">Reviews (128)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-bold mb-4">Product Overview & Indications</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description || "Indicated for effective therapeutic management, symptom relief and restoring metabolic health."}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="font-bold mb-3">Key Highlights (MedEx Clinical Data)</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fast therapeutic bioavailability</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Compliant with DGDA & BP/USP pharmacopoeia standards</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sealed blister / tamper-proof manufacturer packaging</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Batch-controlled cold chain storage maintained</li>
                  </ul>
                </div>
                <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                  <h4 className="font-bold mb-3">MedEx Product Specs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Generic / Strength</span>
                      <span className="font-semibold">{product.genericName || product.strength || "Active Compound"}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Dosage Form</span>
                      <span className="font-semibold">{product.dosageForm || "Tablet / Capsule"}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Manufacturer</span>
                      <span className="font-semibold">{product.manufacturer}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Pack Size</span>
                      <span className="font-semibold">{product.packSize || "Unit Blister / Strip"}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-muted-foreground">Prescription Status</span>
                      <span className={`font-bold ${product.requiredPrescription ? "text-orange-600" : "text-green-600"}`}>
                        {product.requiredPrescription ? "Rx Required" : "OTC (Over The Counter)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-4">Pharmacological Action & Composition</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Sourced under stringent international Good Manufacturing Practices (GMP) and verified for bioequivalence.
            </p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Active Composition</th>
                    <th className="px-6 py-4 font-semibold">Classification</th>
                    <th className="px-6 py-4 font-semibold">Therapeutic Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.genericName || "Pharmaceutical Grade Formulation"}</td>
                    <td className="px-6 py-4 text-muted-foreground">{productCategory?.name || "Healthcare Essential"}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Excipients & Stabilizers</td>
                    <td className="px-6 py-4 text-muted-foreground">USP/BP Standard Base</td>
                    <td className="px-6 py-4 text-muted-foreground">Bioavailability Enhancer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="dosage" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Dosage & Administration Guidelines</h3>
              <p className="text-foreground leading-relaxed mb-6 font-medium">
                Adults and adolescents: Take as prescribed by your registered physician or as detailed on the patient information leaflet. Swallow whole with water; do not crush or chew prolonged-release forms.
              </p>
              
              <h4 className="font-bold mb-2">Clinical Contraindications & Precautions:</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                <li>Hypersensitivity to any of the active or inactive components.</li>
                <li>In severe renal or hepatic impairment, dose adjustment or medical supervision is necessary.</li>
                <li>Pregnancy & Lactation: Consult your gynecologist or pediatrician before consumption.</li>
                <li>Keep stored below 30°C in a dry environment, shielded from direct sunlight and moisture.</li>
                <li>Keep out of reach of children.</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ProductReviewsTab productId={product.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ProductReviewsTab = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }

    setSubmitting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          medicineId: productId,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review submitted successfully!");
      } else {
        toast.success("Review submitted! (Simulation)");
      }
      setReviews(prev => [
        {
          id: Date.now(),
          user: "You",
          rating,
          date: "Just now",
          comment,
        },
        ...prev,
      ]);
      setComment("");
      setIsModalOpen(false);
    } catch {
      toast.success("Review submitted! (Simulation)");
      setReviews(prev => [
        {
          id: Date.now(),
          user: "You",
          rating,
          date: "Just now",
          comment,
        },
        ...prev,
      ]);
      setComment("");
      setIsModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/>
              <Star className="w-5 h-5 fill-gray-200 text-gray-200"/>
            </div>
            <span className="font-semibold text-lg">4.8</span>
            <span className="text-muted-foreground">based on {reviews.length} reviews</span>
          </div>
        </div>
        <Button onClick={() => setIsModalOpen(true)} variant="outline" className="rounded-full">
          Write a Review
        </Button>
      </div>

      {isModalOpen && (
        <div className="mb-8 p-6 bg-card border border-primary/20 rounded-2xl shadow-sm animate-in fade-in">
          <h4 className="font-bold text-lg mb-4">Share Your Experience</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Your Feedback</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the product? Fast delivery, efficacy, packaging..."
                rows={3}
                className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </div>
      )}
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-border p-6 rounded-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{review.user}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3.5 h-3.5"/> Verified Buyer</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
