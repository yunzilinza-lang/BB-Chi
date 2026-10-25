export type ProductCategory = 'all' | 'chocolate-mochi' | 'fruit-mochi' | 'mochi-oreo' | 'pudot';

export interface Product {
  id: string;
  name: string;
  category: 'chocolate-mochi' | 'fruit-mochi' | 'mochi-oreo' | 'pudot';
  price: number; // integer Rupiah
  unit: string; // 'per porsi' | 'per cup'
  description: string;
  imageUrl: string;
  detailImageUrl?: string;
  available: boolean;
  confirmedVariants: string[];
}

export interface CartItem {
  id: string; // unique item id: `${productId}-${variant || 'default'}`
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  imageUrl: string;
  selectedVariant?: string;
}

export interface BusinessSettings {
  whatsappNumber: string;
  isWhatsAppConfigured: boolean;
  preOrderDates: string[];
  instagramUrl: string;
  pickupDeliveryInfo: string;
  productAvailability: Record<string, boolean>;
  confirmedFruitVariants: string[];
  confirmedPudotVariants: string[];
}

export interface PreOrderCustomerInfo {
  name: string;
  whatsapp: string;
  preOrderDate: string;
  notes: string;
}
