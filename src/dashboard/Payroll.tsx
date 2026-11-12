import React, { useMemo, useState } from 'react';
import { Wallet, CheckCircle2, Clock, TrendingUp, Download, Play, Receipt, Search, ShieldCheck } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Avatar, TableWrap, Th, Td, SectionTitle } from './ui';
import { payroll } from './data';
import type { PayrollItem } from './data';
import { formatIDR, formatCompactIDR } from './format';

const netOf = (p: PayrollItem) => p.baseSalary + p.allowance + p.overtime - p.deduction;

const Payroll: React.FC = () => {
  const [items, setItems] = useState<PayrollItem[]>(payroll);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'semua' | 'dibayar' | 'menunggu'>('semua');
  const [slip, setSlip] = useState<PayrollItem | null>(null);
  const [running, setRunning] = useState(false);
  const [paidAll, setPaidAll] = useState(false);

  const rows = useMemo(
    () =>
      items.filter(p => {
        const q = query.toLowerCase();
        const matchQuery = p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q);
        const matchFilter = filter === 'semua' || p.status === filter;
        return matchQuery && matchFilter;
      }),
    [items, query, filter],
  );

  const totalNet = items.reduce((s, p) => s + netOf(p), 0);
  const paidNet = items.filter(p => p.status === 'dibayar').reduce((s, p) => s + netOf(p), 0);
  const pendingNet = totalNet - paidNet;
  const pendingCount = items.filter(p => p.status === 'menunggu').length;

  const runPayroll = () => {
    setRunning(true);
    setTimeout(() => {
      setItems(prev => prev.map(p => ({ ...p, status: 'dibayar' as const })));
      setRunning(false);
      setPaidAll(true);
      setTimeout(() => setPaidAll(false), 4000);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll Otomatis"
        subtitle="Hitung gaji, tunjangan, lembur, dan potongan pajak otomatis. Slip gaji digital sekali klik."
      >
        <button className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-white hover:border-primary/40 transition-colors inline-flex items-center gap-2">
          <Download className="w-4 h-4" />
          Ekspor Slip
        </button>
        <button
          onClick={runPayroll}
          disabled={running || pendingCount === 0}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {running ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Jalankan Payroll
            </>
          )}
        </button>
      </PageHeader>

      {paidAll && (
        <div className="p-4 rounded-2xl bg-success/10 border border-success/20 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
          <p className="text-sm text-success">Payroll periode November 2025 berhasil dibayarkan ke {items.length} karyawan.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Payroll (Net)" value={formatCompactIDR(totalNet)} delta="+4,2%" icon={Wallet} tone="primary" />
        <StatCard label="Sudah Dibayar" value={formatCompactIDR(paidNet)} icon={CheckCircle2} tone="success" />
        <StatCard label="Menunggu" value={formatCompactIDR(pendingNet)} delta={`${pendingCount} orang`} deltaTone="flat" icon={Clock} tone="warning" />
        <StatCard label="Rata-rata Gaji" value={formatCompactIDR(Math.round(totalNet / items.length))} icon={TrendingUp} tone="secondary" />
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
              {(['semua', 'dibayar', 'menunggu'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                    filter === f
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'bg-background/60 text-textSecondary border border-border hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <TableWrap>
            <thead className="border-b border-border">
              <tr>
                <Th>Karyawan</Th>
                <Th className="text-right">Gaji Pokok</Th>
                <Th className="text-right">Tunj. + Lembur</Th>
                <Th className="text-right">Potongan</Th>
                <Th className="text-right">Take-home</Th>
                <Th>Status</Th>
                <Th className="text-right">Slip</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-surface/80 transition-colors">
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar initials={p.name.split(' ').map(n => n[0]).slice(0, 2).join('')} tone="primary" />
                      <div>
                        <p className="font-medium text-white">{p.name}</p>
                        <p className="text-xs text-textSecondary">{p.department} · {p.id}</p>
                      </div>
                    </div>
                  </Td>
                  <Td className="text-right text-textSecondary">{formatCompactIDR(p.baseSalary)}</Td>
                  <Td className="text-right text-textSecondary">{formatCompactIDR(p.allowance + p.overtime)}</Td>
                  <Td className="text-right text-error/90">-{formatCompactIDR(p.deduction)}</Td>
                  <Td className="text-right font-semibold text-white">{formatCompactIDR(netOf(p))}</Td>
                  <Td>
                    <Badge tone={p.status === 'dibayar' ? 'success' : 'warning'}>
                      {p.status === 'dibayar' ? 'Dibayar' : 'Menunggu'}
                    </Badge>
                  </Td>
                  <Td className="text-right">
                    <button
                      onClick={() => setSlip(p)}
                      className="p-2 rounded-lg bg-surface border border-border text-textSecondary hover:text-primary hover:border-primary/40 transition-colors"
                      title="Lihat slip"
                    >
                      <Receipt className="w-4 h-4" />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          {rows.length === 0 && (
            <div className="py-14 text-center text-textSecondary text-sm">Tidak ada data payroll pada filter ini.</div>
          )}
          <div className="px-6 py-4 border-t border-border flex items-center justify-between text-xs text-textSecondary">
            <span>Periode: November 2025 · Cut-off tanggal 25</span>
            <span>Total net: {formatCompactIDR(totalNet)}</span>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="Ringkasan Komponen" />
            <div className="px-6 pb-6 space-y-3 text-sm">
              {[
                { label: 'Gaji pokok', value: items.reduce((s, p) => s + p.baseSalary, 0) },
                { label: 'Tunjangan', value: items.reduce((s, p) => s + p.allowance, 0) },
                { label: 'Lembur', value: items.reduce((s, p) => s + p.overtime, 0) },
                { label: 'Potongan (PPh21 + BPJS)', value: -items.reduce((s, p) => s + p.deduction, 0) },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0">
                  <span className="text-textSecondary">{r.label}</span>
                  <span className={`font-semibold ${r.value < 0 ? 'text-error' : 'text-white'}`}>
                    {r.value < 0 ? '-' : ''}{formatCompactIDR(Math.abs(r.value))}
                  </span>
                </div>
              ))}
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 flex items-center justify-between">
                <span className="text-white font-medium">Total ditransfer</span>
                <span className="text-white font-bold">{formatCompactIDR(totalNet)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-success/15 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-success" />
              </span>
              <h3 className="text-white font-semibold">Pajak & Kepatuhan</h3>
            </div>
            <p className="text-textSecondary text-sm leading-relaxed">
              PPh 21 dihitung otomatis dengan tarif progresif terbaru. Bukti potong & BPJS siap unduh untuk {items.length} karyawan.
            </p>
          </Card>
        </div>
      </div>

      {slip && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSlip(null)}>
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/80 text-xs mb-1">SLIP GAJI · NOV 2025</p>
                  <h3 className="text-xl font-bold">{slip.name}</h3>
                  <p className="text-white/80 text-sm">{slip.department} · {slip.id}</p>
                </div>
                <button onClick={() => setSlip(null)} className="text-white/80 hover:text-white text-lg leading-none p-1" aria-label="Tutup">✕</button>
              </div>
              <p className="mt-4 text-3xl font-bold">{formatIDR(netOf(slip))}</p>
              <p className="text-white/80 text-xs mt-1">Take-home pay setelah pajak & potongan</p>
            </div>
            <div className="p-6 space-y-2.5 text-sm">
              {[
                { label: 'Gaji pokok', value: slip.baseSalary },
                { label: 'Tunjangan', value: slip.allowance },
                { label: 'Lembur', value: slip.overtime },
                { label: 'Potongan', value: -slip.deduction },
              ].map((r, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-textSecondary">{r.label}</span>
                  <span className={r.value < 0 ? 'text-error font-medium' : 'text-white font-medium'}>
                    {r.value < 0 ? '-' : ''}{formatIDR(Math.abs(r.value))}
                  </span>
                </div>
              ))}
              <div className="pt-3 mt-1 border-t border-border flex gap-3">
                <button onClick={() => setSlip(null)} className="flex-1 py-2.5 rounded-xl bg-background border border-border text-white text-sm hover:border-primary/40 transition-colors">
                  Tutup
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold">
                  Unduh PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
