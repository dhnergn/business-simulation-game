import React from 'react';
import { useGame } from '../../contexts/GameContext';

export const ActionPanel: React.FC = () => {
  const { state, processAction } = useGame();

  if (!state) return null;
  if (state.availableActions.length === 0) {
    return (
      <div className="card p-4 mb-4">
        <p className="text-slate-500">No actions available. Advance story or end turn.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Available Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.availableActions.map((action) => {
          const canAfford = !action.cost?.cash || state.player.stats.cash >= action.cost.cash;
          return (
            <button
              key={action.id}
              onClick={() => processAction(action.id)}
              disabled={!canAfford}
              className={`p-4 text-left border rounded-lg transition-all ${
                canAfford
                  ? 'border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                  : 'border-slate-200 bg-slate-100 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="font-medium text-slate-900">{action.label}</div>
              <div className="text-sm text-slate-600 mt-1">{action.description}</div>
              {action.cost?.cash && (
                <div className="text-xs text-slate-500 mt-2">💰 Cost: ${action.cost.cash}</div>
              )}
              {!canAfford && (
                <div className="text-xs text-red-500 mt-1">⚠️ Cannot afford</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
