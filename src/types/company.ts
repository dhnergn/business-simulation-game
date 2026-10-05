import { BusinessType } from './game';

export interface CompanyStats {
  cash: number;
  revenue: number;
  expenses: number;
  profit: number;
  cashFlow: number;
  customers: number;
  customerSatisfaction: number;
  brandReputation: number;
  employeeMorale: number;
  productivity: number;
  productQuality: number;
  operationalEfficiency: number;
  marketShare: number;
  companyValuation: number;
  debt: number;
  runway: number;
  revenuePerUser: number;
  customerLifetimeValue: number;
  churnRate: number;
}

export interface Company {
  id: string;
  name: string;
  businessType: BusinessType;
  month: number;
  stats: CompanyStats;
  employees: Employee[];
  customers: CustomerSegment[];
  marketingChannels: MarketingChannelState[];
  product: ProductState;
  culture: CultureState;
  financialHistory: FinancialRecord[];
  notes: string[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  skills: Partial<import('./player').SkillSet>;
  salary: number;
  motivation: number;
  productivity: number;
  loyalty: number;
  personality: string;
  hiredMonth: number;
  experience: number;
  performanceRating: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  needs: string[];
  budget: number;
  preferences: string[];
  acquisitionCost: number;
  lifetimeValue: number;
  satisfaction: number;
  churnRate: number;
  conversionRate: number;
  count: number;
}

export interface MarketingChannelState {
  channelId: string;
  invested: number;
  conversions: number;
  costPerAcquisition: number;
  isActive: boolean;
}

export interface ProductState {
  quality: number;
  features: number;
  speed: number;
  reliability: number;
  userExperience: number;
  innovation: number;
  developmentBudget: number;
  totalInvested: number;
}

export interface CultureState {
  discipline: number;
  innovation: number;
  riskTaking: number;
  employeeAutonomy: number;
  customerObsession: number;
  efficiency: number;
  growthOrientation: number;
  stability: number;
}

export interface FinancialRecord {
  month: number;
  revenue: number;
  grossProfit: number;
  operatingExpenses: number;
  operatingProfit: number;
  netCashFlow: number;
  cash: number;
}
