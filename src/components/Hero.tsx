import React from 'react';
import { ArrowRight, MessageCircle, Heart, Sparkles, Package } from 'lucide-react';

interface HeroProps {
  onExploreCatalog: () => void;
  onPreOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onPreOrderClick,
}) => {
  return (
    <section id="beranda" className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:min-h-[700px] flex flex-col justify-between">
      {/* Full-Bleed Background Image (No box enclosure) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/brand/hero-desserts-full.png"
          alt="BB Chi Mochi dan Pudot Latar Belakang"
          className="w-full h-full object-cover object-[78%_center] sm:object-right lg:object-center select-none"
          loading="eager"
        />

        {/* Sophisticated gradient scrim: Keeps text 100% readable on the left, seamlessly reveals the dessert spread on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F5] via-[#FFF9F5]/90 via-45% to-transparent sm:via-[#FFF9F5]/75 lg:via-[#FFF9F5]/60" />

        {/* Subtle top and bottom fades for seamless page transition */}
        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#FFF9F5]/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#FFF9F5] via-[#FFF9F5]/70 to-transparent" />
      </div>

      {/* Content Container (sitting on top of full background) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full my-auto">
        <div className="max-w-2xl text-left">
          {/* Kicker */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-[#D94D82] uppercase mb-3 sm:mb-4 bg-white/75 backdrop-blur-xs px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#F4A7C4]/40 shadow-2xs max-w-full">
            <span>MOCHI</span>
            <span className="text-[#F4A7C4]">•</span>
            <span>PUDOT</span>
            <span className="text-[#F4A7C4]">•</span>
            <span>BAD GIRL ENERGY</span>
          </div>

          {/* Headline */}
          <h1 className="font-['Playfair_Display'] italic font-bold text-3xl sm:text-5xl lg:text-6xl text-[#4A211D] leading-[1.15] mb-4 sm:mb-5 drop-shadow-xs">
            Too Sweet <br />
            to Handle.
            <span className="inline-block ml-2 sm:ml-3 text-[#D94D82] font-normal not-italic animate-pulse">
              ♡
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-lg text-[#4A211D]/85 leading-relaxed mb-6 sm:mb-8 max-w-lg bg-white/50 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-3 sm:p-0 rounded-2xl">
            BB Chi adalah dessert mochi dan pudot dengan rasa yang memikat, tekstur lembut,
            dan tampilan yang selalu bikin jatuh hati. Dibuat fresh setiap hari untuk momen manis kamu di Bali.
          </p>

          {/* Action Buttons - Stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onExploreCatalog}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#D94D82] hover:bg-[#c23e71] text-white text-sm sm:text-base font-semibold shadow-md transition-all hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82]"
            >
              Lihat Katalog
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              onClick={onPreOrderClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-[#D94D82] bg-white/95 hover:bg-white text-[#D94D82] hover:text-[#c23e71] text-sm sm:text-base font-semibold transition-all shadow-xs active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82]"
            >
              <MessageCircle className="w-4 h-4 fill-[#D94D82] shrink-0" />
              Pre-Order Sekarang
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#4A211D]/80">
            <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#F4A7C4]/30 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Fresh Batch Bali</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#F4A7C4]/30 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D94D82] shrink-0" />
              <span>Kenyal &amp; Lumer</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#F4A7C4]/30 shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-[#D94D82] fill-[#D94D82] shrink-0" />
              <span>Kemasan Estetik</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars strip below hero content with frosted glass styling */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-10 sm:mt-16">
        <div className="pt-5 border-t border-[#F4A7C4]/40 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#F4A7C4]/30 flex items-center gap-3.5 shadow-xs hover:border-[#D94D82]/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F9DCE5] flex items-center justify-center text-[#D94D82] shrink-0">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#D94D82]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-['Playfair_Display'] font-bold text-sm sm:text-base text-[#4A211D] truncate">
                Rasa yang bervariasi
              </h3>
              <p className="text-xs text-[#4A211D]/70 mt-0.5 line-clamp-2 sm:line-clamp-none">
                Pilihan mochi dan pudot yang memanjakan lidah.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#F4A7C4]/30 flex items-center gap-3.5 shadow-xs hover:border-[#D94D82]/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F9DCE5] flex items-center justify-center text-[#D94D82] shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D94D82]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-['Playfair_Display'] font-bold text-sm sm:text-base text-[#4A211D] truncate">
                Tekstur lembut
              </h3>
              <p className="text-xs text-[#4A211D]/70 mt-0.5 line-clamp-2 sm:line-clamp-none">
                Mochi kenyal dengan isian lumer di setiap gigitan.
              </p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#F4A7C4]/30 flex items-center gap-3.5 shadow-xs hover:border-[#D94D82]/40 transition-colors">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#F9DCE5] flex items-center justify-center text-[#D94D82] shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#D94D82]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-['Playfair_Display'] font-bold text-sm sm:text-base text-[#4A211D] truncate">
                Kemasan menarik
              </h3>
              <p className="text-xs text-[#4A211D]/70 mt-0.5 line-clamp-2 sm:line-clamp-none">
                Kemasan estetik dan higienis siap dinikmati atau dibagikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

