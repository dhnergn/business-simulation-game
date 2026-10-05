import React from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { GameState } from '../types/gameState';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ state, children }) => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar
        playerName={state.player.customization.name}
        companyName={state.company.name}
        month={state.company.month}
        cash={state.player.stats.cash}
        revenue={state.company.stats.revenue}
        profit={state.company.stats.profit}
        customers={state.company.stats.customers}
        reputation={state.player.stats.reputation}
        valuation={state.company.stats.companyValuation}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar playerStats={{
          cash: state.player.stats.cash,
          energy: state.player.stats.energy,
          confidence: state.player.stats.confidence,
          stress: state.player.stats.stress,
          network: state.player.stats.network,
        }} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
