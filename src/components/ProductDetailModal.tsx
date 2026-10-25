import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatRupiah } from '../data/initialBusinessConfig';
import { X, Plus, Minus, ShoppingBag, Check, MessageCircle } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onDirectBuy?: (product: Product, quantity: number, variant?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectBuy,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedVariant(
        product.confirmedVariants.length > 0 ? product.confirmedVariants[0] : ''
      );
      setIsSuccess(false);
      setActiveImage(product.detailImageUrl || product.imageUrl);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    if (!product.available) return;
    onAddToCart(product, quantity, selectedVariant || undefined);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleDirectBuy = () => {
    if (!product.available) return;
    if (onDirectBuy) {
      onDirectBuy(product, quantity, selectedVariant || undefined);
    }
  };

  const lineTotal = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Modal Container */}
      <div
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#F4A7C4]/50 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-[#F9DCE5] flex items-center justify-between bg-[#FFF9F5]">
          <div className="text-xs font-semibold text-[#D94D82] uppercase tracking-wider truncate pr-2">
            Katalog &gt; {product.name}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#4A211D]/70 hover:text-[#D94D82] hover:bg-[#F9DCE5] transition-colors focus:outline-none shrink-0"
            aria-label="Tutup detail produk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Product Media */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-[#F4A7C4]/40 aspect-square bg-[#FFF9F5] shadow-xs">
              <img
                src={activeImage || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {product.detailImageUrl && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImage(product.imageUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === product.imageUrl
                      ? 'border-[#D94D82] shadow-xs scale-105'
                      : 'border-[#F4A7C4]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt={`${product.name} thumbnail`}
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage(product.detailImageUrl!)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === product.detailImageUrl
                      ? 'border-[#D94D82] shadow-xs scale-105'
                      : 'border-[#F4A7C4]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={product.detailImageUrl}
                    alt={`${product.name} detail view`}
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2
                id="product-modal-title"
                className="font-['Playfair_Display'] font-bold text-xl sm:text-3xl text-[#4A211D] mb-1.5 sm:mb-2"
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-[#D94D82] tabular-nums">
                  {formatRupiah(product.price)}
                </span>
                <span className="text-xs font-medium text-[#4A211D]/60 uppercase tracking-wide">
                  {product.unit}
                </span>
              </div>

              <div className="mb-4 sm:mb-6">
                <h4 className="text-xs font-bold text-[#4A211D]/70 uppercase tracking-wider mb-1">
                  Deskripsi Produk
                </h4>
                <p className="text-xs sm:text-sm text-[#4A211D]/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Confirmed Variants (if configured by owner) */}
              {product.confirmedVariants.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <label className="block text-xs font-bold text-[#4A211D]/70 uppercase tracking-wider mb-2">
                    Pilih Varian
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.confirmedVariants.map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedVariant === variant
                            ? 'bg-[#D94D82] text-white border-[#D94D82]'
                            : 'border-[#F4A7C4] text-[#4A211D] hover:bg-[#F9DCE5]/40'
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Purchase Bar */}
            <div className="pt-4 sm:pt-6 border-t border-[#F9DCE5] space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-[#4A211D]">Jumlah:</span>
                <div className="inline-flex items-center rounded-full border border-[#F4A7C4] bg-[#FFF9F5] p-0.5 sm:p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || !product.available}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm text-[#4A211D] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.available}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] disabled:opacity-30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl bg-[#FFF9F5] border border-[#F9DCE5]">
                <span className="text-[#4A211D]/70 font-medium">Subtotal:</span>
                <span className="font-bold text-[#D94D82] tabular-nums">
                  {formatRupiah(lineTotal)}
                </span>
              </div>

              {/* Add Button & Direct Buy Button */}
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <button
                  onClick={handleDirectBuy}
                  disabled={!product.available}
                  className="w-full py-3 sm:py-3.5 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-sm transition-all active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed min-w-0"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span className="truncate">Beli via WA ({formatRupiah(lineTotal)})</span>
                </button>

                <button
                  onClick={handleAdd}
                  disabled={!product.available}
                  className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-[#F4A7C4] transition-all active:scale-95 min-w-0 ${
                    !product.available
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed border-transparent'
                      : isSuccess
                      ? 'bg-emerald-600 text-white border-transparent'
                      : 'bg-[#FFF9F5] hover:bg-[#F9DCE5]/60 text-[#4A211D]'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4 shrink-0" />
                      <span className="truncate">Berhasil Masuk Keranjang!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D94D82] shrink-0" />
                      <span className="truncate">+ Tambah ke Keranjang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
