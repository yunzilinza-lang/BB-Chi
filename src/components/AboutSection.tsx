import React from 'react';
import { Sparkles, Utensils, Gift, Tag } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Varian rasa yang menarik',
      desc: 'Racikan rasa yang pas dan bikin nagih.',
    },
    {
      icon: Utensils,
      title: 'Tekstur unik dan lembut',
      desc: 'Mochi kenyal berpadu pudot lumer.',
    },
    {
      icon: Gift,
      title: 'Kemasan estetik',
      desc: 'Cantik dan higienis, cocok untuk dibagikan.',
    },
    {
      icon: Tag,
      title: 'Harga terjangkau',
      desc: 'Kualitas premium dengan harga bersahabat.',
    },
  ];

  return (
    <section id="tentang-kami" className="py-12 sm:py-24 bg-[#F9DCE5]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-[#F4A7C4]/40 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left Column: Brand Story */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#D94D82] uppercase mb-2 sm:mb-3">
                <span>✦ TENTANG KAMI ✦</span>
              </div>

              <h2 className="font-['Playfair_Display'] italic font-bold text-2xl sm:text-4xl lg:text-5xl text-[#4A211D] mb-4 sm:mb-6">
                Tentang <br className="hidden sm:inline" />
                BB Chi
                <span className="text-[#D94D82] not-italic ml-2 text-2xl sm:text-3xl">♡</span>
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg text-[#4A211D]/80 leading-relaxed">
                <p>
                  BB Chi hadir sebagai brand dessert mochi dan pudot yang menawarkan rasa
                  yang menarik, tekstur lembut, dan tampilan yang selalu memikat.
                </p>
                <p>
                  Kami percaya dessert bukan hanya soal rasa, tapi juga pengalaman. Karena itu,
                  BB Chi selalu berusaha menyajikan mochi dan pudot dengan kualitas terbaik,
                  kemasan yang menarik, serta pelayanan yang ramah untuk setiap pelanggan.
                </p>
              </div>
            </div>

            {/* Right Column: Visual Assortment */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 sm:border-4 border-[#FFF9F5] shadow-md sm:shadow-lg aspect-[4/3] bg-stone-100">
                <img
                  src="/assets/brand/about-desserts.jpg"
                  alt="BB Chi Dessert Packaging and Assortment"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 4 Brand Pillars Strip */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#F9DCE5] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-2 rounded-xl bg-[#FFF9F5]/60 sm:bg-transparent min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F9DCE5] text-[#D94D82] flex items-center justify-center mb-2 sm:mb-3 shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#4A211D] mb-1 leading-snug break-words text-center">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#4A211D]/70 leading-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
