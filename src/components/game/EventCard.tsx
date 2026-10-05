import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { EVENT_TEMPLATES } from '../../data/events';

interface EventCardProps {
  eventId: string;
  event: any;
}

export const EventCard: React.FC<EventCardProps> = ({ eventId, event }) => {
  const { selectEventChoice, dismissEvent } = useGame();
  const template = EVENT_TEMPLATES[event.eventId];

  if (!template) return null;

  const description = typeof template.description === 'function'
    ? template.description({ context: event.context || {} })
    : template.description;

  return (
    <div className="card p-5 mb-4 border-2 border-amber-300 bg-amber-50/50">
      <h3 className="text-lg font-bold text-slate-900 mb-2">{template.title}</h3>
      <p className="text-slate-700 mb-4">{description}</p>

      <div className="space-y-2">
        {template.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => selectEventChoice(event.id, idx)}
            className="w-full text-left p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="font-medium text-slate-800">{choice.text}</div>
          </button>
        ))}
      </div>

      <button
        onClick={() => dismissEvent(event.id)}
        className="text-xs text-slate-500 hover:text-slate-700 mt-3 underline"
      >
        Dismiss for now
      </button>
    </div>
  );
};
