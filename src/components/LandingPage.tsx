import React, { useState, useCallback } from 'react';
import {
  Users, CalendarDays, Wallet, BarChart3, Clock, FileText,
  Check, ChevronDown, ArrowRight, Menu, X, Sparkles, ShieldCheck,
} from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

const features = [
  {
    icon: Users,
    title: 'Manajemen Karyawan',
    desc: 'Kelola data karyawan, struktur organisasi, dan dokumen HR dalam satu tempat yang rapi dan aman.',
  },
  {
    icon: Clock,
    title: 'Absensi & Kehadiran',
    desc: 'Check-in GPS, live attendance, dan integrasi mesin fingerprint. Rekap otomatis setiap bulan.',
  },
  {
    icon: CalendarDays,
    title: 'Cuti & Izin',
    desc: 'Pengajuan cuti berjenjang dengan approval flow yang fleksibel dan saldo cuti real-time.',
  },
  {
    icon: Wallet,
    title: 'Payroll Otomatis',
    desc: 'Hitung gaji, tunjangan, lembur, dan potongan pajak otomatis. Slip gaji digital sekali klik.',
  },
  {
    icon: BarChart3,
    title: 'Analitik HR',
    desc: 'Dashboard visual: turnover rate, headcount, productivity score, dan laporan siap ekspor.',
  },
  {
    icon: FileText,
    title: 'Performance Review',
    desc: 'KPI, OKR, dan evaluasi 360° untuk membantu tim Anda tumbuh lebih cepat dan terukur.',
  },
];

const stats = [
  { value: '500+', label: 'Perusahaan aktif' },
  { value: '120K', label: 'Karyawan terkelola' },
  { value: '99,9%', label: 'Uptime sistem' },
  { value: '4.9/5', label: 'Rating kepuasan' },
];

const testimonials = [
  {
    name: 'Sari Wulandari',
    role: 'HR Director, PT Nusantara Tech',
    content: 'Payroll yang tadinya butuh 3 hari, sekarang selesai dalam 30 menit. Sistemnya sangat intuitif, tim tidak perlu pelatihan panjang.',
    initials: 'SW',
  },
  {
    name: 'Andi Prasetyo',
    role: 'COO, Kreatif Media Group',
    content: 'Rekrutmen, absensi, sampai performance review semua ada di satu dashboard. Investasi terbaik untuk efisiensi HR kami.',
    initials: 'AP',
  },
  {
    name: 'Maya Kusuma',
    role: 'HR Manager, Ritel Sejahtera',
    content: 'Dengan 2.000+ karyawan di 40 cabang, HRIA mengelola semuanya tanpa hambatan. Support-nya juga sangat responsif.',
    initials: 'MK',
  },
];

