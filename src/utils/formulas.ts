import { CompanyStats } from '../types/company';
import { SkillSet } from '../types/player';
import { BusinessDefinition } from '../types/event';

export interface FinancialCalculations {
  grossProfit: number;
  operatingExpenses: number;
  operatingProfit: number;
  netCashFlow: number;
  cashBurn: number;
  runway: number;
  revenue: number;
  cogs: number;
  employeeCosts: number;
  marketingCosts: number;
  overheadCosts: number;
  taxEstimate: number;
}

export function calculateFinancials(
  stats: CompanyStats,
  skills: SkillSet,
  business: BusinessDefinition,
  employeeCount: number,
  marketingSpend: number,
  month: number,
): FinancialCalculations {
  const grossMargin = business.baseMargins.gross;
  const revenue = stats.revenue;
  const cogs = revenue * (1 - grossMargin);
  const grossProfit = revenue * grossMargin;

  const baseOverhead = business.monthlyOverhead.normal;
  const overheadCosts = baseOverhead * (1 + employeeCount * 0.1);

  const baseEmployeeCost = employeeCount * 2000;
  const employeeCostEfficiency = Math.min(1, skills.operations / 50);
  const employeeCosts = baseEmployeeCost * (1 - employeeCostEfficiency * 0.2);

  const actualMarketingCosts = marketingSpend;

  const efficiencyFactor = Math.min(1, stats.operationalEfficiency / 100);
  const adjustedOverhead = overheadCosts * (1 - efficiencyFactor * 0.3);

  const taxEstimate = Math.max(0, (grossProfit - adjustedOverhead - employeeCosts) * 0.15);

  const operatingExpenses = adjustedOverhead + employeeCosts + actualMarketingCosts;
  const operatingProfit = grossProfit - operatingExpenses;

  const totalCosts = cogs + operatingExpenses;
  const netCashFlow = revenue - totalCosts - taxEstimate;

  const avgMonthlyBurn = Math.abs(netCashFlow) < 1 ? 1 : Math.abs(netCashFlow);
  const runway = stats.cash > 0 ? Math.max(0, stats.cash / avgMonthlyBurn) : 0;

  return {
    grossProfit,
    operatingExpenses,
    operatingProfit,
    netCashFlow,
    cashBurn: netCashFlow < 0 ? Math.abs(netCashFlow) : 0,
    runway,
    revenue,
    cogs,
    employeeCosts,
    marketingCosts: actualMarketingCosts,
    overheadCosts: adjustedOverhead,
    taxEstimate,
  };
}

export interface CustomerMetrics {
  newCustomers: number;
  churnedCustomers: number;
  netNewCustomers: number;
  acquisitionCost: number;
  revenuePerCustomer: number;
  conversionRate: number;
  totalCustomerValue: number;
  customerSatisfactionChange: number;
  channelConversions: Record<string, number>;
}

