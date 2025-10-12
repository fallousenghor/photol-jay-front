export interface ProductImage {
  id: number;
  url: string;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  shopLink?: string;
  // Add other user fields as needed
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number | null;
  userId: number;
  user?: User;
  isApproved: boolean;
  priority: boolean;
  views: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  images?: ProductImage[];
}

export interface CreateProduct {
  title: string;
  description: string;
  price?: number;
  userId: number;
  expiresAt: Date;
}
