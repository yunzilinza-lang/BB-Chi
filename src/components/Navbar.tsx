import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Settings } from 'lucide-react';
import { BusinessSettings } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSettings: () => void;
  settings: BusinessSettings;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSettings,
  settings,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda', href: '#beranda' },
    { id: 'tentang-kami', label: 'Tentang Kami', href: '#tentang-kami' },
    { id: 'katalog', label: 'Katalog', href: '#katalog' },
    { id: 'cara-preorder', label: 'Cara Pre-Order', href: '#cara-preorder' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F4A7C4]/30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#beranda');
          }}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82] rounded-lg min-w-0"
          aria-label="BB Chi Beranda"
        >
          <img
            src="/assets/brand/bbchi-logo.png"
            alt="BB Chi Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform group-hover:scale-105 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-['Playfair_Display'] font-bold text-xl sm:text-2xl tracking-tight text-[#4A211D] leading-none truncate">
              BB Chi
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#D94D82] mt-0.5 truncate">
              TOO SWEET TO HANDLE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#4A211D]/80">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`whitespace-nowrap transition-colors py-1 relative hover:text-[#D94D82] ${
                  isActive ? 'text-[#D94D82] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D94D82] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* Owner Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="relative p-2.5 rounded-full text-[#4A211D]/70 hover:text-[#D94D82] hover:bg-[#F9DCE5]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82]"
            title="Pengaturan Bisnis BB Chi"
            aria-label="Pengaturan Bisnis"
          >
            <Settings className="w-5 h-5" />
            {!settings.isWhatsAppConfigured && (
              <span
                className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-[#FFF9F5]"
                title="Nomor WhatsApp belum dikonfigurasi"
              />
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-full text-[#4A211D] hover:bg-[#F9DCE5]/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82]"
            aria-label={`Keranjang belanja, ${cartCount} item`}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D94D82] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#katalog');
            }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#D94D82] hover:bg-[#c23e71] text-white text-sm font-semibold shadow-sm transition-all hover:shadow active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82] focus-visible:ring-offset-2"
          >
            Pesan Sekarang
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A211D] hover:text-[#D94D82] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D94D82]"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F5] border-b border-[#F4A7C4]/40 px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-[#4A211D] hover:text-[#D94D82] py-2 border-b border-[#F9DCE5]/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="#katalog"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#katalog');
                }}
                className="w-full text-center py-3 rounded-full bg-[#D94D82] text-white font-semibold text-sm shadow-sm"
              >
                Pesan Sekarang
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSettings();
                }}
                className="w-full text-center py-2.5 rounded-full border border-[#F4A7C4] text-[#4A211D] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#F9DCE5]/30"
              >
                <Settings className="w-4 h-4 text-[#D94D82]" />
                Pengaturan Bisnis
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
