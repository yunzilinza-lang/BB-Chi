import React from 'react';
import { ShoppingBag, FileText, MessageCircle, Send } from 'lucide-react';

export const HowToOrderSection: React.FC = () => {
  const steps = [
    {
      num: '1',
      icon: ShoppingBag,
      title: 'Pilih Produk',
      desc: 'Pilih mochi dan pudot favoritmu dari katalog yang tersedia.',
    },
    {
      num: '2',
      icon: FileText,
      title: 'Isi Form Pesanan',
      desc: 'Lengkapi nama, nomor WhatsApp, serta tanggal pre-order.',
    },
    {
      num: '3',
      icon: MessageCircle,
      title: 'Lanjut ke WhatsApp',
      desc: 'Klik tombol pesan untuk membuka WhatsApp dengan ringkasan otomatis.',
    },
    {
      num: '4',
      icon: Send,
      title: 'Kirim Pesan',
      desc: 'Kirim pesan yang sudah terisi dan tunggu konfirmasi dari BB Chi.',
    },
  ];

  return (
    <section id="cara-preorder" className="py-16 sm:py-24 bg-[#F9DCE5]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#D94D82] uppercase mb-2">
            <span>✦ ALUR PEMESANAN ✦</span>
          </div>
          <h2 className="font-['Playfair_Display'] italic font-bold text-3xl sm:text-4xl text-[#4A211D]">
            Cara Pre-Order
            <span className="text-[#D94D82] not-italic ml-2">♡</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A211D]/75 mt-2">
            Ikuti langkah mudah berikut untuk memesan dessert favoritmu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#F4A7C4]/40 shadow-xs flex flex-col items-center text-center relative group hover:border-[#D94D82] transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D94D82] text-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-[#D94D82] uppercase tracking-wider mb-1">
                  Langkah {step.num}
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#4A211D] mb-1.5 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A211D]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
