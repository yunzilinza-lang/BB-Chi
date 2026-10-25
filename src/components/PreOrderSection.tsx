import React, { useState } from 'react';
import { CartItem, BusinessSettings, PreOrderCustomerInfo } from '../types';
import {
  formatRupiah,
  buildWhatsAppOrderMessage,
  buildWhatsAppChatUrl,
} from '../data/initialBusinessConfig';
import { MessageCircle, AlertCircle, Info, Calendar, User, Phone, CheckCircle2, Settings } from 'lucide-react';

interface PreOrderSectionProps {
  cart: CartItem[];
  subtotal: number;
  settings: BusinessSettings;
  onOpenSettings: () => void;
  onBrowseCatalog: () => void;
}

export const PreOrderSection: React.FC<PreOrderSectionProps> = ({
  cart,
  subtotal,
  settings,
  onOpenSettings,
  onBrowseCatalog,
}) => {
  const [formData, setFormData] = useState<PreOrderCustomerInfo>({
    name: '',
    whatsapp: '',
    preOrderDate: settings.preOrderDates[0] || '',
    notes: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    whatsapp?: string;
    preOrderDate?: string;
    cart?: string;
  }>({});

  const [isSent, setIsSent] = useState(false);
  const [showConfigWarning, setShowConfigWarning] = useState(false);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter.';
    }

    const cleanPhone = formData.whatsapp.replace(/[^0-9]/g, '');
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (cleanPhone.length < 9 || cleanPhone.length > 15) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (contoh: 08123456789).';
    }

    if (settings.preOrderDates.length > 0 && !formData.preOrderDate) {
      newErrors.preOrderDate = 'Pilih salah satu tanggal pre-order yang tersedia.';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Keranjang pesanan masih kosong. Pilih produk terlebih dahulu.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Check if Business WhatsApp Number is configured
    if (!settings.isWhatsAppConfigured || !settings.whatsappNumber.trim()) {
      setShowConfigWarning(true);
      return;
    }

    const message = buildWhatsAppOrderMessage(formData, cart, subtotal);
    const whatsappUrl = buildWhatsAppChatUrl(settings.whatsappNumber, message);

    setIsSent(true);

    // Open WhatsApp in new tab / window
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="form-preorder" className="py-12 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-[#F4A7C4]/40 shadow-sm">
          {/* Section Heading */}
          <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#D94D82] uppercase mb-2">
              <span>✦ FORM PRE-ORDER ✦</span>
            </div>
            <h2 className="font-['Playfair_Display'] font-bold text-2xl sm:text-4xl text-[#4A211D] mb-2 sm:mb-3">
              Lengkapi Data Pemesanan
            </h2>
            <p className="text-xs sm:text-sm text-[#4A211D]/75">
              Isi data diri dengan benar, lalu lanjutkan ke WhatsApp untuk konfirmasi pesanan dengan BB Chi.
            </p>
          </div>

          {/* Cart Warning if empty */}
          {cart.length === 0 && (
            <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-800">
              <div className="flex items-start gap-2.5 min-w-0">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold">Keranjang Belum Terisi:</span> Silakan pilih produk dari katalog sebelum mengirim form pre-order.
                </div>
              </div>
              <button
                type="button"
                onClick={onBrowseCatalog}
                className="text-xs font-bold text-[#D94D82] underline hover:no-underline shrink-0"
              >
                Pilih Produk
              </button>
            </div>
          )}

          {/* Unconfigured WhatsApp Business Warning Modal/Banner */}
          {showConfigWarning && (
            <div className="mb-8 p-5 rounded-2xl bg-rose-50 border-2 border-rose-200 text-[#4A211D]">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-bold text-base text-rose-800 mb-1">
                    Nomor WhatsApp Bisnis Belum Dikonfigurasi
                  </h4>
                  <p className="text-sm text-[#4A211D]/80 leading-relaxed mb-3">
                    Sesuai kebijakan ketat kejujuran data (No-Dummy-Data), BB Chi tidak mengirim pesanan ke nomor rekaan/fiktif. Pemilik toko dapat memasukkan nomor WhatsApp resmi di menu Pengaturan Toko.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfigWarning(false);
                      onOpenSettings();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#D94D82] text-white rounded-full text-xs font-semibold hover:bg-[#c23e71] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Buka Pengaturan Toko Sekarang
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Callout after WhatsApp opened */}
          {isSent && (
            <div className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <div className="font-bold text-base">WhatsApp Berhasil Dibuka!</div>
                  <p className="text-emerald-800">
                    Teks pesananmu sudah disiapkan secara otomatis di chat WhatsApp. <strong>Jangan lupa klik tombol "Kirim"</strong> di WhatsApp dan tunggu konfirmasi manual ketersediaan dari tim BB Chi ya!
                  </p>
                  <p className="text-xs text-emerald-700 italic pt-1">
                    Catatan: Pembukaan WhatsApp bukan berarti pesanan otomatis terkonfirmasi sebelum admin BB Chi membalas pesananmu.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pre-Order Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-2">
                  Nama Lengkap <span className="text-[#D94D82]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A211D]/40">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Masukkan nama lengkap kamu"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm bg-[#FFF9F5]/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#D94D82] ${
                      errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#F4A7C4]'
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.name}</p>
                )}
              </div>

              {/* Customer WhatsApp */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-2">
                  Nomor WhatsApp <span className="text-[#D94D82]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A211D]/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      setFormData({ ...formData, whatsapp: e.target.value });
                      if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
                    }}
                    placeholder="Contoh: 08123456789"
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-sm bg-[#FFF9F5]/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#D94D82] ${
                      errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-[#F4A7C4]'
                    }`}
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.whatsapp}</p>
                )}
              </div>
            </div>

            {/* Pre-Order Date Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-2">
                Pilih Tanggal Pre-Order <span className="text-[#D94D82]">*</span>
              </label>

              {settings.preOrderDates.length === 0 ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900">
                  <div className="font-semibold mb-1">Jadwal Pre-Order Belum Diterbitkan</div>
                  <p className="text-xs text-amber-800">
                    Saat ini pemilik BB Chi belum membuka tanggal pre-order baru. Kamu tetap bisa menanyakan ketersediaan langsung melalui WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A211D]/40">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.preOrderDate}
                    onChange={(e) => {
                      setFormData({ ...formData, preOrderDate: e.target.value });
                      if (errors.preOrderDate) setErrors({ ...errors, preOrderDate: undefined });
                    }}
                    className={`w-full pl-10 pr-10 py-3 rounded-2xl border text-sm bg-[#FFF9F5]/50 focus:bg-white appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-[#D94D82] ${
                      errors.preOrderDate ? 'border-red-400 bg-red-50/30' : 'border-[#F4A7C4]'
                    }`}
                  >
                    {settings.preOrderDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {errors.preOrderDate && (
                <p className="text-xs text-red-600 mt-1.5 ml-1">{errors.preOrderDate}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-2">
                Catatan Tambahan <span className="text-xs font-normal text-[#4A211D]/60">(Opsional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Contoh: permintaan khusus kemasan, jam perkiraan ambil, atau ucapan hadiah..."
                className="w-full px-4 py-3 rounded-2xl border border-[#F4A7C4] text-sm bg-[#FFF9F5]/50 focus:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#D94D82]"
              />
            </div>

            {/* Order Summary Snapshot */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFF9F5] border border-[#F9DCE5] text-xs sm:text-sm space-y-2">
              <div className="font-bold text-[#4A211D] flex items-center justify-between gap-2">
                <span className="truncate">Ringkasan Item ({cart.reduce((sum, item) => sum + item.quantity, 0)} item):</span>
                <span className="text-[#D94D82] tabular-nums font-bold shrink-0">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <ul className="text-xs text-[#4A211D]/75 space-y-1.5 max-h-32 overflow-y-auto pr-1 divide-y divide-[#F9DCE5]/40">
                {cart.map((item) => (
                  <li key={item.id} className="pt-1.5 first:pt-0 flex items-center justify-between gap-2 min-w-0">
                    <span className="truncate min-w-0 flex-1">
                      {item.name} {item.selectedVariant ? `(${item.selectedVariant})` : ''} x{item.quantity}
                    </span>
                    <span className="tabular-nums font-semibold shrink-0 text-[#4A211D]">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clarification Notice */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F9DCE5]/40 border border-[#F4A7C4]/50 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D94D82] shrink-0 mt-0.5" />
              <p className="text-xs text-[#4A211D]/80 leading-relaxed">
                Setelah menekan tombol di bawah, kamu akan diarahkan ke WhatsApp dengan pesan
                pesanan yang sudah terisi otomatis. <strong>Mohon kirim pesan tersebut dan tunggu konfirmasi manual dari BB Chi ya! ♡</strong>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-3.5 sm:py-4 px-4 rounded-full bg-[#D94D82] hover:bg-[#c23e71] disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82] focus-visible:ring-offset-2 min-w-0"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className="truncate sm:whitespace-normal">Pesan via WhatsApp ({formatRupiah(subtotal)})</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
