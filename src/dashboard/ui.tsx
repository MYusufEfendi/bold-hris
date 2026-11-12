import React from 'react';
import type { LucideIcon } from 'lucide-react';

/* ---------- Page header ---------- */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h1>
      {subtitle && <p className="text-textSecondary text-sm mt-1.5">{subtitle}</p>}
    </div>
    {children && <div className="flex items-center gap-3">{children}</div>}
  </div>
);

/* ---------- Card ---------- */
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-surface/60 backdrop-blur-xl rounded-3xl border border-border ${className}`}
  >
    {children}
  </div>
);

/* ---------- Stat card ---------- */
export type ToneKey = 'primary' | 'secondary' | 'accent' | 'success' | 'warning';

const toneMap: Record<ToneKey, { text: string; bg: string; ring: string; grad: string }> = {
  primary: { text: 'text-primary', bg: 'bg-primary/10', ring: 'border-primary/20', grad: 'from-primary to-secondary' },
  secondary: { text: 'text-secondary', bg: 'bg-secondary/10', ring: 'border-secondary/20', grad: 'from-secondary to-primary' },
  accent: { text: 'text-accent', bg: 'bg-accent/10', ring: 'border-accent/20', grad: 'from-accent to-primary' },
  success: { text: 'text-success', bg: 'bg-success/10', ring: 'border-success/20', grad: 'from-success to-emerald-400' },
  warning: { text: 'text-warning', bg: 'bg-warning/10', ring: 'border-warning/20', grad: 'from-warning to-orange-400' },
};

export interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'flat';
  icon: LucideIcon;
  tone?: ToneKey;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaTone = 'up',
  icon: Icon,
  tone = 'primary',
}) => {
  const t = toneMap[tone];
  return (
    <Card className="p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.grad} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-105 transition-transform`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        {delta && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              deltaTone === 'up'
                ? 'bg-success/10 text-success'
                : deltaTone === 'down'
                  ? 'bg-error/10 text-error'
                  : 'bg-surface text-textSecondary'
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <p className="text-textSecondary text-sm mt-0.5">{label}</p>
    </Card>
  );
};

/* ---------- Badge ---------- */
export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary';

const badgeTones: Record<BadgeTone, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-secondary/10 text-secondary border-secondary/20',
  primary: 'bg-primary/10 text-primary border-primary/20',
  neutral: 'bg-surface text-textSecondary border-border',
};

export const Badge: React.FC<{ tone?: BadgeTone; children: React.ReactNode }> = ({
  tone = 'neutral',
  children,
}) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeTones[tone]}`}
  >
    {children}
  </span>
);

/* ---------- Avatar ---------- */
export const Avatar: React.FC<{ initials: string; tone?: 'primary' | 'secondary' | 'accent' }> = ({
  initials,
  tone = 'primary',
}) => {
  const grad =
    tone === 'secondary'
      ? 'from-secondary to-primary'
      : tone === 'accent'
        ? 'from-accent to-primary'
        : 'from-primary to-secondary';
  return (
    <span
      className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${grad} text-white text-xs font-bold flex-shrink-0`}
    >
      {initials}
    </span>
  );
};

/* ---------- Progress bar ---------- */
export const ProgressBar: React.FC<{ value: number; tone?: ToneKey }> = ({
  value,
  tone = 'primary',
}) => {
  const t = toneMap[tone];
  return (
    <div className="h-2 w-full rounded-full bg-background overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${t.grad} transition-all duration-700`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

/* ---------- Empty / section title ---------- */
export const SectionTitle: React.FC<{ title: string; action?: React.ReactNode }> = ({
  title,
  action,
}) => (
  <div className="flex items-center justify-between px-6 pt-6 pb-4">
    <h2 className="text-base font-semibold text-white">{title}</h2>
    {action}
  </div>
);

/* ---------- Table shell ---------- */
export const TableWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm min-w-[640px]">{children}</table>
  </div>
);

export const Th: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <th
    className={`text-left text-xs font-semibold uppercase tracking-wider text-textSecondary px-6 py-3 ${className}`}
  >
    {children}
  </th>
);

export const Td: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <td className={`px-6 py-4 text-white/90 ${className}`}>{children}</td>;
