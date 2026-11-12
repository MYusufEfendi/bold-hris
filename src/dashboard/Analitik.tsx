import React, { useState } from 'react';
import { BarChart3, TrendingDown, TrendingUp, Users, Download, Lightbulb, ArrowUpRight } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, SectionTitle, ProgressBar } from './ui';
import { headcountTrend, departmentDistribution, attendanceWeekly, employees } from './data';

const turnoverMonthly = [
  { month: 'Jun', value: 6.1 },
  { month: 'Jul', value: 5.4 },
  { month: 'Agu', value: 4.8 },
  { month: 'Sep', value: 5.2 },
  { month: 'Okt', value: 4.5 },
  { month: 'Nov', value: 4.2 },
];

const productivityByDept = [
  { name: 'Engineering', score: 88 },
  { name: 'Product', score: 91 },
  { name: 'People', score: 89 },
  { name: 'Operations', score: 85 },
  { name: 'Finance', score: 82 },
];

const Analitik: React.FC = () => {
  const [range, setRange] = useState('6 bulan');
  const maxTurnover = Math.max(...turnoverMonthly.map(t => t.value));
  const avgPerf = Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analitik HR"
        subtitle="Visualisasi turnover, headcount, produktivitas, dan laporan siap ekspor untuk direksi."
      >
        <div className="flex items-center gap-2">
          {['3 bulan', '6 bulan', '1 tahun'].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                range === r
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-surface border border-border text-textSecondary hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Ekspor Laporan
          </button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Turnover Rate" value="4,2%" delta="-0,3%" deltaTone="down" icon={TrendingDown} tone="success" />
        <StatCard label="Headcount Growth" value="+52%" delta="+6 orang" icon={Users} tone="primary" />
        <StatCard label="Produktivitas" value={`${avgPerf}`} delta="+3,1" icon={TrendingUp} tone="accent" />
        <StatCard label="Cost per Hire" value="Rp 4,2 jt" delta="-12%" deltaTone="down" icon={BarChart3} tone="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Tren Turnover" action={<Badge tone="success">Menurun</Badge>} />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between gap-3 h-44">
              {turnoverMonthly.map(t => (
                <div key={t.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.value.toFixed(1)}%
                  </span>
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-success/30 to-success group-hover:from-success/60 group-hover:to-success transition-all"
                      style={{ height: `${(t.value / maxTurnover) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-textSecondary">{t.month}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-textSecondary mt-4 pt-4 border-t border-border leading-relaxed">
              Turnover turun 1,9 poin sejak Juni berkat program retensi & review gaji Engineering.
            </p>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Headcount vs Target" action={<Badge tone="primary">Target 70</Badge>} />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between gap-3 h-44">
              {headcountTrend.map(h => (
                <div key={h.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {h.value}
                  </span>
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className="w-full max-w-[42px] rounded-t-xl bg-gradient-to-t from-primary/40 to-secondary group-hover:from-primary group-hover:to-secondary transition-all"
                      style={{ height: `${(h.value / 70) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-textSecondary">{h.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-textSecondary">Pencapaian headcount ({range})</span>
                <span className="text-white font-semibold">64 / 70</span>
              </div>
              <ProgressBar value={(64 / 70) * 100} tone="primary" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle title="Kehadiran Mingguan (orang)" />
          <div className="px-6 pb-6 space-y-3">
            {attendanceWeekly.map(w => {
              const total = w.hadir + w.terlambat + w.absen;
              return (
                <div key={w.day} className="flex items-center gap-3">
                  <span className="w-8 text-xs text-textSecondary">{w.day}</span>
                  <div className="flex-1 flex h-7 rounded-xl overflow-hidden bg-background">
                    <div className="bg-success/80" style={{ width: `${(w.hadir / total) * 100}%` }} />
                    <div className="bg-warning/80" style={{ width: `${(w.terlambat / total) * 100}%` }} />
                    <div className="bg-error/70" style={{ width: `${(w.absen / total) * 100}%` }} />
                  </div>
                  <span className="w-10 text-right text-xs text-white font-medium">{total}</span>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-4 text-xs text-textSecondary pt-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-success" /> Hadir</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning" /> Terlambat</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-error" /> Absen</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Produktivitas per Dept" />
          <div className="px-6 pb-6 space-y-4">
            {productivityByDept.map(d => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/90">{d.name}</span>
                  <span className="text-white font-semibold">{d.score}</span>
                </div>
                <ProgressBar value={d.score} tone={d.score >= 89 ? 'success' : d.score >= 85 ? 'primary' : 'warning'} />
              </div>
            ))}
            <div className="rounded-2xl bg-background/50 border border-border p-4 mt-2">
              <p className="text-xs text-textSecondary mb-1">Komposisi terbesar</p>
              <p className="text-sm text-white font-semibold">
                {departmentDistribution[0].name} · {departmentDistribution[0].value} orang
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-surface to-secondary/10 border-secondary/20">
        <div className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </span>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Insight Otomatis HRIA</h3>
            <p className="text-textSecondary text-sm leading-relaxed mb-3">
              Keterlambatan naik tiap Jumat (+8 orang). Pertimbangkan flexible Friday atau shuttle tambahan.
              Finance memiliki skor produktivitas terendah (82) — jadwalkan 1-on-1 dalam 2 minggu.
            </p>
            <button className="text-sm text-secondary hover:text-primary font-medium inline-flex items-center gap-1 transition-colors">
              Lihat rekomendasi lengkap <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analitik;
