import { Product, BusinessSettings, CartItem, PreOrderCustomerInfo } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'chocolate-mochi',
    name: 'Chocolate Mochi',
    category: 'chocolate-mochi',
    price: 7000,
    unit: 'per porsi',
    description: 'Mochi dengan tekstur kenyal dan isian cokelat yang lembut, lumer, cocok untuk pecinta dessert manis dan memikat.',
    imageUrl: '/assets/brand/chocolate-mochi-square.jpg',
    detailImageUrl: '/assets/brand/chocolate-mochi-full.jpg',
    available: true,
    confirmedVariants: []
  },
  {
    id: 'mochi-oreo',
    name: 'Mochi Oreo',
    category: 'mochi-oreo',
    price: 10000,
    unit: 'per porsi',
    description: 'Mochi lembut dengan perpaduan krim manis gurih dan remahan biskuit Oreo asli yang renyah dan nagih di setiap gigitan.',
    imageUrl: '/assets/brand/mochi-oreo-square.jpg',
    detailImageUrl: '/assets/brand/mochi-oreo-full.jpg',
    available: true,
    confirmedVariants: []
  },
  {
    id: 'fruit-mochi',
    name: 'Fruit Mochi (Strawberry)',
    category: 'fruit-mochi',
    price: 10000,
    unit: 'per porsi',
    description: 'Mochi kenyal dengan sensasi buah strawberry segar yang manis asam segar, dibalut lapisan lembut khas BB Chi.',
    imageUrl: '/assets/brand/fruit-mochi-strawberry-hd.jpg',
    detailImageUrl: '/assets/brand/fruit-mochi.jpg',
    available: true,
    confirmedVariants: []
  },
  {
    id: 'mochi-mangga',
    name: 'Mochi Mangga',
    category: 'fruit-mochi',
    price: 10000,
    unit: 'per porsi',
    description: 'Mochi kenyal lembut dengan isian mangga manis matang segar yang juicy dan krim lembut lumer di lidah.',
    imageUrl: '/assets/brand/mochi-mangga-square.jpg',
    detailImageUrl: '/assets/brand/mochi-mangga-full.jpg',
    available: true,
    confirmedVariants: []
  },
  {
    id: 'mochi-semangka',
    name: 'Mochi Semangka',
    category: 'fruit-mochi',
    price: 10000,
    unit: 'per porsi',
    description: 'Sensasi unik mochi pink lembut dengan kesegaran buah semangka segar yang juicy dan menyegarkan harimu.',
    imageUrl: '/assets/brand/mochi-semangka-square.jpg',
    detailImageUrl: '/assets/brand/mochi-semangka-full.jpg',
    available: true,
    confirmedVariants: []
  },
  {
    id: 'pudot',
    name: 'Pudot',
    category: 'pudot',
    price: 10000,
    unit: 'per cup',
    description: 'Puding sedot lembut dan creamy dengan sensasi manis pas, disajikan dalam cup estetik yang siap dinikmati kapan saja.',
    imageUrl: '/assets/brand/pudot-square.jpg',
    detailImageUrl: '/assets/brand/pudot-full.jpg',
    available: true,
    confirmedVariants: []
  }
];

export const CONFIRMED_WHATSAPP_NUMBER = '6285754092078';

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  // Official confirmed WhatsApp business number: 085754092078 -> 6285754092078
  whatsappNumber: CONFIRMED_WHATSAPP_NUMBER,
  isWhatsAppConfigured: true,
  // Confirmed pre-order schedule dates. Can be configured/updated by owner.
  preOrderDates: [
    'Rabu, 28 Oktober 2026'
  ],
  instagramUrl: '',
  pickupDeliveryInfo: '',
  productAvailability: {
    'chocolate-mochi': true,
    'mochi-oreo': true,
    'fruit-mochi': true,
    'mochi-mangga': true,
    'mochi-semangka': true,
    'pudot': true
  },
  confirmedFruitVariants: [],
  confirmedPudotVariants: []
};

export const SETTINGS_STORAGE_KEY = 'bbchi_business_settings_v2';

export function loadStoredSettings(): BusinessSettings {
  if (typeof window === 'undefined') return DEFAULT_BUSINESS_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      // Clear legacy storage key if exists
      try { localStorage.removeItem('bbchi_business_settings_v1'); } catch {}
      return DEFAULT_BUSINESS_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    // If stored settings had empty or unconfigured number, use confirmed number
    if (!parsed.whatsappNumber || parsed.whatsappNumber.trim() === '') {
      parsed.whatsappNumber = CONFIRMED_WHATSAPP_NUMBER;
      parsed.isWhatsAppConfigured = true;
    }
    // Migrate old default pre-order dates to the new 28 Oktober 2026 date
    if (
      Array.isArray(parsed.preOrderDates) &&
      (parsed.preOrderDates.includes('Sabtu, 31 Oktober 2026') || parsed.preOrderDates.length === 0)
    ) {
      parsed.preOrderDates = DEFAULT_BUSINESS_SETTINGS.preOrderDates;
    }
    return { ...DEFAULT_BUSINESS_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_BUSINESS_SETTINGS;
  }
}

export function saveStoredSettings(settings: BusinessSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save BB Chi business settings:', err);
  }
}

export function formatRupiah(amount: number): string {
  // Indonesian Rupiah format without decimals: Rp 7.000
  const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
}

export function buildWhatsAppOrderMessage(
  customer: PreOrderCustomerInfo,
  cart: CartItem[],
  subtotal: number
): string {
  const itemsText = cart
    .map(item => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      const lineTotal = item.price * item.quantity;
      return `- ${item.name}${variantText} x${item.quantity} = ${formatRupiah(lineTotal)}`;
    })
    .join('\n');

  return `Halo BB Chi! Saya ingin melakukan pre-order.

Nama: ${customer.name.trim()}
Nomor WhatsApp: ${customer.whatsapp.trim()}

Pesanan:
${itemsText}

Subtotal: ${formatRupiah(subtotal)}
Tanggal pre-order: ${customer.preOrderDate.trim() || '-'}
Catatan: ${customer.notes.trim() || '-'}

Mohon konfirmasi ketersediaan dan detail pesanan saya. Terima kasih!`;
}

export function buildWhatsAppChatUrl(
  whatsappNumber: string,
  message: string
): string {
  // Format international number without plus, spaces, dashes
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function buildDirectBuyMessage(
  product: Product,
  quantity: number = 1,
  variant?: string
): string {
  const variantText = variant ? ` (${variant})` : '';
  const total = product.price * quantity;
  return `Halo BB Chi! Saya mau beli langsung:

Produk: ${product.name}${variantText}
Jumlah: ${quantity} ${product.unit}
Total perkiraan: ${formatRupiah(total)}

Mohon info ketersediaan slot hari ini / batch pre-order terdekat dan total pembayarannya ya. Terima kasih!`;
}

