import React from 'react';
import { Settings } from 'lucide-react';

interface FooterProps {
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSettings }) => {
  return (
    <footer className="bg-[#4A211D] text-white pt-16 pb-12 border-t border-[#F4A7C4]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/brand/bbchi-logo.png"
                alt="BB Chi Logo"
                className="w-14 h-14 object-contain rounded-full bg-white p-1"
              />
              <div>
                <span className="font-['Playfair_Display'] font-bold text-2xl tracking-tight text-white block">
                  BB Chi
                </span>
                <span className="text-xs font-semibold text-[#F4A7C4] tracking-widest uppercase">
                  Too Sweet to Handle
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Dessert mochi dan pudot dengan rasa yang memikat, tekstur lembut, dan tampilan yang selalu bikin jatuh hati. Dibuat di Bali dengan cinta.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#F4A7C4] uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#beranda" className="hover:text-[#F4A7C4] transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang-kami" className="hover:text-[#F4A7C4] transition-colors">
                  Tentang BB Chi
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-[#F4A7C4] transition-colors">
                  Katalog Mochi &amp; Pudot
                </a>
              </li>
              <li>
                <a href="#cara-preorder" className="hover:text-[#F4A7C4] transition-colors">
                  Cara Pre-Order
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F4A7C4] transition-colors">
                  FAQ &amp; Bantuan
                </a>
              </li>
            </ul>
          </div>

          {/* Operational Policy & Settings */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-[#F4A7C4] uppercase tracking-wider">
              Informasi Pemesanan
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Pesanan diproses secara pre-order berkala. Konfirmasi resmi dilakukan langsung melalui chat WhatsApp pemilik BB Chi.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4A7C4] hover:text-white px-3 py-1.5 rounded-lg border border-[#F4A7C4]/40 hover:border-[#F4A7C4] transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                Pengaturan Toko
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div>
            &copy; 2026 BB Chi. Too Sweet to Handle. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>BB Chi</span>
            <span className="text-[#F4A7C4]">♡</span>
            <span>Made with passion in Bali</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
