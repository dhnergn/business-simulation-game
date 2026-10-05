import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { CONCEPT_EXPLANATIONS } from '../../data/concepts';

export const EducationPanel: React.FC<{
  open: boolean;
  onClose: () => void;
  entries: any[];
  markRead: (id: string) => void;
}> = ({ open, onClose, entries, markRead }) => {
  if (!open) return null;

  const unread = entries.filter((e) => !e.read);
  const read = entries.filter((e) => e.read);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-6 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full my-8">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Business Concepts</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {unread.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">New</h3>
              {unread.slice(0, 3).map((entry) => {
                const concept = CONCEPT_EXPLANATIONS[entry.conceptId as keyof typeof CONCEPT_EXPLANATIONS];
                if (!concept) return null;
                return (
                  <ConceptCard key={entry.id} concept={concept} entry={entry} markRead={markRead} />
                );
              })}
            </div>
          )}

          {read.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">Archive</h3>
              {read.slice(-5).reverse().map((entry) => {
                const concept = CONCEPT_EXPLANATIONS[entry.conceptId as keyof typeof CONCEPT_EXPLANATIONS];
                if (!concept) return null;
                return (
                  <ConceptCard key={entry.id} concept={concept} entry={entry} markRead={markRead} collapsed />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ConceptCardProps {
  concept: any;
  entry: any;
  markRead: (id: string) => void;
  collapsed?: boolean;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, entry, markRead, collapsed = false }) => {
  return (
    <div
      className={`border border-slate-200 rounded-lg p-4 mb-3 ${
        collapsed ? 'bg-slate-50/50' : 'bg-blue-50/30'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-bold text-slate-900">{concept.title}</h4>
          <span className="text-xs text-slate-400">Triggered: Month {entry.month}</span>
        </div>
        {!entry.read && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">NEW</span>
        )}
      </div>
      {!collapsed && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-slate-700">{concept.explanation}</p>
          <div className="border-l-2 border-slate-300 pl-3 mt-2">
            <p className="text-xs text-slate-500 font-medium">PRINCIPLE</p>
            <p className="text-sm text-slate-600">{concept.businessPrinciple}</p>
          </div>
        </div>
      )}
      {!entry.read && (
        <button
          onClick={() => markRead(entry.id)}
          className="text-xs text-slate-500 hover:text-slate-700 mt-2 underline"
        >
          Mark as read
        </button>
      )}
    </div>
  );
};
