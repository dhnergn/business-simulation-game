import { PlayerCustomization, PlayerStats, SkillSet } from './player';
import { Company, CompanyStats, Employee, CustomerSegment, MarketingChannelState, ProductState, CultureState, FinancialRecord } from './company';
import { Character, Relationship } from './character';
import { StoryState, ActiveEvent } from './story';
import { Difficulty, BusinessType } from './game';

export interface GameState {
  version: string;
  difficulty: Difficulty;
  player: {
    customization: PlayerCustomization;
    stats: PlayerStats;
    skills: SkillSet;
    level: number;
    experience: number;
  };
  company: {
    name: string;
    businessType: BusinessType;
    month: number;
    stats: CompanyStats;
    employees: Employee[];
    customerSegments: CustomerSegment[];
    marketingChannels: MarketingChannelState[];
    product: ProductState;
    culture: CultureState;
    financialHistory: FinancialRecord[];
    notes: string[];
    monthlyExpenses: number;
    monthlyRevenue: number;
    totalMarketingSpend: number;
    totalInvestment: number;
  };
  characters: Record<string, Character>;
  relationships: Record<string, Relationship>;
  story: StoryState;
  activeEvents: ActiveEvent[];
  availableActions: AvailableAction[];
  educationHistory: EducationEntry[];
  gameOver: {
    isOver: boolean;
    endingType: string | null;
    reason: string | null;
    summary: string[];
  };
}

export interface AvailableAction {
  id: string;
  type: 'research' | 'hire' | 'improve-product' | 'marketing' | 'finance' | 'networking' | 'meet-character' | 'customer-interview' | 'reduce-expenses' | 'train-leadership' | 'systemize';
  label: string;
  description: string;
  cost: { cash?: number; energy?: number; month?: number };
  requirements?: ActionRequirement[];
  effects: ActionEffect[];
}

export interface ActionRequirement {
  type: 'cash' | 'player-stat' | 'company-stat' | 'knowledge' | 'chapter';
  target: string;
  min: number;
}

export interface ActionEffect {
  type: 'stat-change' | 'company-stat-change' | 'cash-change' | 'knowledge-gain' | 'skill-improve' | 'customer-change' | 'employee-hire' | 'product-change' | 'culture-change' | 'reputation-change' | 'network-change';
  target: string;
  amount: number;
  description: string;
}

export interface EducationEntry {
  id: string;
  month: number;
  conceptId: string;
  title: string;
  triggeredBy: string;
  read: boolean;
}

export interface NewGameState {
  difficulty: Difficulty;
  playerName: string;
  background: string;
  businessType: BusinessType;
  companyName: string;
  riskTolerance: string;
  personalityTraits: string[];
  initialCapital: number;
}
