import { ICategory } from "./category";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  requiredPrescription: boolean;
  manufacturer: string;
  expiryDate: string;
  imageUrl?: string;
  categoryId: string;
  category?: ICategory;
  createdAt: string;
  updatedAt: string;
}
