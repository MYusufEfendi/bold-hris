import React from 'react';
import {
  Users, Clock, Wallet, TrendingUp, ArrowUpRight, CalendarCheck, Sparkles, ChevronRight,
} from 'lucide-react';
import { StatCard, Card, SectionTitle, Badge, Avatar, ProgressBar } from './ui';
import type { BadgeTone } from './ui';
import { activities, headcountTrend, departmentDistribution, leaveRequests, attendance } from './data';
import { formatCompactIDR } from './format';

interface OverviewProps {
  onNavigate: (id: string) => void;
}

const kindTone: Record<string, BadgeTone> = {
  success: 'success',
  primary: 'primary',
  secondary: 'info',
  warning: 'warning',
};

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const maxHeadcount = Math.max(...headcountTrend.map(h => h.value));
  const totalDept = departmentDistribution.reduce((sum, d) => sum + d.value, 0);
  const presentToday = attendance.filter(a => a.status === 'hadir' || a.status === 'wfh' || a.status === 'terlambat').length;
  const pendingLeave = leaveRequests.filter(l => l.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Hero greeting banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-surface via-surface/80 to-primary/10 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-16 -right-10 w-56 h-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-40px] left-1/3 w-40 h-40 rounded-full bg-secondary/15 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-textSecondary mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Selamat datang kembali, Sari
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Ringkasan HR hari ini terlihat baik
            </h2>
            <p className="text-textSecondary text-sm max-w-xl">
              {presentToday} dari {attendance.length} karyawan sudah tercatat hadir, dan{' '}
              {pendingLeave} pengajuan cuti menunggu persetujuan Anda.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('leave')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2"
            >
              Review Cuti
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('payroll')}
              className="px-5 py-3 rounded-2xl bg-background/60 border border-border text-white text-sm font-medium hover:border-primary/40 transition-colors"
            >
              Payroll
            </button>
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Karyawan" value="64" delta="+6 bulan ini" icon={Users} tone="primary" />
        <StatCard label="Kehadiran Hari Ini" value={`${Math.round((presentToday / attendance.length) * 100)}%`} delta="+2,4%" icon={Clock} tone="success" />
        <StatCard label="Payroll Nov" value={formatCompactIDR(126350000)} delta="3 menunggu" deltaTone="flat" icon={Wallet} tone="secondary" />
        <StatCard label="Skor Performa" value="87,5" delta="+3,1" icon={TrendingUp} tone="accent" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Headcount bar chart */}
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Pertumbuhan Headcount"
            action={<Badge tone="primary">6 bulan terakhir</Badge>}
          />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between gap-3 h-48">
              {headcountTrend.map(point => (
                <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {point.value}
                  </span>
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-primary/40 to-primary group-hover:from-secondary/60 group-hover:to-secondary transition-all duration-500"
                      style={{ height: `${(point.value / maxHeadcount) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-textSecondary">{point.month}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Department distribution */}
        <Card>
          <SectionTitle title="Distribusi Departemen" />
          <div className="px-6 pb-6 space-y-4">
            {/* Donut simulation with stacked bar */}
            <div className="flex h-3 w-full overflow-hidden rounded-full">
              {departmentDistribution.map(d => (
                <div
                  key={d.name}
                  style={{ width: `${(d.value / totalDept) * 100}%`, backgroundColor: d.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                />
              ))}
            </div>
            <div className="space-y-3 pt-2">
              {departmentDistribution.map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/90">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </span>
                  <span className="text-textSecondary font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom row: activity + quick leave */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle
            title="Aktivitas Terbaru"
            action={
              <button className="text-xs text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors">
                Lihat semua <ChevronRight className="w-3.5 h-3.5" />
              </button>
            }
          />
          <ul className="px-6 pb-6 space-y-1">
            {activities.map(a => (
              <li key={a.id} className="flex items-start gap-3 py-3 border-b border-border/60 last:border-0">
                <div className="mt-1">
                  <span className={`block w-2 h-2 rounded-full ${
                    a.kind === 'success' ? 'bg-success' : a.kind === 'warning' ? 'bg-warning' : a.kind === 'secondary' ? 'bg-secondary' : 'bg-primary'
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/90 leading-snug">
                    <span className="font-semibold text-white">{a.actor}</span> {a.action}{' '}
                    <span className="text-primary">{a.target}</span>
                  </p>
                  <p className="text-xs text-textSecondary mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <SectionTitle
            title="Menunggu Persetujuan"
            action={<Badge tone="warning">{pendingLeave} pengajuan</Badge>}
          />
          <div className="px-6 pb-6 space-y-3">
            {leaveRequests
              .filter(l => l.status === 'pending')
              .map(l => (
                <div key={l.id} className="rounded-2xl border border-border bg-background/40 p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar initials={l.name.split(' ').map(n => n[0]).slice(0, 2).join('')} tone="secondary" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{l.name}</p>
                        <p className="text-xs text-textSecondary truncate">
                          {l.type} · {l.days} hari
                        </p>
                      </div>
                    </div>
                    <Badge tone="warning">Pending</Badge>
                  </div>
                  <p className="text-xs text-textSecondary mb-3">{l.from} — {l.to}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-xl bg-success/15 text-success text-xs font-semibold hover:bg-success/25 transition-colors inline-flex items-center justify-center gap-1.5">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      Setujui
                    </button>
                    <button className="flex-1 py-2 rounded-xl bg-surface border border-border text-textSecondary text-xs font-medium hover:text-error hover:border-error/30 transition-colors">
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            <div className="pt-2">
              <p className="text-xs text-textSecondary mb-2">Rata-rata skor performa tim</p>
              <ProgressBar value={87} tone="accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Kind reference map used for badge tone (keeps linter happy) */}
      <span className="hidden">{JSON.stringify(kindTone)}</span>
    </div>
  );
};

export default Overview;
