import { Product, BusinessSettings, CartItem, PreOrderCustomerInfo } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'chocolate-mochi',
    name: 'Chocolate Mochi',
    category: 'chocolate-mochi',
    price: 7000,
    unit: 'per porsi',
    promoBadge: 'PROMO: 3 Pcs Rp 20.000',
    description: 'Mochi dengan tekstur kenyal dan isian cokelat lembut lumer melimpah. Promo spesial: beli 3 pcs hanya Rp 20.000 (dari Rp 21.000, hemat Rp 1.000)!',
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

/**
 * Calculates item line total, applying bundle discounts.
 * Chocolate Mochi Promo:
 * Every bundle of 3 pcs costs Rp 20.000 (normal 3 x Rp 7.000 = Rp 21.000, saving Rp 1.000 per 3 pcs).
 */
export function calculateItemTotal(productId: string, unitPrice: number, quantity: number): {
  originalTotal: number;
  finalTotal: number;
  discount: number;
  promoApplied: boolean;
  promoDescription?: string;
} {
  const originalTotal = unitPrice * quantity;

  if (productId === 'chocolate-mochi' && quantity >= 3) {
    const bundleCount = Math.floor(quantity / 3);
    const remainder = quantity % 3;
    const finalTotal = (bundleCount * 20000) + (remainder * 7000);
    const discount = originalTotal - finalTotal;
    return {
      originalTotal,
      finalTotal,
      discount,
      promoApplied: true,
      promoDescription: `Promo 3 Pcs Rp 20.000 (Hemat ${formatRupiah(discount)})`,
    };
  }

  return {
    originalTotal,
    finalTotal: originalTotal,
    discount: 0,
    promoApplied: false,
  };
}

export function buildWhatsAppOrderMessage(
  customer: PreOrderCustomerInfo,
  cart: CartItem[],
  subtotal: number
): string {
  let totalSaved = 0;
  const itemsText = cart
    .map(item => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      const calc = calculateItemTotal(item.productId, item.price, item.quantity);
      totalSaved += calc.discount;
      if (calc.promoApplied) {
        return `- ${item.name}${variantText} x${item.quantity} = ${formatRupiah(calc.finalTotal)} (Promo 3 pcs, hemat ${formatRupiah(calc.discount)})`;
      }
      return `- ${item.name}${variantText} x${item.quantity} = ${formatRupiah(calc.finalTotal)}`;
    })
    .join('\n');

  const promoSummaryNote = totalSaved > 0 ? `\nTotal Hemat Promo: ${formatRupiah(totalSaved)}` : '';

  return `Halo BB Chi! Saya ingin melakukan pre-order.

Nama: ${customer.name.trim()}
Nomor WhatsApp: ${customer.whatsapp.trim()}

Pesanan:
${itemsText}

Subtotal: ${formatRupiah(subtotal)}${promoSummaryNote}
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
  const calc = calculateItemTotal(product.id, product.price, quantity);
  const promoNote = calc.promoApplied
    ? `\n🎉 Promo Aktif: Beli 3 pcs seharga ${formatRupiah(calc.finalTotal)} (Normal ${formatRupiah(calc.originalTotal)}, hemat ${formatRupiah(calc.discount)})!`
    : '';

  return `Halo BB Chi! Saya mau beli langsung:

Produk: ${product.name}${variantText}
Jumlah: ${quantity} ${product.unit}
Total perkiraan: ${formatRupiah(calc.finalTotal)}${promoNote}

Mohon info ketersediaan slot hari ini / batch pre-order terdekat dan total pembayarannya ya. Terima kasih!`;
}

