import React from 'react';
import { GameState } from '../types/gameState';
import { SkillSet } from '../types/player';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'cyan' | 'teal';
  trend?: 'up' | 'down' | 'neutral';
}

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-900',
  green: 'bg-green-50 border-green-200 text-green-900',
  amber: 'bg-amber-50 border-amber-200 text-amber-900',
  red: 'bg-red-50 border-red-200 text-red-900',
  purple: 'bg-purple-50 border-purple-200 text-purple-900',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-900',
  teal: 'bg-teal-50 border-teal-200 text-teal-900',
};

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtitle, icon, color = 'blue', trend = 'neutral' }) => {
  const trendIcon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '';
  return (
    <div className={`card ${colorClasses[color]} p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
          <div className="text-2xl font-bold">{value}</div>
          {subtitle && <div className="text-xs opacity-70 mt-1">{subtitle}</div>}
        </div>
        {icon && <div className="text-2xl opacity-50">{icon}</div>}
        {trend !== 'neutral' && <div className={`text-lg ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{trendIcon}</div>}
      </div>
    </div>
  );
};

export const ProgressBar: React.FC<{ label: string; value: number; max?: number; color?: string }> = ({
  label,
  value,
  max = 100,
  color = 'bg-blue-500',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900 font-medium">{Math.round(value)}/{max}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export const SkillBar: React.FC<{ skill: string; value: number; maxValue?: number }> = ({
  skill,
  value,
  maxValue = 20,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  const label = skill.charAt(0).toUpperCase() + skill.slice(1);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900 font-medium">{value}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-1.5">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const SkillsDisplay: React.FC<{ skills: SkillSet; compact?: boolean }> = ({ skills, compact = false }) => {
  const skillKeys = ['leadership', 'sales', 'operations', 'finance', 'marketing', 'product', 'negotiation', 'strategicThinking'];
  const labels: Record<string, string> = {
    leadership: 'Leadership',
    sales: 'Sales',
    operations: 'Operations',
    finance: 'Finance',
    marketing: 'Marketing',
    product: 'Product',
    negotiation: 'Negotiation',
    strategicThinking: 'Strategy',
  };

  if (compact) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {skillKeys.map((key) => (
          <div key={key} className="text-center">
            <div className="text-xs text-slate-500">{labels[key]}</div>
            <div className="font-bold text-lg">{skills[key as keyof SkillSet]}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {skillKeys.map((key) => (
        <SkillBar key={key} skill={key} value={skills[key as keyof SkillSet]} />
      ))}
    </div>
  );
};
