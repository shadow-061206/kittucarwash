export type VehicleType = 'hatchback' | 'sedan' | 'suv' | 'bike';

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrices: Record<VehicleType, number>;
  features: string[];
  durationMinutes: number;
  popular?: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleNumber: string;
  vehicleType: VehicleType;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedAddOns: string[];
  addOnsPrice: number;
  date: string;
  timeSlot: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
