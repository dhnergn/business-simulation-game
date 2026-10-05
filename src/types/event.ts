import { BusinessType, Difficulty } from './game';

export interface EventTemplate {
  id: string;
  title: string;
  description: ((context: Record<string, unknown>) => string);
  choices: EventChoice[];
  conditions: EventCondition[];
  weight: number;
  difficultyModifier: Partial<Record<Difficulty, number>>;
  concepts: string[];
  timeCost: number;
}

export interface EventChoice {
  text: string;
  consequences: EventConsequence[];
  requires?: EventCondition[];
}

export interface EventCondition {
  type: 'player-stat' | 'company-stat' | 'reputation' | 'chapter' | 'cash' | 'runway' | 'employee-count' | 'random';
  target: string;
  operator: '>=' | '>' | '<=' | '<' | '===' | '!==' | 'between';
  value: number;
  value2?: number;
}

export interface EventConsequence {
  type:
    | 'stat-change'
    | 'company-stat-change'
    | 'cash-change'
    | 'knowledge-gain'
    | 'reputation-change'
    | 'network-change'
    | 'relationship-change'
    | 'trigger-event'
    | 'stress-change'
    | 'energy-change'
    | 'employee-change'
    | 'customer-change'
    | 'product-change'
    | 'culture-change'
    | 'ending'
    | 'chapter-advance'
    | 'join-company'
    | 'invest'
    | 'employee-hire'
    | 'skill-improve'
    | 'time-cost'
    | 'none';
  target: string;
  amount: number;
  description: string;
  probability?: number;
  hidden?: boolean;
}

export interface BusinessDefinition {
  type: BusinessType;
  name: string;
  description: string;
  startupCost: { easy: number; normal: number; hard: number };
  monthlyOverhead: { easy: number; normal: number; hard: number };
  customerAcquisitionDifficulty: number;
  baseMargins: { gross: number; net: number };
  operationalComplexity: number;
  growthPotential: number;
  employeeRequirements: EmployeeRequirement[];
  risks: string[];
  marketDynamics: string;
  defaultCustomerSegments: CustomerSegmentTemplate[];
  defaultChannels: MarketingChannelTemplate[];
  productFocus: ProductFocusTemplate;
  startingValuation: number;
}

export interface EmployeeRequirement {
  role: string;
  minCount: number;
  recommendedSkills: string[];
}

export interface CustomerSegmentTemplate {
  id: string;
  name: string;
  needs: string[];
  budget: number;
  preferences: string[];
  acquisitionCost: number;
  lifetimeValue: number;
  conversionRate: number;
  churnRate: number;
  baseSize: number;
  description: string;
}

export interface MarketingChannelTemplate {
  channelId: string;
  name: string;
  baseCost: number;
  conversionRate: number;
  scalability: number;
  risk: number;
  timeRequirement: number;
  description: string;
}

export interface ProductFocusTemplate {
  quality: number;
  features: number;
  speed: number;
  reliability: number;
  userExperience: number;
  innovation: number;
  developmentCostMultiplier: number;
}