export function calculateCustomerMetrics(
  segments: Array<{
    conversionRate: number;
    acquisitionCost: number;
    lifetimeValue: number;
    churnRate: number;
    count: number;
    baseSize: number;
    budget: number;
  }>,
  marketingSpend: Record<string, number>,
  channels: Array<{ channelId: string; conversionRate: number; scalability: number }>,
  skills: SkillSet,
  productQuality: number,
  brandReputation: number,
  month: number,
): CustomerMetrics {
  let newCustomers = 0;
  let totalAcquisitionCost = 0;
  let totalRevenuePerCustomer = 0;
  const channelConversions: Record<string, number> = {};

  const marketingSkillFactor = 1 + (skills.marketing - 5) / 100;
  const productQualityFactor = 1 + (productQuality - 50) / 200;
  const reputationFactor = 1 + (brandReputation - 50) / 200;

  segments.forEach((seg) => {
    const baseConversion = seg.conversionRate;
    const marketingScale = Object.values(marketingSpend).reduce((a, b) => a + b, 0);
    const channelEffectiveness = 1 + (marketingScale / 5000) * 0.3;

    const effectiveConversion = Math.max(0, Math.min(1, baseConversion * marketingSkillFactor * productQualityFactor * channelEffectiveness));

    const potentialCustomers = Math.floor(seg.baseSize * 0.1);
    const conversions = Math.floor(potentialCustomers * effectiveConversion);

    channelConversions[seg.id] = conversions;

    newCustomers += conversions;
    totalAcquisitionCost += conversions * seg.acquisitionCost;
    totalRevenuePerCustomer += conversions * seg.budget;
  });

  const churnRate = segments.reduce((sum, s) => sum + s.churnRate * s.count, 0) / Math.max(1, segments.length);
  const churnedCustomers = Math.round(newCustomers * churnRate);

  const satisfactionChange = (productQualityFactor - 1) * 3 + (reputationFactor - 1) * 2;

  const avgAcquisitionCost = newCustomers > 0 ? totalAcquisitionCost / newCustomers : 0;
  const avgRevenuePerCustomer = newCustomers > 0 ? totalRevenuePerCustomer / newCustomers : 0;

  return {
    newCustomers,
    churnedCustomers: Math.min(churnedCustomers, newCustomers + 1),
    netNewCustomers: newCustomers - churnedCustomers,
    acquisitionCost: avgAcquisitionCost,
    revenuePerCustomer: avgRevenuePerCustomer,
    conversionRate: newCustomers > 0 ? newCustomers / Math.max(1, segments.reduce((s, seg) => s + seg.baseSize * 0.1, 0)) : 0,
    totalCustomerValue: newCustomers * avgRevenuePerCustomer,
    customerSatisfactionChange: satisfactionChange,
    channelConversions,
  };
}

export function calculateEmployeeMetrics(
  employees: Array<{ salary: number; motivation: number; productivity: number; skills: Record<string, number> }>,
  culture: Record<string, number>,
  skills: SkillSet,
): { monthlyCosts: number; totalProductivity: number; moraleImpact: number; turnoverRisk: number } {
  const monthlyCosts = employees.reduce((sum, e) => sum + e.salary, 0);

  const baseProductivity = employees.reduce((sum, e) => sum + e.productivity, 0);
  const leadershipFactor = 1 + (skills.leadership - 5) / 100;
  const moraleFactor = 1 + (culture.employeeAutonomy - 50) / 200;
  const totalProductivity = baseProductivity * leadershipFactor * moraleFactor;

  const avgMotivation = employees.reduce((sum, e) => sum + e.motivation, 0) / Math.max(1, employees.length);
  const moraleImpact = (avgMotivation - 50) / 50;

  const disciplineFactor = culture.discipline / 100;
  const turnoverRisk = Math.max(0, 0.15 - disciplineFactor * 0.1 - moraleImpact * 0.05);

  return {
    monthlyCosts,
    totalProductivity: Math.max(0, totalProductivity),
    moraleImpact,
    turnoverRisk: Math.max(0, Math.min(1, turnoverRisk)),
  };
}

export function calculateRunway(cash: number, monthlyBurn: number): number {
  if (monthlyBurn <= 0) return Infinity;
  if (cash <= 0) return 0;
  return cash / monthlyBurn;
}

export function calculateValuation(stats: CompanyStats, month: number): number {
  let valuation = stats.revenue * 3;

  if (stats.profit > 0) valuation += stats.profit * 12;
  else valuation -= Math.abs(stats.profit) * 6;

  valuation *= 1 + (stats.customerSatisfaction - 50) / 200;
  valuation *= 1 + (stats.brandReputation - 50) / 200;
  valuation *= 1 + (stats.productQuality - 50) / 200;
  valuation *= 1 + (stats.employeeMorale - 50) / 200;

  valuation *= 1 + month * 0.02;

  return Math.round(Math.max(0, valuation));
}

export function calculateSkillGain(currentSkill: number, learningAmount: number, difficulty: number = 1): number {
  const effectiveLearning = learningAmount / difficulty;
  const diminishingReturns = Math.max(0.1, 1 - currentSkill / 200);
  return Math.round(effectiveLearning * diminishingReturns);
}

export function clampStat(value: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateStressChange(
  currentStress: number,
  workload: number,
  supportLevel: number,
): number {
  const baseStress = workload * 0.5;
  const supportReduction = supportLevel * 0.3;
  return Math.round((baseStress - supportReduction) * (0.8 + currentStress / 200));
}
