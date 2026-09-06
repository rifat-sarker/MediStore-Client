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
        <div className="w-full aspect-square relative bg-secondary/20 rounded-[2rem] border border-border p-8 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={product?.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop"}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.requiredPrescription && (
            <div className="absolute top-6 right-6 bg-orange-100 text-orange-700 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Rx Required
            </div>
          )}
        </div>
        
        {/* Thumbnails (Mocked) */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`aspect-square rounded-2xl border-2 ${i === 1 ? 'border-primary' : 'border-border'} bg-secondary/10 p-2 cursor-pointer hover:border-primary/50 transition-colors`}>
              <img src={product?.imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=150&auto=format&fit=crop"} className="w-full h-full object-contain mix-blend-multiply opacity-80 hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{productCategory?.name || "Health Care"}</span>
          <span className="text-border">•</span>
          <span className="text-sm text-muted-foreground">{product.manufacturer}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4 leading-tight">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-5 h-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors">(128 Reviews)</span>
        </div>
        
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-4xl font-black text-foreground">৳ {product.price.toFixed(2)}</span>
          <span className="text-lg text-muted-foreground line-through">৳ {(product.price * 1.2).toFixed(2)}</span>
          <span className="ml-2 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">Save 20%</span>
        </div>
        
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {product.description || "Premium quality healthcare product formulated for fast absorption and maximum efficacy. Clinically tested and verified by health professionals for safe daily use."}
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
              <h3 className="text-xl font-bold mb-4">Product Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description || "This premium health product is designed to support your daily wellness journey. Manufactured under strict quality control standards, it ensures maximum purity and potency."}</p>
              
              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="font-bold mb-3">Key Benefits</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fast-acting formulation</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Clinically tested ingredients</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Suitable for daily use</li>
                  </ul>
                </div>
                <div className="bg-secondary/30 p-6 rounded-2xl border border-border">
                  <h4 className="font-bold mb-3">Product Specs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Manufacturer</span>
                      <span className="font-semibold">{product.manufacturer}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-semibold">{productCategory?.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-muted-foreground">Expiry Date</span>
                      <span className="font-semibold">{product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : "Dec 2028"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-4">Active Ingredients</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">Each dose contains the highest quality raw materials sourced globally and processed in FDA-approved facilities.</p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Ingredient</th>
                    <th className="px-6 py-4 font-semibold">Amount per serving</th>
                    <th className="px-6 py-4 font-semibold">% Daily Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="px-6 py-4 font-medium">Primary Active Compound</td><td className="px-6 py-4 text-muted-foreground">500mg</td><td className="px-6 py-4 text-muted-foreground">100%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Vitamin Complex Base</td><td className="px-6 py-4 text-muted-foreground">50mg</td><td className="px-6 py-4 text-muted-foreground">50%</td></tr>
                  <tr><td className="px-6 py-4 font-medium">Absorption Enhancer</td><td className="px-6 py-4 text-muted-foreground">10mg</td><td className="px-6 py-4 text-muted-foreground">*</td></tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="dosage" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4 text-primary">Recommended Usage</h3>
              <p className="text-foreground leading-relaxed mb-6 font-medium">Take one (1) unit daily with a full glass of water, preferably with a meal, or as directed by a healthcare professional.</p>
              
              <h4 className="font-bold mb-2">Important Warnings:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>Do not exceed the recommended dose.</li>
                <li>Pregnant or nursing mothers should consult a physician before use.</li>
                <li>Keep out of reach of children.</li>
                <li>Store in a cool, dry place away from direct sunlight.</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold">Customer Reviews</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex"><Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/><Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/><Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/><Star className="w-5 h-5 fill-yellow-400 text-yellow-400"/><Star className="w-5 h-5 fill-gray-200 text-gray-200"/></div>
                  <span className="font-semibold text-lg">4.8</span>
                  <span className="text-muted-foreground">based on 128 reviews</span>
                </div>
              </div>
              <Button variant="outline" className="rounded-full">Write a Review</Button>
            </div>
            
            <div className="space-y-6">
              {MOCK_REVIEWS.map((review) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
