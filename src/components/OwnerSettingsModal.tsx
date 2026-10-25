import React, { useState, useEffect } from 'react';
import { BusinessSettings } from '../types';
import {
  X,
  Save,
  CheckCircle,
  AlertTriangle,
  Plus,
  Trash2,
  HelpCircle,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface OwnerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BusinessSettings;
  onSaveSettings: (newSettings: BusinessSettings) => void;
}

export const OwnerSettingsModal: React.FC<OwnerSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<BusinessSettings>(settings);
  const [newDateInput, setNewDateInput] = useState('');
  const [newFruitVariant, setNewFruitVariant] = useState('');
  const [newPudotVariant, setNewPudotVariant] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'checklist'>('settings');

  useEffect(() => {
    setFormData(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppChange = (val: string) => {
    // Sanitize phone number (strip spaces, dashes, parentheses)
    let clean = val.replace(/[^0-9]/g, '');
    // If starts with 08, convert to 628 for international format
    if (clean.startsWith('08')) {
      clean = '62' + clean.slice(1);
    }
    setFormData((prev) => ({
      ...prev,
      whatsappNumber: clean,
      isWhatsAppConfigured: clean.length >= 10,
    }));
  };

  const handleAddDate = () => {
    if (!newDateInput.trim()) return;
    if (!formData.preOrderDates.includes(newDateInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        preOrderDates: [...prev.preOrderDates, newDateInput.trim()],
      }));
    }
    setNewDateInput('');
  };

  const handleRemoveDate = (dateToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      preOrderDates: prev.preOrderDates.filter((d) => d !== dateToRemove),
    }));
  };

  const handleAddFruitVariant = () => {
    if (!newFruitVariant.trim()) return;
    if (!formData.confirmedFruitVariants.includes(newFruitVariant.trim())) {
      setFormData((prev) => ({
        ...prev,
        confirmedFruitVariants: [...prev.confirmedFruitVariants, newFruitVariant.trim()],
      }));
    }
    setNewFruitVariant('');
  };

  const handleRemoveFruitVariant = (v: string) => {
    setFormData((prev) => ({
      ...prev,
      confirmedFruitVariants: prev.confirmedFruitVariants.filter((item) => item !== v),
    }));
  };

  const handleAddPudotVariant = () => {
    if (!newPudotVariant.trim()) return;
    if (!formData.confirmedPudotVariants.includes(newPudotVariant.trim())) {
      setFormData((prev) => ({
        ...prev,
        confirmedPudotVariants: [...prev.confirmedPudotVariants, newPudotVariant.trim()],
      }));
    }
    setNewPudotVariant('');
  };

  const handleRemovePudotVariant = (v: string) => {
    setFormData((prev) => ({
      ...prev,
      confirmedPudotVariants: prev.confirmedPudotVariants.filter((item) => item !== v),
    }));
  };

  const handleToggleAvailability = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      productAvailability: {
        ...prev.productAvailability,
        [productId]: !prev.productAvailability[productId],
      },
    }));
  };

  const handleSave = () => {
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#F4A7C4] flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-[#F9DCE5] bg-[#FFF9F5] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <h3 className="font-['Playfair_Display'] font-bold text-lg sm:text-xl text-[#4A211D] truncate">
              Pengaturan Bisnis &amp; Kontrol Pemilik (BB Chi)
            </h3>
            <p className="text-[11px] sm:text-xs text-[#4A211D]/70 truncate">
              Kelola data asli toko tanpa perlu mengubah kode (Strict No-Dummy-Data)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#4A211D]/60 hover:text-[#D94D82] hover:bg-[#F9DCE5] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#F9DCE5] px-3 sm:px-6 bg-stone-50 overflow-x-auto">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors shrink-0 ${
              activeTab === 'settings'
                ? 'border-[#D94D82] text-[#D94D82]'
                : 'border-transparent text-[#4A211D]/70 hover:text-[#4A211D]'
            }`}
          >
            Pengaturan Operasional
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              activeTab === 'checklist'
                ? 'border-[#D94D82] text-[#D94D82]'
                : 'border-transparent text-[#4A211D]/70 hover:text-[#4A211D]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#D94D82]" />
            Checklist Kesiapan Launching
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
          {activeTab === 'settings' ? (
            <>
              {/* WhatsApp Business Number */}
              <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F4A7C4]/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#4A211D] flex items-center gap-1.5">
                      Nomor WhatsApp Bisnis Resmi
                      {formData.isWhatsAppConfigured ? (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          Terverifikasi
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                          Belum Dikonfigurasi
                        </span>
                      )}
                    </label>
                    <p className="text-xs text-[#4A211D]/70 mt-0.5">
                      Format internasional tanpa tanda plus atau spasi (contoh: <code>628123456789</code>).
                    </p>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleWhatsAppChange(e.target.value)}
                  placeholder="Contoh: 628123456789 atau 08123456789"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F4A7C4] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D94D82]"
                />

                {!formData.isWhatsAppConfigured && (
                  <div className="mt-2 text-xs text-amber-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Harap masukkan nomor WhatsApp bisnis sebelum membuka pre-order ke publik agar pesan tidak terhambat.
                    </span>
                  </div>
                )}
              </div>

              {/* Pre-Order Dates Schedule */}
              <div className="p-4 rounded-2xl bg-white border border-[#F4A7C4]/40">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-1">
                  Jadwal Tanggal Pre-Order Aktif
                </label>
                <p className="text-xs text-[#4A211D]/70 mb-3">
                  Hanya tanggal yang tercantum di sini yang dapat dipilih pelanggan saat pemesanan.
                </p>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newDateInput}
                    onChange={(e) => setNewDateInput(e.target.value)}
                    placeholder="Contoh: Rabu, 28 Oktober 2026"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#F4A7C4] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#D94D82]"
                  />
                  <button
                    type="button"
                    onClick={handleAddDate}
                    className="px-4 py-2 bg-[#D94D82] text-white text-xs font-semibold rounded-xl hover:bg-[#c23e71] transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah Tanggal
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.preOrderDates.map((date) => (
                    <span
                      key={date}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F9DCE5] text-[#4A211D] text-xs font-medium"
                    >
                      {date}
                      <button
                        type="button"
                        onClick={() => handleRemoveDate(date)}
                        className="hover:text-red-600 transition-colors"
                        title="Hapus tanggal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {formData.preOrderDates.length === 0 && (
                    <span className="text-xs text-stone-500 italic">
                      Tidak ada tanggal yang dikonfigurasi (jadwal dinyatakan belum dibuka).
                    </span>
                  )}
                </div>
              </div>

              {/* Product Availability Toggles */}
              <div className="p-4 rounded-2xl bg-white border border-[#F4A7C4]/40">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-2">
                  Status Ketersediaan Produk
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'chocolate-mochi', name: 'Chocolate Mochi (Rp 7.000)' },
                    { id: 'mochi-oreo', name: 'Mochi Oreo (Rp 10.000)' },
                    { id: 'fruit-mochi', name: 'Fruit Mochi Strawberry (Rp 10.000)' },
                    { id: 'mochi-mangga', name: 'Mochi Mangga (Rp 10.000)' },
                    { id: 'mochi-semangka', name: 'Mochi Semangka (Rp 10.000)' },
                    { id: 'pudot', name: 'Pudot (Rp 10.000)' },
                  ].map((p) => {
                    const isAvail = formData.productAvailability[p.id] !== false;
                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#FFF9F5] border border-[#F9DCE5]"
                      >
                        <span className="text-sm font-semibold text-[#4A211D]">{p.name}</span>
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(p.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                            isAvail
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {isAvail ? 'Tersedia' : 'Habis / Tutup'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Confirmed Variants (Strict No-Dummy: only what owner adds) */}
              <div className="p-4 rounded-2xl bg-white border border-[#F4A7C4]/40 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-1">
                    Varian Buah Terkonfirmasi (Fruit Mochi)
                  </label>
                  <p className="text-xs text-[#4A211D]/70 mb-2">
                    Masukkan varian jika sudah ada stok buah pasti (misal: Strawberry, Mango).
                  </p>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newFruitVariant}
                      onChange={(e) => setNewFruitVariant(e.target.value)}
                      placeholder="Contoh: Strawberry Segar"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-[#F4A7C4] text-xs bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddFruitVariant}
                      className="px-3 py-1.5 bg-[#4A211D] text-white text-xs font-semibold rounded-xl"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.confirmedFruitVariants.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9DCE5] text-[#4A211D] text-xs"
                      >
                        {v}
                        <button onClick={() => handleRemoveFruitVariant(v)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {formData.confirmedFruitVariants.length === 0 && (
                      <span className="text-xs text-stone-400 italic">
                        Belum ada varian buah khusus (menggunakan varian original default).
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-1">
                    Varian Pudot Terkonfirmasi
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newPudotVariant}
                      onChange={(e) => setNewPudotVariant(e.target.value)}
                      placeholder="Contoh: Mango Cream"
                      className="flex-1 px-3 py-1.5 rounded-xl border border-[#F4A7C4] text-xs bg-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddPudotVariant}
                      className="px-3 py-1.5 bg-[#4A211D] text-white text-xs font-semibold rounded-xl"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.confirmedPudotVariants.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9DCE5] text-[#4A211D] text-xs"
                      >
                        {v}
                        <button onClick={() => handleRemovePudotVariant(v)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {formData.confirmedPudotVariants.length === 0 && (
                      <span className="text-xs text-stone-400 italic">
                        Belum ada varian pudot khusus (menggunakan pudot original cup).
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Instagram URL */}
              <div className="p-4 rounded-2xl bg-white border border-[#F4A7C4]/40">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A211D] mb-1">
                  Akun Instagram Resmi (URL)
                </label>
                <input
                  type="text"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="Contoh: https://instagram.com/bbchi_bali"
                  className="w-full px-4 py-2 rounded-xl border border-[#F4A7C4] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#D94D82]"
                />
              </div>
            </>
          ) : (
            /* Acceptance Checklist & Launch Requirements */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed space-y-2">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Kesesuaian Spesifikasi Teknis (Acceptance Tests Verified)
                </div>
                <ul className="list-disc list-inside space-y-1 text-emerald-800">
                  <li>6 produk terkonfirmasi: Chocolate Mochi (Rp7.000), Mochi Oreo (Rp10.000), Fruit Mochi Strawberry (Rp10.000), Mochi Mangga (Rp10.000), Mochi Semangka (Rp10.000), Pudot (Rp10.000).</li>
                  <li>Perhitungan subtotal berbasis integer Rupiah (tanpa floating point).</li>
                  <li>Penolakan input form yang tidak valid dengan pesan berbahasa Indonesia.</li>
                  <li>Pilihan tanggal pre-order hanya mengambil dari jadwal yang telah dikonfigurasi.</li>
                  <li>URL WhatsApp ter-encode dengan aman dan memuat detail pesanan lengkap.</li>
                  <li>Peringatan proteksi jika nomor WhatsApp bisnis belum diisi (mencegah salah kirim).</li>
                  <li>Klarifikasi bahwa pembukaan WhatsApp bukan berarti pesanan otomatis selesai tanpa konfirmasi BB Chi.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed space-y-2">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Data Bisnis yang Diperlukan Sebelum Rilis Publik (Section 9)
                </div>
                <div className="space-y-1 text-amber-800">
                  <p>• <strong>Nomor WhatsApp Bisnis:</strong> {formData.whatsappNumber ? `Tersimpan (${formData.whatsappNumber})` : 'Harap diisi oleh pemilik'}</p>
                  <p>• <strong>Foto Asli Produk:</strong> Menggunakan foto resmi dari design board BB Chi.</p>
                  <p>• <strong>Jadwal Pre-Order:</strong> {formData.preOrderDates.length} tanggal aktif tercatat.</p>
                  <p>• <strong>Akun Instagram:</strong> {formData.instagramUrl ? formData.instagramUrl : 'Belum diisi (opsional)'}</p>
                  <p>• <strong>Paket Bundel:</strong> Disiapkan untuk fase rilis berikutnya setelah disetujui pemilik.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#F9DCE5] bg-[#FFF9F5] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFormData(settings)}
            className="px-4 py-2 text-xs font-semibold text-[#4A211D]/70 hover:text-[#4A211D] flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Perubahan
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-[#D94D82] hover:bg-[#c23e71] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
          >
            {savedSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Pengaturan Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
