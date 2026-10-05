import { Chapter, StoryNode } from '../types/story';

export const CHAPTERS: Record<number, Chapter> = {
  0: {
    id: 0,
    title: 'Prologue: The Spark',
    description: 'Your life takes an unexpected turn, and an idea forms.',
    objectives: ['Discover your opportunity', 'Choose your background', 'Start your journey'],
    unlockConditions: [],
    nodes: ['prologue-start', 'character-creation', 'background-selection'],
    isMainStory: true,
  },
  1: {
    id: 1,
    title: 'Chapter 1: The Idea',
    description:
      'You discover a potential business opportunity. But is it worth pursuing? The first step is always the hardest.',
    objectives: [
      'Identify a viable business opportunity',
      'Make your first strategic decision',
      'Understand the value of research',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 0 }],
    nodes: ['the-idea-start', 'idea-research', 'idea-validate', 'idea-abandon'],
    isMainStory: true,
  },
  2: {
    id: 2,
    title: 'Chapter 2: The First Customer',
    description:
      'An idea is worthless without demand. Now you must test whether anyone actually wants what you plan to build.',
    objectives: [
      'Validate market demand',
      'Find your first early adopters',
      'Learn customer discovery',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 1 }],
    nodes: ['first-customer-start', 'customer-research', 'build-mvp', 'customer-interview'],
    isMainStory: true,
  },
  3: {
    id: 3,
    title: 'Chapter 3: The First Sale',
    description:
      'You have something people might want. Now can you convince them to pay for it? Pricing, positioning, and persuasion become critical.',
    objectives: [
      'Make your first sale',
      'Understand pricing and value perception',
      'Learn the difference between revenue and profit',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 2 }],
    nodes: ['first-sale-start', 'pricing-decision', 'sales-pitch', 'customer-negotiation'],
    isMainStory: true,
  },
  4: {
    id: 4,
    title: 'Chapter 4: The Team',
    description:
      'Growth has limits as a solo founder. You must decide how and when to bring others on board—and who to trust.',
    objectives: [
      'Hire your first employees or co-founders',
      'Learn to delegate',
      'Navigate the challenges of working with others',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 3 }],
    nodes: ['team-start', 'hiring-decision', 'co-founder', 'team-culture'],
    isMainStory: true,
  },
  5: {
    id: 5,
    title: 'Chapter 5: The First Crisis',
    description:
      'Every company faces its first existential challenge. How you respond will define your path forward.',
    objectives: [
      'Navigate a major setback',
      'Make difficult choices under pressure',
      'Learn resilience and adaptability',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 4 }],
    nodes: ['crisis-start', 'crisis-response', 'crisis-recovery'],
    isMainStory: true,
  },
  6: {
    id: 6,
    title: 'Chapter 6: Cash Flow',
    description:
      'Money coming in does not mean you are profitable. You discover the brutal reality of cash flow management.',
    objectives: [
      'Understand the difference between revenue and cash flow',
      'Manage expenses during tight periods',
      'Plan for financial runway',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 5 }],
    nodes: ['cash-flow-start', 'expense-review', 'funding-decision'],
    isMainStory: true,
  },
  7: {
    id: 7,
    title: 'Chapter 7: Growth',
    description:
      'Your company is gaining traction. But growth is not always good—especially if it comes at the wrong cost.',
    objectives: [
      'Decide on a growth strategy',
      'Balance speed with sustainability',
      'Make strategic resource allocation decisions',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 6 }],
    nodes: ['growth-start', 'growth-strategy', 'scaling-decision', 'growth-costs'],
    isMainStory: true,
  },
  8: {
    id: 8,
    title: 'Chapter 8: The Organization',
    description:
      'Systems, processes, and culture are no longer abstract—they determine whether your company can function without you.',
    objectives: [
      'Develop organizational systems',
      'Shape company culture',
      'Learn leadership beyond individual contribution',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 7 }],
    nodes: ['organization-start', 'culture-building', 'process-system', 'leadership-development'],
    isMainStory: true,
  },
  9: {
    id: 9,
    title: 'Chapter 9: The Competitor',
    description:
      'A stronger competitor enters your market. They have advantages you do not. How do you survive and differentiate?',
    objectives: [
      'Assess competitive threats',
      'Find and exploit market niches',
      'Build sustainable competitive advantages',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 8 }],
    nodes: ['competitor-start', 'differentiation', 'competitive-response', 'innovation-focus'],
    isMainStory: true,
  },
  10: {
    id: 10,
    title: 'Chapter 10: The Decision',
    description:
      'You must decide what kind of company you actually want to build. There is no single right answer—only your answer.',
    objectives: [
      'Define your company\'s future',
      'Evaluate all strategic options',
      'Craft your legacy',
    ],
    unlockConditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 9 }],
    nodes: ['final-start', 'exit-decision', 'legacy-choice'],
    isMainStory: true,
  },
};
