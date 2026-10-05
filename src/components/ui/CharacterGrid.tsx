import React from 'react';
import { CHARACTERS } from '../../data/characters';
import { useGame } from '../../contexts/GameContext';
import { CHARACTER_RELATIONSHIP_TITLES } from '../../data/characters';

export const CharacterGrid: React.FC = () => {
  const { state } = useGame();
  if (!state) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(state.relationships).map(([charId, rel]) => {
        const character = CHARACTERS[charId];
        if (!character) return null;

        const trustLevel = Math.floor(rel.trust / 20);
        const trustColor = rel.trust >= 60 ? 'text-green-600' : rel.trust >= 30 ? 'text-amber-600' : 'text-red-600';

        return (
          <div key={charId} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center text-xl">
                {character.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{character.name}</h4>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {CHARACTER_RELATIONSHIP_TITLES[rel.status]}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{character.role}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Trust</span>
                    <span className={trustColor}>{rel.trust}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${rel.trust >= 60 ? 'bg-green-500' : rel.trust >= 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${rel.trust}%` }}
                    />
                  </div>
                </div>
                {character.offers && character.offers.length > 0 && rel.trust >= (character.offers[0].conditions[0]?.value || 0) && (
                  <div className="mt-2 text-xs text-slate-500">
                    Available: {character.offers.filter(o => o.type === 'advice').length} advice, {character.offers.filter(o => o.type === 'join').length} join offer
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
