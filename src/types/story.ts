import { GameLogEntry } from './game';

export interface StoryChoice {
  id: string;
  text: string;
  consequences: ChoiceConsequence[];
  consequencesHidden?: boolean;
  requires?: ChoiceRequirement[];
}

export interface ChoiceConsequence {
  type:
    | 'stat-change'
    | 'company-stat-change'
    | 'cash-change'
    | 'knowledge-gain'
    | 'reputation-change'
    | 'network-change'
    | 'relationship-change'
    | 'unlock-chapter'
    | 'trigger-event'
    | 'hiring'
    | 'marketing-investment'
    | 'product-improvement'
    | 'employee-hire'
    | 'debt-change'
    | 'stress-change'
    | 'energy-change'
    | 'chapter-advance'
    | 'join-company'
    | 'invest'
    | 'skill-improve'
    | 'ending'
    | 'time-cost';
  target: string;
  amount: number;
  description: string;
  hidden?: boolean;
}

export interface ChoiceRequirement {
  type: 'stat' | 'company-stat' | 'cash' | 'knowledge' | 'reputation' | 'network' | 'chapter';
  target: string;
  operator: '>=' | '>' | '<=' | '<' | '===' | '!==' | 'between';
  value: number;
  value2?: number;
}

export interface StoryNode {
  id: string;
  chapter: number;
  title: string;
  text: string;
  choices: StoryChoice[];
  nextNodes: string[];
  conditions?: ChoiceRequirement[];
  autoAdvance?: boolean;
  timeCost?: number;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  unlockConditions: ChoiceRequirement[];
  nodes: string[];
  isMainStory: boolean;
}

export interface StoryState {
  currentChapter: number;
  currentNode: string | null;
  visitedNodes: Set<string>;
  activeEvents: ActiveEvent[];
  pendingChoices: PendingChoice[];
  storyFlags: Record<string, boolean>;
  gameLog: GameLogEntry[];
  endingType: string | null;
}

export interface ActiveEvent {
  id: string;
  eventId: string;
  month: number;
  expiresMonth: number;
  choices: StoryChoice[];
  context: Record<string, string | number>;
}

export interface PendingChoice {
  nodeId: string;
  choices: StoryChoice[];
}
