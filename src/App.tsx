/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, BusinessSettings } from './types';
import {
  INITIAL_PRODUCTS,
  loadStoredSettings,
  saveStoredSettings,
  buildDirectBuyMessage,
  buildWhatsAppChatUrl,
  formatRupiah,
} from './data/initialBusinessConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CatalogSection } from './components/CatalogSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartSection } from './components/CartSection';
import { PreOrderSection } from './components/PreOrderSection';
import { HowToOrderSection } from './components/HowToOrderSection';
import { FAQSection } from './components/FAQSection';
import { OwnerSettingsModal } from './components/OwnerSettingsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [settings, setSettings] = useState<BusinessSettings>(() => loadStoredSettings());
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Optional: restore cart from session storage if present
    try {
      const saved = sessionStorage.getItem('bbchi_cart_session');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  // Keep cart in session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('bbchi_cart_session', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Merge products with business settings
  const products: Product[] = useMemo(() => {
    return INITIAL_PRODUCTS.map((prod) => {
      const isAvailable = settings.productAvailability[prod.id] !== false;
      let confirmedVariants: string[] = [];

      if (prod.category === 'fruit-mochi') {
        confirmedVariants = settings.confirmedFruitVariants || [];
      } else if (prod.category === 'pudot') {
        confirmedVariants = settings.confirmedPudotVariants || [];
      }

      return {
        ...prod,
        available: isAvailable,
        confirmedVariants,
      };
    });
  }, [settings]);

  // Scrollspy observer for active section in navigation
  useEffect(() => {
    const sectionIds = ['beranda', 'tentang-kami', 'katalog', 'cara-preorder', 'faq'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number, variant?: string) => {
    const itemId = `${product.id}-${variant || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          quantity,
          imageUrl: product.imageUrl,
          selectedVariant: variant,
        },
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSaveSettings = (newSettings: BusinessSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  // Direct buy handler that immediately opens WhatsApp with 085754092078
  const handleDirectBuy = (product: Product, quantity: number = 1, variant?: string) => {
    const message = buildDirectBuyMessage(product, quantity, variant);
    const url = buildWhatsAppChatUrl(settings.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Quick checkout for whatever is in cart directly to WhatsApp
  const handleQuickCartWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsText = cart
      .map((item) => {
        const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
        const lineTotal = item.price * item.quantity;
        return `- ${item.name}${variantText} x${item.quantity} = ${formatRupiah(lineTotal)}`;
      })
      .join('\n');

    const message = `Halo BB Chi! Saya mau beli langsung pesanan ini:

${itemsText}

Total: ${formatRupiah(subtotal)}

Mohon info ketersediaan slot hari ini / batch terdekat dan nomor rekening/pembayarannya ya. Terima kasih!`;
    const url = buildWhatsAppChatUrl(settings.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const scrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#4A211D] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden w-full min-w-0">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => scrollTo('keranjang')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        settings={settings}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden min-w-0">
        {/* Hero Section */}
        <Hero
          onExploreCatalog={() => scrollTo('katalog')}
          onPreOrderClick={() => {
            if (cart.length > 0) {
              scrollTo('form-preorder');
            } else {
              scrollTo('katalog');
            }
          }}
        />

        {/* Tentang BB Chi */}
        <AboutSection />

        {/* Katalog Produk */}
        <CatalogSection
          products={products}
          onAddToCart={handleAddToCart}
          onSelectProductDetail={(prod) => setSelectedProductDetail(prod)}
          onDirectBuy={handleDirectBuy}
        />

        {/* Keranjang Pesanan */}
        <CartSection
          cart={cart}
          subtotal={subtotal}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onContinueShopping={() => scrollTo('katalog')}
          onProceedToForm={() => scrollTo('form-preorder')}
          onQuickWhatsAppBuy={handleQuickCartWhatsAppCheckout}
        />

        {/* Form Pre-Order */}
        <PreOrderSection
          cart={cart}
          subtotal={subtotal}
          settings={settings}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onBrowseCatalog={() => scrollTo('katalog')}
        />

        {/* Cara Pre-Order */}
        <HowToOrderSection />

        {/* FAQ Section */}
        <FAQSection
          settings={settings}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={handleAddToCart}
        onDirectBuy={handleDirectBuy}
      />

      {/* Owner Settings & Launch Checklist Modal */}
      <OwnerSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />
    </div>
  );
}
