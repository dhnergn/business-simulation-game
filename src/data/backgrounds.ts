import { BackgroundBonus } from '../types/player';
import { Background } from '../types/game';

export const BACKGROUND_BONUSES: Record<Background, BackgroundBonus> = {
  teacher: {
    description:
      'Your classroom experience gives you strong communication skills and a deep understanding of how people learn, but you have limited personal capital.',
    skillBonuses: { marketing: 5, leadership: 3, product: 3 },
    cashBonus: 500,
    reputationBonus: 2,
    networkBonus: 1,
    startingKnowledge: 15,
  },
  engineer: {
    description:
      'Years of building systems give you a disciplined mind for problem-solving and product development, though sales and networking are less familiar.',
    skillBonuses: { product: 6, operations: 4, finance: 3, strategicThinking: 3 },
    cashBonus: 1200,
    reputationBonus: 1,
    networkBonus: 1,
    startingKnowledge: 20,
  },
  designer: {
    description:
      'You understand aesthetics, user empathy, and creative problem-solving. Your network leans toward creative industries but your bank account is modest.',
    skillBonuses: { product: 5, marketing: 4, innovation: 3 },
    cashBonus: 800,
    reputationBonus: 2,
    networkBonus: 2,
    startingKnowledge: 15,
  },
  salesperson: {
    description:
      'You know how to close deals and read people. Your charisma opens doors, but you may have skipped the technical details.',
    skillBonuses: { sales: 6, negotiation: 5, leadership: 3, network: 3 },
    cashBonus: 600,
    reputationBonus: 3,
    networkBonus: 5,
    startingKnowledge: 10,
  },
  student: {
    description:
      'Fresh out of academia with theoretical knowledge and boundless energy, but little practical experience or capital.',
    skillBonuses: { strategicThinking: 4, product: 3 },
    cashBonus: 300,
    reputationBonus: 0,
    networkBonus: 0,
    startingKnowledge: 25,
  },
  'corporate-employee': {
    description:
      'You have spent years inside a large corporation. You understand processes, politics, and structure, but risk-taking and entrepreneurship are untested.',
    skillBonuses: { operations: 5, finance: 4, leadership: 4 },
    cashBonus: 2500,
    reputationBonus: 2,
    networkBonus: 1,
    startingKnowledge: 12,
  },
  freelancer: {
    description:
      'You have worked across many projects and industries. You have a diverse skill set and a modest client network.',
    skillBonuses: { product: 4, sales: 3, operations: 3, marketing: 2 },
    cashBonus: 1500,
    reputationBonus: 1,
    networkBonus: 4,
    startingKnowledge: 18,
  },
  'family-business': {
    description:
      'You grew up around business. You understand operations and cash flow from day one, and family connections can help.',
    skillBonuses: { operations: 5, finance: 4, leadership: 3 },
    cashBonus: 1800,
    reputationBonus: 1,
    networkBonus: 3,
    startingKnowledge: 16,
  },
  'unemployed-entrepreneur': {
    description:
      'You are starting from the bottom. Nothing to lose, everything to gain. Your lack of resources is matched by raw determination.',
    skillBonuses: { leadership: 2, sales: 2 },
    cashBonus: 200,
    reputationBonus: 0,
    networkBonus: 0,
    startingKnowledge: 5,
  },
};

export const INITIAL_CAPITAL_TIERS = {
  low: 1000,
  medium: 5000,
  high: 15000,
} as const;

export const DIFFICULTY_SETTINGS: Record<
  Difficulty,
  {
    name: string;
    description: string;
    startingCapitalMultiplier: number;
    marketCompetition: number;
    eventFrequency: number;
    financialPressure: number;
    uncertainty: number;
    growthRate: number;
  }
> = {
  easy: {
    name: 'Easy — The Learning Path',
    description:
      'A forgiving economy with larger starting capital. Focus on learning the systems without harsh consequences.',
    startingCapitalMultiplier: 1.5,
    marketCompetition: 0.6,
    eventFrequency: 0.7,
    financialPressure: 0.6,
    uncertainty: 0.5,
    growthRate: 0.7,
  },
  normal: {
    name: 'Normal — The Realistic Path',
    description: 'Standard business challenges with realistic economic pressures.',
    startingCapitalMultiplier: 1.0,
    marketCompetition: 1.0,
    eventFrequency: 1.0,
    financialPressure: 1.0,
    uncertainty: 1.0,
    growthRate: 1.0,
  },
  hard: {
    name: 'Hard — The Gauntlet',
    description:
      'Low starting capital, volatile markets, and expensive mistakes. Every decision matters.',
    startingCapitalMultiplier: 0.6,
    marketCompetition: 1.6,
    eventFrequency: 1.4,
    financialPressure: 1.6,
    uncertainty: 1.5,
    growthRate: 1.8,
  },
};
