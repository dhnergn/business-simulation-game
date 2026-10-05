import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  playerStats: {
    cash: number;
    energy: number;
    confidence: number;
    stress: number;
    network: number;
  };
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/story', label: 'Story', icon: '📖' },
  { to: '/company', label: 'Company', icon: '🏢' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/employees', label: 'Employees', icon: '👥' },
  { to: '/marketing', label: 'Marketing', icon: '📢' },
  { to: '/product', label: 'Product', icon: '⚙️' },
  { to: '/finance', label: 'Finance', icon: '💰' },
  { to: '/relationships', label: 'Relationships', icon: '🤝' },
  { to: '/education', label: 'Concepts', icon: '📚' },
];

export const Sidebar: React.FC<SidebarProps> = ({ playerStats }) => {
  const energyColor = playerStats.energy > 50 ? 'text-emerald-400' : playerStats.energy > 25 ? 'text-amber-400' : 'text-red-400';
  const stressColor = playerStats.stress > 70 ? 'text-red-400' : playerStats.stress > 40 ? 'text-amber-400' : 'text-emerald-400';

  return (
    <div className="bg-slate-50 border-r border-slate-200 w-64 flex flex-col h-full">
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-slate-200 text-slate-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 space-y-3">
        <div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Energy</span>
            <span className={energyColor}>{playerStats.energy}/100</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                playerStats.energy > 50 ? 'bg-emerald-500' : playerStats.energy > 25 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${playerStats.energy}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500">Stress</span>
            <span className={stressColor}>{playerStats.stress}/100</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full ${
                playerStats.stress < 40 ? 'bg-emerald-500' : playerStats.stress < 70 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${playerStats.stress}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
          <div>Network: {playerStats.network}</div>
          <div>Cash: ${playerStats.cash.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
