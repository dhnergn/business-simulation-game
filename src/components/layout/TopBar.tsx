import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface TopBarProps {
  playerName: string;
  companyName: string;
  month: number;
  cash: number;
  revenue: number;
  profit: number;
  customers: number;
  reputation: number;
  valuation: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  playerName,
  companyName,
  month,
  cash,
  revenue,
  profit,
  customers,
  reputation,
  valuation,
}) => {
  const formatCurrency = (val: number): string => {
    const abs = Math.abs(val);
    if (abs >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val}`;
  };

  const profitColor = profit >= 0 ? 'text-success' : 'text-danger';

  return (
    <div className="bg-slate-900 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-slate-400 text-xs">Player</span>
            <div className="font-bold">{playerName}</div>
          </div>
          <div className="text-slate-600">·</div>
          <div>
            <span className="text-slate-400 text-xs">Company</span>
            <div className="font-bold">{companyName}</div>
          </div>
          <div className="text-slate-600">·</div>
          <div>
            <span className="text-slate-400 text-xs">Month</span>
            <div className="font-bold">{month}</div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <StatItem label="Cash" value={formatCurrency(cash)} color="text-emerald-400" />
          <StatItem label="Revenue" value={formatCurrency(revenue)} color="text-blue-400" />
          <StatItem label="Profit" value={formatCurrency(profit)} color={profitColor} />
          <StatItem label="Customers" value={customers.toLocaleString()} color="text-purple-400" />
          <StatItem label="Reputation" value={reputation} color="text-amber-400" />
          <StatItem label="Valuation" value={formatCurrency(valuation)} color="text-cyan-400" />
        </div>
      </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string;
  color?: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color = 'text-slate-200' }) => (
  <div className="flex flex-col items-end">
    <span className="text-slate-400 text-xs uppercase tracking-wider">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);
