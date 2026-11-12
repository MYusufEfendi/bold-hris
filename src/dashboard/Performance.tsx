import React, { useMemo, useState } from 'react';
import { Award, Target, PlayCircle, Clock3, Search, Plus, Star, TrendingUp } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Avatar, TableWrap, Th, Td, SectionTitle, ProgressBar } from './ui';
import type { BadgeTone } from './ui';
import { reviews } from './data';
import type { ReviewStatus } from './data';

const statusTone: Record<ReviewStatus, BadgeTone> = {
  selesai: 'success',
  berjalan: 'info',
  belum: 'warning',
};

const statusLabel: Record<ReviewStatus, string> = {
  selesai: 'Selesai',
  berjalan: 'Berjalan',
  belum: 'Belum mulai',
};

const Performance: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'semua' | ReviewStatus>('semua');

  const rows = useMemo(
    () =>
      reviews.filter(r => {
        const q = query.toLowerCase();
        const match = r.name.toLowerCase().includes(q) || r.department.toLowerCase().includes(q);
        return match && (filter === 'semua' || r.status === filter);
      }),
    [query, filter],
  );

  const avg = Math.round(reviews.reduce((s, r) => s + r.score, 0) / reviews.length);
  const done = reviews.filter(r => r.status === 'selesai').length;
  const running = reviews.filter(r => r.status === 'berjalan').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Review"
        subtitle="KPI, OKR, dan evaluasi 360° untuk membantu tim tumbuh lebih cepat dan terukur."
      >
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Siklus Baru
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Rata-rata Skor" value={`${avg}`} delta="+3,1" icon={Award} tone="accent" />
        <StatCard label="Review Selesai" value={`${done}`} delta="Q4 2025" deltaTone="flat" icon={Target} tone="success" />
        <StatCard label="Sedang Berjalan" value={`${running}`} icon={PlayCircle} tone="primary" />
        <StatCard label="Butuh Perhatian" value="1" delta="skor < 75" deltaTone="flat" icon={Clock3} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari nama atau departemen..."
                className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              {(['semua', 'selesai', 'berjalan', 'belum'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    filter === f
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'bg-background/60 text-textSecondary border border-border hover:text-white'
                  }`}
                >
                  {f === 'semua' ? 'Semua' : statusLabel[f]}
                </button>
              ))}
            </div>
          </div>

          <TableWrap>
            <thead className="border-b border-border">
              <tr>
                <Th>Karyawan</Th>
                <Th>Skor</Th>
                <Th>KPI / OKR</Th>
                <Th>Reviewer</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-surface/80 transition-colors">
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar initials={r.name.split(' ').map(n => n[0]).slice(0, 2).join('')} tone="accent" />
                      <div>
                        <p className="font-medium text-white">{r.name}</p>
                        <p className="text-xs text-textSecondary">{r.department} · {r.id}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <span className={`inline-flex items-center gap-1 text-sm font-bold ${r.score >= 90 ? 'text-success' : r.score >= 80 ? 'text-primary' : 'text-warning'}`}>
                      <Star className="w-3.5 h-3.5" />
                      {r.score}
                    </span>
                  </Td>
                  <Td className="min-w-[180px]">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-textSecondary w-8">KPI</span>
                        <div className="flex-1"><ProgressBar value={r.kpi} tone="secondary" /></div>
                        <span className="text-[11px] text-white w-7 text-right">{r.kpi}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-textSecondary w-8">OKR</span>
                        <div className="flex-1"><ProgressBar value={r.okr} tone="accent" /></div>
                        <span className="text-[11px] text-white w-7 text-right">{r.okr}</span>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-textSecondary text-[13px]">{r.reviewer}</Td>
                  <Td>
                    <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          {rows.length === 0 && (
            <div className="py-14 text-center text-textSecondary text-sm">Tidak ada review pada filter ini.</div>
          )}
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="Top Performer Q4" />
            <div className="px-6 pb-6 space-y-3">
              {[...reviews].sort((a, b) => b.score - a.score).slice(0, 3).map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-border">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-warning/15 text-warning' : i === 1 ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary'
                  }`}>
                    {i + 1}
                  </span>
                  <Avatar initials={r.name.split(' ').map(n => n[0]).slice(0, 2).join('')} tone={i === 0 ? 'accent' : 'primary'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                    <p className="text-xs text-textSecondary">{r.department}</p>
                  </div>
                  <span className="text-sm font-bold text-white">{r.score}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-surface to-primary/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </span>
              <h3 className="text-white font-semibold">Siklus Q4 2025</h3>
            </div>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-textSecondary">Progres peninjauan</span>
              <span className="text-white font-medium">{done}/{reviews.length} selesai</span>
            </div>
            <ProgressBar value={(done / reviews.length) * 100} tone="primary" />
            <p className="text-textSecondary text-xs mt-3 leading-relaxed">
              Batas akhir pengisian self-assessment: 30 Nov 2025. 1 review belum dimulai.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Performance;