const plans = [
  {
    name: 'Starter',
    price: 'Rp 49rb',
    per: '/karyawan/bulan',
    desc: 'Untuk tim kecil yang baru mulai digitalisasi HR.',
    features: ['Manajemen data karyawan', 'Absensi & cuti dasar', 'Rekap kehadiran bulanan', 'Email support'],
    cta: 'Mulai Gratis',
    highlight: false,
  },
  {
    name: 'Business',
    price: 'Rp 89rb',
    per: '/karyawan/bulan',
    desc: 'Paling populer untuk perusahaan menengah yang berkembang.',
    features: ['Semua fitur Starter', 'Payroll otomatis & slip gaji', 'Alur approval multi-level', 'Analitik HR lanjutan', 'Priority support'],
    cta: 'Coba 14 Hari',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Kustom',
    per: '',
    desc: 'Untuk korporasi besar dengan kebutuhan integrasi kompleks.',
    features: ['Semua fitur Business', 'Integrasi API & ERP', 'SSO & audit log', 'Dedicated account manager', 'SLA 99,9%'],
    cta: 'Hubungi Sales',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'Berapa lama proses implementasi HRIA?',
    a: 'Rata-rata perusahaan kami berjalan penuh dalam 2–4 minggu, termasuk migrasi data karyawan dan pelatihan tim HR Anda.',
  },
  {
    q: 'Apakah data karyawan kami aman?',
    a: 'Ya. Kami menggunakan enkripsi AES-256, hosting sesuai standar ISO 27001, dan backup otomatis harian. Data Anda hanya milik Anda.',
  },
  {
    q: 'Bisakah HRIA diintegrasikan dengan sistem lain?',
    a: 'Tentu. Kami menyediakan REST API dan integrasi siap pakai untuk ERP, akuntansi, serta mesin absensi fingerprint populer.',
  },
  {
    q: 'Apakah ada biaya setup atau kontrak minimum?',
    a: 'Tidak ada biaya setup untuk paket Starter dan Business, dan Anda bisa berhenti kapan saja tanpa penalti.',
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = useCallback((idx: number) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  }, []);

  const navLinks = [
    { label: 'Fitur', href: '#fitur' },
    { label: 'Harga', href: '#harga' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-secondary/10 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-[50%] left-[30%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
              <Users className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg font-bold text-white tracking-tight">HRIA</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-textSecondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={onLogin}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
            >
              Masuk
            </button>
          </div>

          <button
            className="md:hidden text-textSecondary hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 border-t border-border bg-background/95">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-textSecondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onLogin(); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold"
            >
              Masuk
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-border text-sm text-textSecondary mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            Sistem HRIS #1 pilihan perusahaan Indonesia
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Kelola SDM Lebih{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Cerdas & Cepat
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-textSecondary max-w-2xl mx-auto mb-10">
            HRIA menyatukan data karyawan, absensi, payroll, dan performa tim dalam satu platform —
            bebas ribet, hemat waktu, dan siap berkembang bersama perusahaan Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Coba Gratis Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#fitur"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-surface/80 border border-border text-white font-medium hover:border-primary/40 hover:text-primary transition-all"
            >
              Lihat Fitur
            </a>
          </div>

          <p className="mt-4 text-sm text-textSecondary flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            Gratis 14 hari · Tanpa kartu kredit · Batalkan kapan saja
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface/60 backdrop-blur-xl rounded-3xl p-6 border border-border text-center hover:border-primary/30 transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                {stat.value}
              </p>
              <p className="text-textSecondary text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="fitur" className="relative z-10 px-4 sm:px-6 pb-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Semua Kebutuhan HR,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Satu Platform
              </span>
            </h2>
            <p className="text-textSecondary max-w-xl mx-auto">
              Berhenti mencatat di Excel yang berhamburan. HRIA merapikan seluruh alur kerja HR Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-surface/60 backdrop-blur-xl rounded-3xl p-6 border border-border hover:border-primary/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-textSecondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimoni" className="relative z-10 px-4 sm:px-6 pb-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Dipercaya Ratusan{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Perusahaan
              </span>
            </h2>
            <p className="text-textSecondary">Dari startup hingga korporasi — inilah cerita mereka.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="bg-surface/60 backdrop-blur-xl rounded-3xl p-6 border border-border hover:border-secondary/40 transition-colors"
              >
                <div className="flex gap-1 mb-4 text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="text-white/90 text-sm leading-relaxed mb-6">
                  “{t.content}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-textSecondary text-xs">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="relative z-10 px-4 sm:px-6 pb-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Harga Transparan,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Tanpa Kejutan
              </span>
            </h2>
            <p className="text-textSecondary">Mulai gratis, upgrade saat tim Anda bertumbuh.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all hover:-translate-y-1 ${
                  plan.highlight
                    ? 'bg-surface/80 border-primary/50 shadow-2xl shadow-primary/10 lg:scale-105'
                    : 'bg-surface/60 border-border'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold">
                    Paling Populer
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-textSecondary text-sm">{plan.per}</span>
                </div>
                <p className="text-textSecondary text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onLogin}
                  className={`w-full py-3.5 rounded-2xl font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25'
                      : 'bg-background border border-border text-white hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 px-4 sm:px-6 pb-24 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pertanyaan yang{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Sering Diajukan
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-surface/60 backdrop-blur-xl rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-surface/80 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-textSecondary flex-shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="px-6 pb-5 text-textSecondary text-sm leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 sm:p-14 text-center border border-primary/30 bg-gradient-to-br from-surface via-surface/80 to-primary/10 backdrop-blur-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Siap Mengubah Cara Kerja HR Anda?
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto mb-8">
            Bergabung dengan 500+ perusahaan yang sudah hemat waktu dan tenaga dengan HRIA.
          </p>
          <button
            onClick={onLogin}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            Mulai Gratis Sekarang
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border bg-background/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Users className="w-5 h-5 text-white" />
                </span>
                <span className="text-lg font-bold text-white">HRIA</span>
              </div>
              <p className="text-textSecondary text-sm leading-relaxed">
                Sistem HRIS modern untuk perusahaan Indonesia yang siap tumbuh lebih cepat.
              </p>
            </div>

            {[
              { title: 'Produk', links: ['Fitur', 'Harga', 'Integrasi', 'Changelog'] },
              { title: 'Perusahaan', links: ['Tentang Kami', 'Blog', 'Karier', 'Kontak'] },
              { title: 'Legal', links: ['Kebijakan Privasi', 'Syarat & Ketentuan', 'Keamanan'] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-textSecondary text-sm hover:text-primary transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border text-center text-textSecondary text-sm">
            © 2025 HRIA. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
