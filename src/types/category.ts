export interface ICategory {
  _id: string;
  name: string;
  description: string;
  parent: any;
  isActive: boolean;
  createdBy: string;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children: ICategory[];
}
