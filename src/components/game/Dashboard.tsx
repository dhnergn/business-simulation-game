import React, { useState } from 'react';
import { Layout } from '../layout/Layout';
import { StatCard, ProgressBar, SkillsDisplay } from '../ui/StatCard';
import { useGame } from '../../contexts/GameContext';
import { STORY_NODES } from '../../data/storyNodes';
import { BUSINESS_DEFINITIONS } from '../../data/businesses';
import { CHAPTERS } from '../../data/chapters';
import { CharacterCard } from '../ui/CharacterCard';
import { EventCard } from '../ui/EventCard';
import { EducationPanel } from '../ui/EducationPanel';
import { GameEngine } from '../../engine/GameEngine';

const Dashboard: React.FC = () => {
  const { state, endTurn, startNewTurn, pendingEvents, pendingStoryNode, markEducationRead } = useGame();
  
  if (!state) return null;

  const business = BUSINESS_DEFINITIONS[state.company.businessType];
  const currentStoryNode = pendingStoryNode || STORY_NODES[state.story.currentNode || ''];
  const currentChapter = CHAPTERS[state.story.currentChapter];

  const [showEducation, setShowEducation] = useState(false);
  const [activeEventIds, setActiveEventIds] = useState<Set<string>>(new Set());

  const handleEndTurn = () => {
    endTurn();
    startNewTurn();
  };

  const handleDismissEvent = (eventId: string) => {
    setActiveEventIds((prev) => {
      const next = new Set(prev);
      next.delete(eventId);
      return next;
    });
  };

  const unreadEdus = state.educationHistory.filter((e) => !e.read);
  const hasUnread = unreadEdus.length > 0;

  return (
    <Layout state={state}>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{currentChapter?.title || 'Dashboard'}</h1>
            <p className="text-slate-600 mt-1">{currentChapter?.description || ''}</p>
          </div>
          <div className="flex items-center gap-3">
            {hasUnread && (
              <button
                onClick={() => setShowEducation(true)}
                className="relative px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium hover:bg-amber-200 transition-colors"
              >
                <span className="mr-1">📚</span>
                {unreadEdus.length} concept{unreadEdus.length > 1 ? 's' : ''} learned
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadEdus.length}
                </span>
              </button>
            )}
            <button
              onClick={handleEndTurn}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              End Turn (Month {state.company.month + 1})
            </button>
          </div>
        </div>

        {currentStoryNode && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{currentStoryNode.title}</h2>
            <p className="text-slate-700 mb-4 leading-relaxed">{currentStoryNode.text}</p>

            {currentStoryNode.choices && currentStoryNode.choices.length > 0 ? (
              <div className="space-y-3">
                {currentStoryNode.choices.map((choice) => (
                  <ChoiceButton key={choice.id} choice={choice} onSelect={() => {}} />
                ))}
              </div>
            ) : (
              <button
                onClick={() => {
                  const newState = { ...state };
                  if (currentStoryNode.autoAdvance && currentStoryNode.nextNodes.length > 0) {
                    newState.story.currentNode = currentStoryNode.nextNodes[0];
                  } else {
                    newState.story.currentNode = '';
                  }
                  startNewTurn();
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                {currentStoryNode.autoAdvance ? 'Continue...' : 'End Turn'}
              </button>
            )}
          </div>
        )}

        {pendingEvents.map((event) => {
          if (activeEventIds.has(event.id)) return null;
          const template = (window as any).__EVENT_TEMPLATES__?.[event.eventId];
          return (
            <EventCard
              key={event.id}
              event={event}
              template={template}
              onChoice={(choiceIdx) => {
                handleDismissEvent(event.id);
              }}
            />
          );
        })}

        <EducationPanel
          open={showEducation}
          onClose={() => setShowEducation(false)}
          entries={state.educationHistory}
          markRead={markEducationRead}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Cash" value={`$${state.player.stats.cash.toLocaleString()}`} icon="💰" color="green" />
          <StatCard label="Revenue / Month" value={`$${state.company.stats.revenue.toLocaleString()}`} icon="📈" color="blue" />
          <StatCard label="Profit" value={`$${state.company.stats.profit.toLocaleString()}`} icon="💎" color="teal" trend={state.company.stats.profit >= 0 ? 'up' : 'down'} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Customers" value={state.company.stats.customers} icon="👥" color="purple" />
          <StatCard label="Runway" value={`${Math.round(state.company.stats.runway)} months`} icon="⏱️" color="amber" />
          <StatCard label="Product Quality" value={state.company.product.quality} icon="⚙️" color="cyan" />
          <StatCard label="Brand Reputation" value={state.player.stats.reputation} icon="⭐" color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Company Stats</h3>
            <ProgressBar label="Customer Satisfaction" value={state.company.stats.customerSatisfaction} color="bg-blue-500" />
            <ProgressBar label="Employee Morale" value={state.company.stats.employeeMorale} color="bg-green-500" />
            <ProgressBar label="Operational Efficiency" value={state.company.stats.operationalEfficiency} color="bg-purple-500" />
            <ProgressBar label="Market Share" value={state.company.stats.marketShare} color="bg-cyan-500" />
            <ProgressBar label="Product Development" value={state.company.product.totalInvested / 5} color="bg-amber-500" />
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Player Stats</h3>
            <ProgressBar label="Confidence" value={state.player.stats.confidence} color="bg-blue-500" />
            <ProgressBar label="Network" value={state.player.stats.network} color="bg-green-500" />
            <ProgressBar label="Knowledge" value={Object.values(state.player.skillPoints || state.player.skills).reduce((a: number, b: number) => a + b, 0)} color="bg-purple-500" />
            <ProgressBar label="Energy" value={state.player.stats.energy} color="bg-emerald-500" />
            <ProgressBar label="Stress" value={state.player.stats.stress} color="bg-red-500" />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Skills</h3>
          <SkillsDisplay skills={state.player.skills} />
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Business Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">{business.baseMargins.gross * 100}%</div>
              <div className="text-xs text-slate-500">Gross Margin</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{business.baseMargins.net * 100}%</div>
              <div className="text-xs text-slate-500">Net Margin</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{business.growthPotential}/10</div>
              <div className="text-xs text-slate-500">Growth Potential</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{state.company.employees.length}</div>
              <div className="text-xs text-slate-500">Team Members</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Events</h3>
          {state.story.gameLog.length > 0 ? (
            <div className="space-y-3">
              {state.story.gameLog
                .slice(-6)
                .reverse()
                .map((entry) => (
                  <div key={entry.id} className="border-l-3 border-slate-300 pl-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">Month {entry.month}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700`}>
                        {entry.type}
                      </span>
                    </div>
                    <div className="font-medium text-slate-900">{entry.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{entry.description}</div>
                    {entry.consequences && entry.consequences.length > 0 && (
                      <ul className="text-xs text-slate-500 mt-1 list-disc list-inside">
                        {entry.consequences.slice(0, 3).map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-slate-500">No events yet. Start playing to generate a game log.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

interface ChoiceButtonProps {
  choice: any;
  onSelect: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all group"
    >
      <div className="font-medium text-slate-900 group-hover:text-slate-900">{choice.text}</div>
      {choice.consequencesHidden && (
        <div className="text-xs text-slate-400 mt-1">⚠️ Consequences hidden</div>
      )}
      {!choice.consequencesHidden && choice.consequences.slice(0, 2).map((c: any, i: number) => (
        <div key={i} className={`text-xs text-slate-400 mt-1 ${c.hidden ? 'italic' : ''}`}>
          {c.hidden ? `?? ${c.description}` : c.description}
        </div>
      ))}
    </button>
  );
};

export default Dashboard;
