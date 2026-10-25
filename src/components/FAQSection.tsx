import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Instagram, HelpCircle, AlertCircle } from 'lucide-react';
import { BusinessSettings } from '../types';

interface FAQSectionProps {
  settings: BusinessSettings;
  onOpenSettings: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ settings, onOpenSettings }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showConfigAlert, setShowConfigAlert] = useState(false);

  const faqs = [
    {
      q: 'Bagaimana cara melakukan pre-order?',
      a: 'Pilih dessert mochi atau pudot yang kamu inginkan di katalog, tentukan jumlahnya, lalu isi form pre-order dengan data nama dan tanggal. Klik "Pesan via WhatsApp" untuk mengirim pesan pesanan langsung ke BB Chi.',
    },
    {
      q: 'Produk apa saja yang tersedia di BB Chi?',
      a: 'Saat ini BB Chi menyediakan 6 pilihan dessert unggulan: Chocolate Mochi, Mochi Oreo, Fruit Mochi Strawberry, Mochi Mangga, Mochi Semangka, dan Pudot (Puding Sedot). Semua dibuat fresh dari bahan berkualitas.',
    },
    {
      q: 'Berapa harga mochi dan pudot? Apakah ada promo?',
      a: 'Chocolate Mochi seharga Rp 7.000 per porsi, dan ada promo spesial: beli 3 pcs cukup bayar Rp 20.000 (dari normal Rp 21.000, hemat Rp 1.000)! Untuk Mochi Oreo, Fruit Mochi (Strawberry, Mangga, Semangka), dan Pudot seharga Rp 10.000 per porsi/cup.',
    },
    {
      q: 'Apakah ada varian rasa tertentu?',
      a: 'Chocolate Mochi hadir dengan isian cokelat lumer melimpah. Mochi Oreo dipadukan dengan biskuit Oreo asli. Fruit Mochi menggunakan buah segar asli (Strawberry, Mangga matang, Semangka segar). Pudot bertekstur lembut dan creamy lumer di mulut.',
    },
    {
      q: 'Kapan jadwal pre-order dibuka?',
      a: 'Jadwal pre-order dibuka secara berkala sesuai kapasitas produksi. Kamu dapat memilih tanggal pre-order aktif yang tertera di form pemesanan website ini.',
    },
    {
      q: 'Bagaimana cara konfirmasi pesanan saya?',
      a: 'Setelah kamu mengirim pesan WhatsApp yang sudah disiapkan otomatis, admin BB Chi akan membalas untuk mengonfirmasi ketersediaan slot, detail pembayaran, dan waktu pengambilan/pengantaran.',
    },
  ];

  const handleWhatsAppChat = () => {
    if (!settings.isWhatsAppConfigured || !settings.whatsappNumber.trim()) {
      setShowConfigAlert(true);
      return;
    }
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const defaultMsg = encodeURIComponent('Halo BB Chi! Saya ingin bertanya seputar pemesanan mochi dan pudot.');
    window.open(`https://wa.me/${cleanNumber}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    if (settings.instagramUrl && settings.instagramUrl.trim()) {
      window.open(settings.instagramUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Akun Instagram resmi BB Chi sedang disiapkan dan akan segera dipublikasikan. Silakan hubungi kami via WhatsApp!');
    }
  };

  return (
    <section id="faq" className="py-12 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Column: FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#D94D82] uppercase mb-2">
              <span>✦ PERTANYAAN UMUM ✦</span>
            </div>
            <h2 className="font-['Playfair_Display'] font-bold text-2xl sm:text-4xl text-[#4A211D] mb-4 sm:mb-6">
              Pertanyaan yang Sering Diajukan
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#F4A7C4]/40 rounded-2xl bg-white overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 font-semibold text-xs sm:text-base text-[#4A211D] hover:text-[#D94D82] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="min-w-0 pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D94D82] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#4A211D]/80 leading-relaxed border-t border-[#F9DCE5]/60 pt-2.5 sm:pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFF9F5] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-[#F4A7C4]/50 shadow-sm relative overflow-hidden">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#F9DCE5] text-[#D94D82] flex items-center justify-center mb-3 sm:mb-5">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <h3 className="font-['Playfair_Display'] font-bold text-xl sm:text-2xl text-[#4A211D] mb-1.5 sm:mb-2">
                Masih ada pertanyaan?
              </h3>
              <p className="text-xs sm:text-sm text-[#4A211D]/75 leading-relaxed mb-5 sm:mb-6">
                Yuk hubungi BB Chi langsung melalui WhatsApp atau Instagram untuk pertanyaan lainnya seputar ketersediaan dan pre-order.
              </p>

              {showConfigAlert && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    Nomor WhatsApp belum dikonfigurasi.{' '}
                    <button
                      onClick={() => {
                        setShowConfigAlert(false);
                        onOpenSettings();
                      }}
                      className="font-bold underline text-[#D94D82]"
                    >
                      Buka Pengaturan
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2.5 sm:space-y-3">
                <button
                  onClick={handleWhatsAppChat}
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-full bg-[#D94D82] hover:bg-[#c23e71] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat via WhatsApp
                </button>

                <button
                  onClick={handleInstagramClick}
                  className="w-full py-3 px-5 rounded-full border border-[#F4A7C4] hover:bg-[#F9DCE5]/40 text-[#4A211D] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#D94D82]" />
                  Lihat Instagram
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F9DCE5] text-center">
                <span className="text-xs text-[#4A211D]/60 italic font-medium">
                  "Too Sweet to Handle."
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
