import React from 'react';
import { StoryNode } from '../../types/story';
import { useGame } from '../../contexts/GameContext';

interface ChoiceListProps {
  node: StoryNode;
}

export const ChoiceList: React.FC<ChoiceListProps> = ({ node }) => {
  const { selectStoryChoice } = useGame();

  if (!node.choices || node.choices.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {node.choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => selectStoryChoice(choice.id)}
          className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all group"
        >
          <div className="font-medium text-slate-900 group-hover:text-slate-900">{choice.text}</div>
          {choice.consequencesHidden && (
            <div className="text-xs text-slate-400 mt-1">Hidden consequences</div>
          )}
          {!choice.consequencesHidden &&
            choice.consequences.slice(0, 3).map((c, i) => (
              <div key={i} className={`text-xs text-slate-400 mt-1 ${c.hidden ? 'italic' : ''}`}>
                {c.hidden ? `?? ${c.description}` : c.description}
              </div>
            ))}
        </button>
      ))}
    </div>
  );
};

export const StoryPanel: React.FC<{ node: StoryNode | null }> = ({ node }) => {
  if (!node) {
    return (
      <div className="card p-6 mb-6">
        <p className="text-slate-500">No active story. End your turn to continue.</p>
      </div>
    );
  }

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{node.title}</h2>
      <p className="text-slate-700 mb-4 leading-relaxed">{node.text}</p>
      <ChoiceList node={node} />
    </div>
  );
};
