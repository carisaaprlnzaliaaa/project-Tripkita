export interface TourPackage {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl?: string;
  price: number;
  duration: string;
  schedule: string;
  facilities: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  packageId: string;
  customerId: string;
  customerName: string;
  packageName: string;
  participants: number;
  totalPrice: number;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}
