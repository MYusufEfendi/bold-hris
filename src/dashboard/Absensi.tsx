import React, { useMemo, useState } from 'react';
import {
  Clock, UserCheck, UserX, Timer, MapPin, Search, CalendarDays, Fingerprint, Download,
} from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Avatar, TableWrap, Th, Td, SectionTitle } from './ui';
import type { BadgeTone } from './ui';
import { attendance, attendanceWeekly } from './data';
import type { AttendanceStatus } from './data';

const statusTone: Record<AttendanceStatus, BadgeTone> = {
  hadir: 'success',
  terlambat: 'warning',
  izin: 'info',
  alpa: 'error',
  wfh: 'primary',
};

const statusLabel: Record<AttendanceStatus, string> = {
  hadir: 'Hadir',
  terlambat: 'Terlambat',
  izin: 'Izin',
  alpa: 'Alpa',
  wfh: 'WFH',
};

const filters: Array<{ key: 'semua' | AttendanceStatus; label: string }> = [
  { key: 'semua', label: 'Semua' },
  { key: 'hadir', label: 'Hadir' },
  { key: 'terlambat', label: 'Terlambat' },
  { key: 'wfh', label: 'WFH' },
  { key: 'izin', label: 'Izin' },
  { key: 'alpa', label: 'Alpa' },
];

const Absensi: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'semua' | AttendanceStatus>('semua');

  const rows = useMemo(
    () =>
      attendance.filter(a => {
        const matchQuery = a.name.toLowerCase().includes(query.toLowerCase());
        const matchFilter = filter === 'semua' || a.status === filter;
        return matchQuery && matchFilter;
      }),
    [query, filter],
  );

  const count = (s: AttendanceStatus) => attendance.filter(a => a.status === s).length;
  const maxWeekly = Math.max(...attendanceWeekly.map(w => w.hadir + w.terlambat + w.absen));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Absensi & Kehadiran"
        subtitle="Check-in GPS, live attendance, dan integrasi mesin fingerprint. Rekap otomatis setiap bulan."
      >
        <button className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-white hover:border-primary/40 transition-colors inline-flex items-center gap-2">
          <Download className="w-4 h-4" />
          Unduh Rekap
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2">
          <Fingerprint className="w-4 h-4" />
          Sinkron Fingerprint
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Hadir" value={`${count('hadir')} orang`} delta="75%" icon={UserCheck} tone="success" />
        <StatCard label="Terlambat" value={`${count('terlambat')} orang`} delta="-1,2%" deltaTone="down" icon={Timer} tone="warning" />
        <StatCard label="WFH" value={`${count('wfh')} orang`} icon={MapPin} tone="primary" />
        <StatCard label="Izin / Alpa" value={`${count('izin') + count('alpa')} orang`} icon={UserX} tone="accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <SectionTitle
            title="Rekap Kehadiran Mingguan"
            action={<Badge tone="primary">Minggu ini</Badge>}
          />
          <div className="px-6 pb-6 space-y-5">
            <div className="flex items-end justify-between gap-4 h-44">
              {attendanceWeekly.map(w => {
                const total = w.hadir + w.terlambat + w.absen;
                const h = (w.hadir / maxWeekly) * 100;
                const t = (w.terlambat / maxWeekly) * 100;
                const a = (w.absen / maxWeekly) * 100;
                return (
                  <div key={w.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {total}
                    </span>
                    <div className="w-full flex flex-col justify-end h-full gap-0.5 max-w-[44px]">
                      <div className="w-full rounded-t-lg bg-success/80 group-hover:bg-success transition-colors" style={{ height: `${h}%` }} />
                      <div className="w-full bg-warning/80" style={{ height: `${t}%` }} />
                      <div className="w-full rounded-b-lg bg-error/70" style={{ height: `${a}%` }} />
                    </div>
                    <span className="text-xs text-textSecondary">{w.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-textSecondary pt-2 border-t border-border">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-success" /> Hadir</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-warning" /> Terlambat</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-error" /> Absen</span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle title="Jam Kerja" />
          <div className="px-6 pb-6 space-y-4">
            <div className="rounded-2xl bg-background/50 border border-border p-4">
              <p className="text-xs text-textSecondary mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Rata-rata jam masuk
              </p>
              <p className="text-2xl font-bold text-white">08:04</p>
              <p className="text-xs text-success mt-1">−6 menit dari bulan lalu</p>
            </div>
            <div className="rounded-2xl bg-background/50 border border-border p-4">
              <p className="text-xs text-textSecondary mb-1 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Hari kerja bulan ini
              </p>
              <p className="text-2xl font-bold text-white">20 hari</p>
              <p className="text-xs text-textSecondary mt-1">6 hari kerja tersisa</p>
            </div>
            <div className="rounded-2xl bg-background/50 border border-border p-4">
              <p className="text-xs text-textSecondary mb-1">Tingkat disiplin</p>
              <p className="text-2xl font-bold text-primary">92,4%</p>
              <p className="text-xs text-textSecondary mt-1">Target minimal 90%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari nama karyawan..."
              className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  filter === f.key
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-background/60 text-textSecondary border border-border hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <TableWrap>
          <thead className="border-b border-border">
            <tr>
              <Th>Karyawan</Th>
              <Th>Masuk</Th>
              <Th>Keluar</Th>
              <Th>Lokasi</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map(a => (
              <tr key={a.id} className="border-b border-border/60 last:border-0 hover:bg-surface/80 transition-colors">
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar initials={a.name.split(' ').map(n => n[0]).slice(0, 2).join('')} tone="secondary" />
                    <div>
                      <p className="font-medium text-white">{a.name}</p>
                      <p className="text-xs text-textSecondary">{a.department}</p>
                    </div>
                  </div>
                </Td>
                <Td className="font-medium">{a.checkIn}</Td>
                <Td className="text-textSecondary">{a.checkOut ?? '—'}</Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5 text-xs text-textSecondary">
                    <MapPin className="w-3.5 h-3.5" />
                    {a.location}
                  </span>
                </Td>
                <Td>
                  <Badge tone={statusTone[a.status]}>{statusLabel[a.status]}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>

        {rows.length === 0 && (
          <div className="py-14 text-center text-textSecondary text-sm">Tidak ada data untuk filter ini.</div>
        )}
      </Card>
    </div>
  );
};

export default Absensi;
