import React, { useMemo, useState } from 'react';
import { Search, Plus, Download, Users, UserCheck, Briefcase, GraduationCap, Mail, Phone, Filter } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Avatar, TableWrap, Th, Td, ProgressBar } from './ui';
import type { BadgeTone } from './ui';
import { employees } from './data';
import type { Employee } from './data';
import { formatCompactIDR, initialsOf } from './format';

const statusTone: Record<Employee['status'], BadgeTone> = {
  aktif: 'success',
  kontrak: 'info',
  probation: 'warning',
};

const statusLabel: Record<Employee['status'], string> = {
  aktif: 'Aktif',
  kontrak: 'Kontrak',
  probation: 'Probation',
};

const departments = ['Semua', 'Engineering', 'People', 'Operations', 'Product', 'Finance'];

const Karyawan: React.FC = () => {
  const [query, setQuery] = useState('');
  const [dept, setDept] = useState('Semua');
  const [selected, setSelected] = useState<Employee | null>(null);

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchQuery =
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.role.toLowerCase().includes(query.toLowerCase()) ||
        e.email.toLowerCase().includes(query.toLowerCase());
      const matchDept = dept === 'Semua' || e.department === dept;
      return matchQuery && matchDept;
    });
  }, [query, dept]);

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Karyawan"
        subtitle="Kelola data karyawan, struktur organisasi, dan dokumen HR dalam satu tempat."
      >
        <button className="px-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-white hover:border-primary/40 transition-colors inline-flex items-center gap-2">
          <Download className="w-4 h-4" />
          Ekspor
        </button>
        <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Tambah Karyawan
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Karyawan" value="64" delta="+6" icon={Users} tone="primary" />
        <StatCard label="Karyawan Aktif" value="58" delta="90,6%" icon={UserCheck} tone="success" />
        <StatCard label="Total Departemen" value="5" icon={Briefcase} tone="secondary" />
        <StatCard label="Onboarding" value="3" delta="bulan ini" icon={GraduationCap} tone="accent" />
      </div>

      <Card>
        <div className="px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-3 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari nama, jabatan, atau email..."
              className="w-full bg-background/60 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-textSecondary/70 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <Filter className="w-4 h-4 text-textSecondary flex-shrink-0" />
            {departments.map(d => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  dept === d
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-background/60 text-textSecondary border border-border hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <TableWrap>
          <thead className="border-b border-border">
            <tr>
              <Th>Karyawan</Th>
              <Th>Departemen</Th>
              <Th>Bergabung</Th>
              <Th>Status</Th>
              <Th>Performa</Th>
              <Th className="text-right">Gaji / bulan</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(e => (
              <tr
                key={e.id}
                onClick={() => setSelected(e)}
                className="border-b border-border/60 last:border-0 hover:bg-surface/80 cursor-pointer transition-colors"
              >
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar initials={e.avatar} />
                    <div>
                      <p className="font-medium text-white">{e.name}</p>
                      <p className="text-xs text-textSecondary">{e.role}</p>
                    </div>
                  </div>
                </Td>
                <Td className="text-textSecondary">{e.department}</Td>
                <Td className="text-textSecondary text-sm">{e.joinDate}</Td>
                <Td>
                  <Badge tone={statusTone[e.status]}>{statusLabel[e.status]}</Badge>
                </Td>
                <Td>
                  <div className="w-28">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white font-medium">{e.performance}</span>
                    </div>
                    <ProgressBar value={e.performance} tone={e.performance >= 85 ? 'success' : e.performance >= 78 ? 'primary' : 'warning'} />
                  </div>
                </Td>
                <Td className="text-right font-medium">{formatCompactIDR(e.salary)}</Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <Search className="w-10 h-10 text-textSecondary/40 mx-auto mb-3" />
            <p className="text-white font-medium">Tidak ada karyawan ditemukan</p>
            <p className="text-textSecondary text-sm mt-1">Coba ubah kata kunci atau filter departemen.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-xs text-textSecondary">
          <span>Menampilkan {filtered.length} dari {employees.length} karyawan</span>
          <span>Total payroll: {formatCompactIDR(totalPayroll)}</span>
        </div>
      </Card>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                {initialsOf(selected.name)}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                <p className="text-textSecondary text-sm">{selected.role} · {selected.department}</p>
                <div className="mt-2">
                  <Badge tone={statusTone[selected.status]}>{statusLabel[selected.status]}</Badge>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-textSecondary hover:text-white transition-colors text-lg leading-none p-1"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>

            <dl className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-2xl bg-background/50 border border-border p-4">
                <dt className="text-xs text-textSecondary mb-1">ID Karyawan</dt>
                <dd className="text-sm text-white font-medium">{selected.id}</dd>
              </div>
              <div className="rounded-2xl bg-background/50 border border-border p-4">
                <dt className="text-xs text-textSecondary mb-1">Bergabung</dt>
                <dd className="text-sm text-white font-medium">{selected.joinDate}</dd>
              </div>
              <div className="rounded-2xl bg-background/50 border border-border p-4 col-span-2">
                <dt className="text-xs text-textSecondary mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email
                </dt>
                <dd className="text-sm text-white font-medium truncate">{selected.email}</dd>
              </div>
              <div className="rounded-2xl bg-background/50 border border-border p-4 col-span-2">
                <dt className="text-xs text-textSecondary mb-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> Telepon
                </dt>
                <dd className="text-sm text-white font-medium">{selected.phone}</dd>
              </div>
            </dl>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-textSecondary">Skor performa</span>
                <span className="text-sm text-white font-semibold">{selected.performance}/100</span>
              </div>
              <ProgressBar value={selected.performance} tone="accent" />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all">
                Edit Data
              </button>
              <button className="flex-1 py-3 rounded-xl bg-background border border-border text-white text-sm font-medium hover:border-primary/40 transition-colors">
                Lihat Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Karyawan;
