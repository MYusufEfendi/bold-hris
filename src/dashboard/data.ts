export type AttendanceStatus = 'hadir' | 'terlambat' | 'izin' | 'alpa' | 'wfh';
export type LeaveStatus = 'pending' | 'approved' | 'rejected';
export type ReviewStatus = 'selesai' | 'berjalan' | 'belum';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'aktif' | 'kontrak' | 'probation';
  avatar: string;
  salary: number;
  performance: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  checkIn: string;
  checkOut: string | null;
  status: AttendanceStatus;
  location: string;
}

export interface LeaveRequest {
  id: string;
  name: string;
  type: 'Cuti Tahunan' | 'Cuti Sakit' | 'Izin Pribadi' | 'Cuti Melahirkan';
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  balance: number;
}

export interface PayrollItem {
  id: string;
  name: string;
  department: string;
  baseSalary: number;
  allowance: number;
  overtime: number;
  deduction: number;
  status: 'dibayar' | 'menunggu';
}

export interface ReviewItem {
  id: string;
  name: string;
  department: string;
  score: number;
  kpi: number;
  okr: number;
  status: ReviewStatus;
  reviewer: string;
}

export interface Activity {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  kind: 'success' | 'primary' | 'secondary' | 'warning';
}

export const employees: Employee[] = [
  { id: 'EMP-001', name: 'Sari Wulandari', role: 'HR Director', department: 'People', email: 'sari.w@hria.id', phone: '+62 812-1100-2233', joinDate: '12 Mar 2019', status: 'aktif', avatar: 'SW', salary: 28500000, performance: 94 },
  { id: 'EMP-002', name: 'Andi Prasetyo', role: 'COO', department: 'Operations', email: 'andi.p@hria.id', phone: '+62 812-4455-6677', joinDate: '08 Jan 2018', status: 'aktif', avatar: 'AP', salary: 32000000, performance: 91 },
  { id: 'EMP-003', name: 'Maya Kusuma', role: 'HR Manager', department: 'People', email: 'maya.k@hria.id', phone: '+62 813-7788-9900', joinDate: '22 Sep 2020', status: 'aktif', avatar: 'MK', salary: 19500000, performance: 88 },
  { id: 'EMP-004', name: 'Bagas Nugroho', role: 'Backend Engineer', department: 'Engineering', email: 'bagas.n@hria.id', phone: '+62 815-2211-3344', joinDate: '14 Feb 2021', status: 'aktif', avatar: 'BN', salary: 17800000, performance: 86 },
  { id: 'EMP-005', name: 'Rina Halimah', role: 'Product Designer', department: 'Product', email: 'rina.h@hria.id', phone: '+62 817-5566-7788', joinDate: '03 May 2022', status: 'aktif', avatar: 'RH', salary: 15400000, performance: 92 },
  { id: 'EMP-006', name: 'Dimas Saputra', role: 'Payroll Specialist', department: 'Finance', email: 'dimas.s@hria.id', phone: '+62 818-9900-1122', joinDate: '19 Nov 2021', status: 'aktif', avatar: 'DS', salary: 13200000, performance: 79 },
  { id: 'EMP-007', name: 'Putri Anggraini', role: 'Talent Acquisition', department: 'People', email: 'putri.a@hria.id', phone: '+62 811-3344-5566', joinDate: '27 Jul 2023', status: 'kontrak', avatar: 'PA', salary: 10500000, performance: 83 },
  { id: 'EMP-008', name: 'Fajar Ramadhan', role: 'Frontend Engineer', department: 'Engineering', email: 'fajar.r@hria.id', phone: '+62 819-6677-8899', joinDate: '05 Apr 2024', status: 'probation', avatar: 'FR', salary: 12600000, performance: 74 },
];

export const attendance: AttendanceRecord[] = [
  { id: 'ATT-9001', employeeId: 'EMP-001', name: 'Sari Wulandari', department: 'People', checkIn: '07:52', checkOut: '17:04', status: 'hadir', location: 'Kantor Pusat' },
  { id: 'ATT-9002', employeeId: 'EMP-002', name: 'Andi Prasetyo', department: 'Operations', checkIn: '08:11', checkOut: '17:30', status: 'hadir', location: 'Kantor Pusat' },
  { id: 'ATT-9003', employeeId: 'EMP-003', name: 'Maya Kusuma', department: 'People', checkIn: '08:41', checkOut: '17:15', status: 'terlambat', location: 'Kantor Pusat' },
  { id: 'ATT-9004', employeeId: 'EMP-004', name: 'Bagas Nugroho', department: 'Engineering', checkIn: '08:05', checkOut: null, status: 'wfh', location: 'Remote' },
  { id: 'ATT-9005', employeeId: 'EMP-005', name: 'Rina Halimah', department: 'Product', checkIn: '07:58', checkOut: '16:45', status: 'hadir', location: 'Kantor Pusat' },
  { id: 'ATT-9006', employeeId: 'EMP-006', name: 'Dimas Saputra', department: 'Finance', checkIn: '09:12', checkOut: null, status: 'terlambat', location: 'Kantor Pusat' },
  { id: 'ATT-9007', employeeId: 'EMP-007', name: 'Putri Anggraini', department: 'People', checkIn: '—', checkOut: null, status: 'izin', location: '—' },
  { id: 'ATT-9008', employeeId: 'EMP-008', name: 'Fajar Ramadhan', department: 'Engineering', checkIn: '—', checkOut: null, status: 'alpa', location: '—' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'LV-301', name: 'Putri Anggraini', type: 'Cuti Tahunan', from: '18 Nov 2025', to: '22 Nov 2025', days: 5, reason: 'Liburan keluarga ke Yogyakarta', status: 'pending', balance: 8 },
  { id: 'LV-302', name: 'Bagas Nugroho', type: 'Cuti Sakit', from: '14 Nov 2025', to: '15 Nov 2025', days: 2, reason: 'Demam dan istirahat dokter', status: 'approved', balance: 12 },
  { id: 'LV-303', name: 'Rina Halimah', type: 'Izin Pribadi', from: '21 Nov 2025', to: '21 Nov 2025', days: 1, reason: 'Mengurus dokumen kependudukan', status: 'pending', balance: 10 },
  { id: 'LV-304', name: 'Dimas Saputra', type: 'Cuti Tahunan', from: '01 Dec 2025', to: '05 Dec 2025', days: 5, reason: 'Acara pernikahan saudara', status: 'approved', balance: 7 },
  { id: 'LV-305', name: 'Fajar Ramadhan', type: 'Izin Pribadi', from: '25 Nov 2025', to: '26 Nov 2025', days: 2, reason: 'Urusan keluarga mendadak', status: 'rejected', balance: 6 },
];

