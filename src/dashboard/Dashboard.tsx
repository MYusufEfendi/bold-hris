import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Clock, CalendarDays, Wallet, BarChart3, FileText,
  Menu, X, Bell, Search, LogOut, ChevronRight, Sparkles,
} from 'lucide-react';
import Overview from './Overview';
import Karyawan from './Karyawan';
import Absensi from './Absensi';
import Cuti from './Cuti';
import Payroll from './Payroll';
import Analitik from './Analitik';
import Performance from './Performance';

interface DashboardProps {
  userName: string;
  onLogout: () => void;
}

const menu = [
  { id: 'overview', label: 'Overview', desc: 'Ringkasan HR', icon: LayoutDashboard },
  { id: 'karyawan', label: 'Karyawan', desc: 'Data & organisasi', icon: Users },
  { id: 'absensi', label: 'Absensi', desc: 'Kehadiran harian', icon: Clock },
  { id: 'cuti', label: 'Cuti & Izin', desc: 'Approval & saldo', icon: CalendarDays },
  { id: 'payroll', label: 'Payroll', desc: 'Gaji & slip', icon: Wallet },
  { id: 'analitik', label: 'Analitik', desc: 'Insight & laporan', icon: BarChart3 },
  { id: 'performance', label: 'Performance', desc: 'KPI, OKR, 360°', icon: FileText },
];

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topQuery, setTopQuery] = useState('');

  const go = (id: string) => {
    const normalized = id === 'leave' ? 'cuti' : id;
    setActive(normalized);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeItem = menu.find(m => m.id === active) ?? menu[0];

  return (
    <div className="min-h-screen relative">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[560px] h-[560px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[520px] h-[520px] rounded-full bg-secondary/10 blur-[130px]" />
        <div className="absolute top-[45%] left-[35%] w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 z-40 h-screen w-[280px] flex-shrink-0 flex flex-col border-r border-border bg-background/90 lg:bg-surface/60 backdrop-blur-xl transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Brand */}
          <div className="h-16 flex items-center gap-2.5 px-5 border-b border-border flex-shrink-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
              <Users className="w-5 h-5 text-white" />
            </span>
            <div className="flex-1">
              <p className="text-white font-bold leading-none">HRIA</p>
              <p className="text-textSecondary text-[11px] mt-0.5">HRIS · Enterprise</p>
            </div>
            <button
              className="lg:hidden text-textSecondary hover:text-white p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User mini */}
          <div className="p-4 flex-shrink-0">
            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-surface to-primary/10 p-4 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {(userName?.[0] ?? 'U').toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-semibold truncate">{userName || 'Admin HR'}</p>
                <p className="text-textSecondary text-xs truncate flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> HR Admin
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            <p className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-textSecondary/70">
              Menu Utama
            </p>
            {menu.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30 text-white'
                      : 'text-textSecondary hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25'
                        : 'bg-white/5 text-textSecondary group-hover:text-primary'
                    }`}
                  >
                    <item.icon className="w-4.5 h-4.5 w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold leading-tight">{item.label}</span>
                    <span className="block text-[11px] opacity-70 truncate">{item.desc}</span>
                  </span>
                  {isActive && <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />}
                </button>
              );
            })}

            <div className="pt-4 px-3">
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <p className="text-white text-sm font-semibold mb-1">Butuh bantuan?</p>
                <p className="text-textSecondary text-xs leading-relaxed mb-3">
                  Tim support HRIA siap membantu migrasi & setup.
                </p>
                <button className="w-full py-2 rounded-xl bg-white/5 border border-border text-xs text-white hover:border-primary/40 hover:text-primary transition-colors">
                  Hubungi Support
                </button>
              </div>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border flex-shrink-0">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-error/10 border border-error/20 text-error text-sm font-medium hover:bg-error/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border">
            <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
              <button
                className="lg:hidden p-2 rounded-xl bg-surface border border-border text-textSecondary hover:text-white"
                onClick={() => setSidebarOpen(true)}
                aria-label="Buka menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-sm">
                <span className="text-textSecondary">HRIA</span>
                <ChevronRight className="w-3.5 h-3.5 text-textSecondary/60" />
                <span className="text-white font-medium">{activeItem.label}</span>
              </div>

              <div className="flex-1" />

              <div className="relative hidden md:block w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
                <input
                  value={topQuery}
                  onChange={e => setTopQuery(e.target.value)}
                  placeholder="Cari cepat... (nama, dept)"
                  className="w-full bg-surface/80 border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <button
                className="relative p-2.5 rounded-xl bg-surface border border-border text-textSecondary hover:text-white hover:border-primary/40 transition-colors"
                aria-label="Notifikasi"
              >
                <Bell className="w-4.5 h-4.5 w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-background" />
              </button>

              <div className="flex items-center gap-2.5 pl-1">
                <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  {(userName?.[0] ?? 'U').toUpperCase()}
                </span>
                <div className="hidden sm:block leading-tight">
                  <p className="text-white text-sm font-semibold max-w-[120px] truncate">{userName || 'Admin HR'}</p>
                  <p className="text-textSecondary text-[11px]">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1200px] w-full mx-auto">
            {active === 'overview' && <Overview onNavigate={go} />}
            {active === 'karyawan' && <Karyawan />}
            {active === 'absensi' && <Absensi />}
            {active === 'cuti' && <Cuti />}
            {active === 'payroll' && <Payroll />}
            {active === 'analitik' && <Analitik />}
            {active === 'performance' && <Performance />}
          </main>

          <footer className="px-6 lg:px-8 pb-6 text-center text-textSecondary/70 text-xs">
            © 2025 HRIA · Data pada dashboard ini adalah demo lokal untuk keperluan presentasi.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
