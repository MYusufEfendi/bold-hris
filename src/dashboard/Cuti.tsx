import React, { useMemo, useState } from 'react';
import { CalendarDays, Clock, CheckCircle2, XCircle, Plus, Search, Wallet } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Avatar, TableWrap, Th, Td, SectionTitle, ProgressBar } from './ui';
import type { BadgeTone } from './ui';
import { leaveRequests } from './data';
import type { LeaveRequest, LeaveStatus } from './data';

const statusTone: Record<LeaveStatus, BadgeTone> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
};

const statusLabel: Record<LeaveStatus, string> = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak',
};

const Cuti: React.FC = () => {
  const [items, setItems] = useState<LeaveRequest[]>(leaveRequests);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'semua' | LeaveStatus>('semua');
  const [showForm, setShowForm] = useState(false);

  const rows = useMemo(
    () =>
      items.filter(r => {
        const q = query.toLowerCase();
        const matchQuery = r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
        const matchFilter = filter === 'semua' || r.status === filter;
        return matchQuery && matchFilter;
      }),
    [items, query, filter],
  );

  const pending = items.filter(i => i.status === 'pending').length;
  const approved = items.filter(i => i.status === 'approved').length;

  const decide = (id: string, status: LeaveStatus) =>
    setItems(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cuti & Izin"
        subtitle="Pengajuan cuti berjenjang dengan alur persetujuan fleksibel dan saldo cuti real-time."
      >
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajukan Cuti
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Menunggu Persetujuan" value={`${pending}`} delta="perlu tindakan" deltaTone="flat" icon={Clock} tone="warning" />
        <StatCard label="Disetujui Bulan Ini" value={`${approved}`} delta="+2" icon={CheckCircle2} tone="success" />
        <StatCard label="Total Pengajuan" value={`${items.length}`} icon={CalendarDays} tone="primary" />
        <StatCard label="Rata-rata Saldo" value="8,6 hari" icon={Wallet} tone="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-border">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari nama atau jenis cuti..."
                className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              {(['semua', 'pending', 'approved', 'rejected'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
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
                <Th>Pengaju</Th>
                <Th>Jenis & Periode</Th>
                <Th>Alasan</Th>
                <Th>Status</Th>
                <Th className="text-right">Aksi</Th>
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
                        <p className="text-xs text-textSecondary">{r.id} · Saldo {r.balance} hari</p>
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <p className="text-white font-medium text-[13px]">{r.type}</p>
                    <p className="text-xs text-textSecondary">{r.from} — {r.to} · {r.days} hari</p>
                  </Td>
                  <Td className="max-w-[220px]">
                    <p className="text-[13px] text-textSecondary truncate">{r.reason}</p>
                  </Td>
                  <Td>
                    <Badge tone={statusTone[r.status]}>{statusLabel[r.status]}</Badge>
                  </Td>
                  <Td className="text-right">
                    {r.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => decide(r.id, 'approved')}
                          className="p-2 rounded-lg bg-success/15 text-success hover:bg-success/25 transition-colors"
                          title="Setujui"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => decide(r.id, 'rejected')}
                          className="p-2 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors"
                          title="Tolak"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-textSecondary">Selesai</span>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
          {rows.length === 0 && (
            <div className="py-14 text-center text-textSecondary text-sm">Tidak ada pengajuan pada filter ini.</div>
          )}
        </Card>

        <div className="space-y-4">
          <Card>
            <SectionTitle title="Saldo Cuti Tim" />
            <div className="px-6 pb-6 space-y-4">
              {items.slice(0, 4).map(r => (
                <div key={r.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/90">{r.name}</span>
                    <span className="text-xs text-textSecondary">{r.balance} / 12 hari</span>
                  </div>
                  <ProgressBar value={(r.balance / 12) * 100} tone={r.balance > 8 ? 'success' : r.balance > 5 ? 'primary' : 'warning'} />
                </div>
              ))}
              <p className="text-xs text-textSecondary pt-1 leading-relaxed">
                Saldo cuti diperbarui otomatis setiap awal tahun. Sisa cuti dapat diakumulasi maksimal 6 hari.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-surface to-primary/10">
            <h3 className="text-white font-semibold mb-1">Kebijakan Cuti 2025</h3>
            <p className="text-textSecondary text-sm leading-relaxed mb-4">
              12 hari cuti tahunan + 12 hari sakit + cuti melahirkan 90 hari. Pengajuan H-3 untuk cuti {'>'} 2 hari.
            </p>
            <button className="text-sm text-primary hover:text-secondary transition-colors font-medium">
              Lihat dokumen kebijakan →
            </button>
          </Card>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-1">Ajukan Cuti Baru</h3>
            <p className="text-textSecondary text-sm mb-5">Formulir demo — data tersimpan lokal di sesi ini.</p>
            <div className="space-y-3">
              <input placeholder="Nama karyawan" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
                <input type="date" className="bg-background border border-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
              </div>
              <textarea placeholder="Alasan pengajuan..." rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl bg-background border border-border text-white text-sm hover:border-primary/40 transition-colors">
                Batal
              </button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold">
                Kirim Pengajuan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuti;