export const payroll: PayrollItem[] = [
  { id: 'PR-1101', name: 'Sari Wulandari', department: 'People', baseSalary: 28500000, allowance: 4500000, overtime: 850000, deduction: 3250000, status: 'dibayar' },
  { id: 'PR-1102', name: 'Andi Prasetyo', department: 'Operations', baseSalary: 32000000, allowance: 6000000, overtime: 0, deduction: 4100000, status: 'dibayar' },
  { id: 'PR-1103', name: 'Maya Kusuma', department: 'People', baseSalary: 19500000, allowance: 2800000, overtime: 420000, deduction: 2150000, status: 'dibayar' },
  { id: 'PR-1104', name: 'Bagas Nugroho', department: 'Engineering', baseSalary: 17800000, allowance: 2200000, overtime: 1250000, deduction: 1980000, status: 'menunggu' },
  { id: 'PR-1105', name: 'Rina Halimah', department: 'Product', baseSalary: 15400000, allowance: 1900000, overtime: 380000, deduction: 1720000, status: 'menunggu' },
  { id: 'PR-1106', name: 'Dimas Saputra', department: 'Finance', baseSalary: 13200000, allowance: 1500000, overtime: 0, deduction: 1480000, status: 'menunggu' },
];

export const reviews: ReviewItem[] = [
  { id: 'RV-01', name: 'Sari Wulandari', department: 'People', score: 94, kpi: 96, okr: 92, status: 'selesai', reviewer: 'Andi Prasetyo' },
  { id: 'RV-02', name: 'Rina Halimah', department: 'Product', score: 92, kpi: 90, okr: 94, status: 'selesai', reviewer: 'Maya Kusuma' },
  { id: 'RV-03', name: 'Andi Prasetyo', department: 'Operations', score: 91, kpi: 93, okr: 89, status: 'selesai', reviewer: 'Sari Wulandari' },
  { id: 'RV-04', name: 'Maya Kusuma', department: 'People', score: 88, kpi: 86, okr: 90, status: 'berjalan', reviewer: 'Sari Wulandari' },
  { id: 'RV-05', name: 'Bagas Nugroho', department: 'Engineering', score: 86, kpi: 84, okr: 88, status: 'berjalan', reviewer: 'Andi Prasetyo' },
  { id: 'RV-06', name: 'Fajar Ramadhan', department: 'Engineering', score: 74, kpi: 72, okr: 76, status: 'belum', reviewer: 'Bagas Nugroho' },
];

export const activities: Activity[] = [
  { id: 'a1', actor: 'Maya Kusuma', action: 'menyetujui pengajuan cuti', target: 'Bagas Nugroho · 2 hari', time: '8 menit lalu', kind: 'success' },
  { id: 'a2', actor: 'Dimas Saputra', action: 'menjalankan payroll', target: 'Periode November 2025', time: '26 menit lalu', kind: 'primary' },
  { id: 'a3', actor: 'Putri Anggraini', action: 'mengajukan cuti tahunan', target: '18–22 Nov 2025', time: '1 jam lalu', kind: 'secondary' },
  { id: 'a4', actor: 'Sari Wulandari', action: 'memulai performance review', target: 'Q4 2025 · Engineering', time: '2 jam lalu', kind: 'warning' },
  { id: 'a5', actor: 'Rina Halimah', action: 'memperbarui profil karyawan', target: 'Data kontak & alamat', time: '3 jam lalu', kind: 'primary' },
];

export const headcountTrend = [
  { month: 'Jun', value: 42 },
  { month: 'Jul', value: 46 },
  { month: 'Agu', value: 51 },
  { month: 'Sep', value: 55 },
  { month: 'Okt', value: 58 },
  { month: 'Nov', value: 64 },
];

export const departmentDistribution = [
  { name: 'Engineering', value: 22, color: '#9E7FFF' },
  { name: 'People', value: 14, color: '#38bdf8' },
  { name: 'Operations', value: 12, color: '#f472b6' },
  { name: 'Product', value: 9, color: '#10b981' },
  { name: 'Finance', value: 7, color: '#f59e0b' },
];

export const attendanceWeekly = [
  { day: 'Sen', hadir: 58, terlambat: 4, absen: 2 },
  { day: 'Sel', hadir: 61, terlambat: 2, absen: 1 },
  { day: 'Rab', hadir: 55, terlambat: 6, absen: 3 },
  { day: 'Kam', hadir: 60, terlambat: 3, absen: 1 },
  { day: 'Jum', hadir: 52, terlambat: 8, absen: 4 },
];
