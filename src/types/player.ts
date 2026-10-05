import { Background, BusinessType, PersonalityTrait, RiskTolerance } from './game';

export interface SkillSet {
  leadership: number;
  sales: number;
  operations: number;
  finance: number;
  marketing: number;
  product: number;
  negotiation: number;
  strategicThinking: number;
}

export const INITIAL_SKILLS: SkillSet = {
  leadership: 1,
  sales: 1,
  operations: 1,
  finance: 1,
  marketing: 1,
  product: 1,
  negotiation: 1,
  strategicThinking: 1,
};

export interface PlayerStats {
  cash: number;
  energy: number;
  knowledge: SkillSet;
  confidence: number;
  reputation: number;
  network: number;
  stress: number;
}

export const MAX_STAT = 100;
export const MIN_STAT = 0;

export interface PlayerCustomization {
  name: string;
  background: Background;
  businessType: BusinessType;
  personalityTraits: PersonalityTrait[];
  riskTolerance: RiskTolerance;
  initialCapital: number;
}

export interface BackgroundBonus {
  description: string;
  skillBonuses: Partial<SkillSet>;
  cashBonus: number;
  reputationBonus: number;
  networkBonus: number;
  startingKnowledge: number;
}
