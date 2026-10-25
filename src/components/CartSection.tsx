import React from 'react';
import { CartItem } from '../types';
import { formatRupiah } from '../data/initialBusinessConfig';
import { Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShoppingBag, MessageCircle } from 'lucide-react';

interface CartSectionProps {
  cart: CartItem[];
  subtotal: number;
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onContinueShopping: () => void;
  onProceedToForm: () => void;
  onQuickWhatsAppBuy?: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cart,
  subtotal,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onProceedToForm,
  onQuickWhatsAppBuy,
}) => {
  return (
    <section id="keranjang" className="py-10 sm:py-16 bg-[#FFF9F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#F4A7C4]/40 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-[#F9DCE5]">
            <span className="text-[#D94D82] text-base sm:text-lg">✦</span>
            <h2 className="font-['Playfair_Display'] font-bold text-xl sm:text-3xl text-[#4A211D]">
              Keranjang Pesanan
            </h2>
          </div>

          {cart.length === 0 ? (
            /* Empty State */
            <div className="py-10 sm:py-12 text-center flex flex-col items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F9DCE5] text-[#D94D82] flex items-center justify-center mb-4">
                <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#4A211D] mb-1">
                Keranjangmu masih kosong
              </h3>
              <p className="text-xs sm:text-sm text-[#4A211D]/70 max-w-sm mb-6 px-4">
                Yuk pilih dessert mochi atau pudot favoritmu dari katalog sekarang!
              </p>
              <button
                onClick={onContinueShopping}
                className="px-6 py-2.5 rounded-full bg-[#D94D82] text-white font-semibold text-xs sm:text-sm hover:bg-[#c23e71] transition-all shadow-xs"
              >
                Jelajahi Katalog
              </button>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-6">
              <div className="divide-y divide-[#F9DCE5]">
                {cart.map((item) => {
                  const lineTotal = item.price * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="py-3.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                    >
                      {/* Product Thumbnail & Title */}
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#F4A7C4]/30 bg-[#FFF9F5] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm sm:text-base text-[#4A211D] truncate">
                            {item.name}
                          </h4>
                          {item.selectedVariant && (
                            <span className="inline-block text-[11px] sm:text-xs font-semibold text-[#D94D82] bg-[#F9DCE5]/60 px-2 py-0.5 rounded-md mt-0.5">
                              {item.selectedVariant}
                            </span>
                          )}
                          <div className="text-xs text-[#4A211D]/70 font-medium mt-0.5">
                            {formatRupiah(item.price)} {item.unit}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper, Line Total & Remove Action */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t border-[#F9DCE5]/40 sm:border-t-0">
                        {/* Stepper */}
                        <div className="inline-flex items-center rounded-full border border-[#F4A7C4] bg-[#FFF9F5] p-0.5 sm:p-1 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] transition-colors"
                            aria-label={`Kurangi jumlah ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-bold text-[#4A211D] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A211D] hover:bg-[#F9DCE5] transition-colors"
                            aria-label={`Tambah jumlah ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right shrink-0">
                          <span className="font-bold text-sm sm:text-base text-[#4A211D] tabular-nums">
                            {formatRupiah(lineTotal)}
                          </span>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 sm:p-2 text-[#4A211D]/50 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                          title="Hapus dari keranjang"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal Calculation */}
              <div className="pt-5 sm:pt-6 border-t-2 border-[#F9DCE5] flex items-center justify-between sm:justify-end gap-4 sm:gap-6 text-right">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4A211D]/70">
                  Subtotal
                </span>
                <span className="font-['Playfair_Display'] font-bold text-xl sm:text-3xl text-[#D94D82] tabular-nums">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 sm:pt-6 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={onContinueShopping}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#F4A7C4] text-[#4A211D] hover:bg-[#F9DCE5]/40 font-semibold text-xs sm:text-sm transition-colors order-2 sm:order-1"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    Lanjut Belanja
                  </button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                    {onQuickWhatsAppBuy && (
                      <button
                        onClick={onQuickWhatsAppBuy}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 text-center min-w-0"
                      >
                        <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                        <span className="truncate">Beli via WA ({formatRupiah(subtotal)})</span>
                      </button>
                    )}

                    <button
                      onClick={onProceedToForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#D94D82] hover:bg-[#c23e71] text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 min-w-0"
                    >
                      <span className="truncate">Isi Form Pre-Order</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
