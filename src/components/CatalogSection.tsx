import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { formatRupiah } from '../data/initialBusinessConfig';
import { Plus, Minus, Check, Eye, MessageCircle } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onSelectProductDetail: (product: Product) => void;
  onDirectBuy?: (product: Product, quantity: number) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  onAddToCart,
  onSelectProductDetail,
  onDirectBuy,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'chocolate-mochi', label: 'Chocolate Mochi' },
    { id: 'mochi-oreo', label: 'Mochi Oreo' },
    { id: 'fruit-mochi', label: 'Fruit Mochi' },
    { id: 'pudot', label: 'Pudot' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const getQuantity = (productId: string) => quantities[productId] || 1;

  const handleQuantityChange = (productId: string, delta: number) => {
    const current = getQuantity(productId);
    const next = Math.max(1, Math.min(50, current + delta));
    setQuantities(prev => ({ ...prev, [productId]: next }));
  };

  const handleAdd = (product: Product) => {
    if (!product.available) return;
    const qty = getQuantity(product.id);
    onAddToCart(product, qty);

    // Visual feedback
    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="katalog" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#D94D82] uppercase mb-2">
            <span>✦ KATALOG PRODUK ✦</span>
          </div>
          <h2 className="font-['Playfair_Display'] font-bold text-3xl sm:text-4xl text-[#4A211D] mb-3">
            Pilihan Dessert BB Chi
          </h2>
          <p className="text-[#4A211D]/75 text-sm sm:text-base">
            Pilih dessert favoritmu dan lakukan pre-order sekarang. Dibuat dengan bahan berkualitas.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-12 px-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82] ${
                  isActive
                    ? 'bg-[#4A211D] text-white shadow-xs'
                    : 'bg-[#F9DCE5]/60 hover:bg-[#F9DCE5] text-[#4A211D]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const currentQty = getQuantity(product.id);
            const isAdded = addedAnimation[product.id];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-[#F4A7C4]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#FFF9F5] mb-4 sm:mb-5 border border-[#F9DCE5]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Availability Tag */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                      {product.available ? (
                        <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-[#4A211D] shadow-xs">
                          Tersedia Pre-Order
                        </span>
                      ) : (
                        <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold shadow-xs">
                          Habis
                        </span>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => onSelectProductDetail(product)}
                      className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 p-2 bg-white/90 backdrop-blur-md hover:bg-white text-[#4A211D] rounded-full shadow-xs opacity-90 group-hover:opacity-100 transition-opacity"
                      title="Lihat Detail Produk"
                      aria-label={`Lihat detail ${product.name}`}
                    >
                      <Eye className="w-4 h-4 text-[#D94D82]" />
                    </button>
                  </div>

                  {/* Title & Price */}
                  <div className="mb-2">
                    <h3 className="font-['Playfair_Display'] font-bold text-lg sm:text-xl text-[#4A211D] group-hover:text-[#D94D82] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base sm:text-lg font-bold text-[#D94D82] tabular-nums">
                        {formatRupiah(product.price)}
                      </span>
                      <span className="text-xs text-[#4A211D]/60 font-medium">
                        {product.unit}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#4A211D]/75 line-clamp-2 leading-relaxed mb-4 sm:mb-5">
                    {product.description}
                  </p>
                </div>

                {/* Actions & Quantity */}
                <div className="pt-3.5 border-t border-[#F9DCE5]/80 space-y-2.5">
                  {/* Quantity Stepper & Add Button */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="inline-flex items-center rounded-full border border-[#F4A7C4] bg-[#FFF9F5] p-0.5 sm:p-1 shrink-0">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        disabled={!product.available || currentQty <= 1}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-bold text-[#4A211D] tabular-nums">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        disabled={!product.available}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] disabled:opacity-30 transition-colors"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      disabled={!product.available}
                      className={`flex-1 py-2 sm:py-2.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-2xs ${
                        !product.available
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D94D82] hover:bg-[#c23e71] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span>Ditambahkan</span>
                        </>
                      ) : (
                        <span>+ Keranjang</span>
                      )}
                    </button>
                  </div>

                  {/* Direct Buy Button to User WhatsApp - Mobile Friendly without overflowing */}
                  <button
                    onClick={() => onDirectBuy?.(product, currentQty)}
                    disabled={!product.available}
                    className="w-full py-2.5 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all shadow-2xs active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 text-center leading-tight min-w-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                    <span className="truncate">Beli via WA ({formatRupiah(product.price * currentQty)})</span>
                  </button>

                  <button
                    onClick={() => onSelectProductDetail(product)}
                    className="w-full text-center text-xs font-semibold text-[#D94D82] hover:text-[#4A211D] py-1 transition-colors"
                  >
                    Lihat Detail &amp; Deskripsi Lengkap →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
