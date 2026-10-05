export type GamePhase =
  | 'setup'
  | 'chapter'
  | 'event'
  | 'decision'
  | 'turn-resolution'
  | 'game-over';

export type Difficulty = 'easy' | 'normal' | 'hard';

export type BusinessType =
  | 'saas'
  | 'edtech'
  | 'restaurant'
  | 'fitness'
  | 'consulting'
  | 'ecommerce'
  | 'marketing-agency'
  | 'manufacturing'
  | 'mobile-app'
  | 'local-service'
  | 'media'
  | 'creative-agency';

export type Background =
  | 'teacher'
  | 'engineer'
  | 'designer'
  | 'salesperson'
  | 'student'
  | 'corporate-employee'
  | 'freelancer'
  | 'family-business'
  | 'unemployed-entrepreneur';

export type PersonalityTrait =
  | 'analytical'
  | 'intuitive'
  | 'methodical'
  | 'impulsive'
  | 'collaborative'
  | 'independent'
  | 'risk-averse'
  | 'risk-tolerant'
  | 'optimistic'
  | 'pessimistic';

export type RiskTolerance = 'low' | 'medium' | 'high';

export type ConceptId =
  | 'cash-flow'
  | 'customer-validation'
  | 'opportunity-cost'
  | 'unit-economics'
  | 'hiring'
  | 'leadership'
  | 'marketing'
  | 'negotiation'
  | 'competitive-advantage'
  | 'organizational-culture'
  | 'value-creation'
  | 'value-delivery'
  | 'finance'
  | 'operations'
  | 'customer-experience'
  | 'product-development'
  | 'systems-thinking'
  | 'focus'
  | 'disciplined-execution'
  | 'talent-acquisition'
  | 'risk-management'
  | 'supply-chain'
  | 'crisis-management'
  | 'scaling'
  | 'capacity-planning'
  | 'marketing-roi'
  | 'growth-strategy'
  | 'legal-risk'
  | 'compliance'
  | 'crisis-communication'
  | 'trust'
  | 'emergency-funding'
  | 'reputation-management'
  | 'talent-retention'
  | 'cost-management'
  | 'economic-cycles'
  | 'founder-wellbeing'
  | 'strategic-focus';

export type EndingType =
  | 'bootstrapped'
  | 'high-growth'
  | 'sustainable'
  | 'mission-driven'
  | 'family-business'
  | 'global'
  | 'small-profitable'
  | 'founder-exit'
  | 'failed-but-learned';

export interface GameLogEntry {
  id: string;
  month: number;
  type: 'event' | 'decision' | 'financial' | 'hiring' | 'production' | 'turn-summary';
  title: string;
  description: string;
  consequences: string[];
  concepts: ConceptId[];
}
