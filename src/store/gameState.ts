import { GameState, NewGameState } from '../types/gameState';
import { PlayerCustomization, PlayerStats, SkillSet, INITIAL_SKILLS } from '../types/player';
import { CompanyStats, Employee, CustomerSegment, MarketingChannelState, ProductState, CultureState } from '../types/company';
import { Relationship, RelationshipStatus } from '../types/character';
import { StoryState } from '../types/story';
import { CHARACTERS, BUSINESS_DEFINITIONS, BACKGROUND_BONUSES, DIFFICULTY_SETTINGS, INITIAL_CAPITAL_TIERS } from '../data';
import { BusinessType, Difficulty, Background, RiskTolerance, PersonalityTrait } from '../types/game';

export const GAME_VERSION = '1.0.0';

export function createInitialStats(): PlayerStats {
  return {
    cash: 0,
    energy: 70,
    knowledge: { ...INITIAL_SKILLS },
    confidence: 50,
    reputation: 50,
    network: 50,
    stress: 20,
  };
}

export function applyBackground(customization: PlayerCustomization, stats: PlayerStats): PlayerStats {
  const bg = BACKGROUND_BONUSES[customization.background];
  stats.cash += bg.cashBonus;
  stats.reputation = Math.min(100, stats.reputation + bg.reputationBonus);
  stats.network = Math.min(100, stats.network + bg.networkBonus);

  (Object.keys(bg.skillBonuses) as (keyof SkillSet)[]).forEach((skill) => {
    const bonus = bg.skillBonuses[skill];
    if (bonus) stats.knowledge[skill] = (stats.knowledge[skill] || 0) + bonus;
  });

  return stats;
}

export function createInitialCompanyStats(cash: number, businessType: BusinessType): CompanyStats {
  const business = BUSINESS_DEFINITIONS[businessType];
  return {
    cash,
    revenue: 0,
    expenses: business.monthlyOverhead.normal,
    profit: 0,
    cashFlow: 0,
    customers: 0,
    customerSatisfaction: 40,
    brandReputation: 20,
    employeeMorale: 60,
    productQuality: 30,
    operationalEfficiency: 40,
    marketShare: 0,
    companyValuation: business.startingValuation,
    debt: 0,
    runway: cash > 0 ? 999 : 0,
    revenuePerUser: 0,
    customerLifetimeValue: 0,
    churnRate: 0.05,
  };
}

export function createInitialProduct(businessType: BusinessType): ProductState {
  const business = BUSINESS_DEFINITIONS[businessType];
  return {
    quality: business.productFocus.quality,
    features: business.productFocus.features,
    speed: business.productFocus.speed,
    reliability: business.productFocus.reliability,
    userExperience: business.productFocus.userExperience,
    innovation: business.productFocus.innovation,
    developmentBudget: 0,
    totalInvested: 0,
  };
}

export function createInitialCulture(): CultureState {
  return {
    discipline: 50,
    innovation: 50,
    riskTaking: 50,
    employeeAutonomy: 50,
    customerObsession: 40,
    efficiency: 50,
    growthOrientation: 40,
    stability: 50,
  };
}

export function createInitialRelationships(): Record<string, Relationship> {
  const relationships: Record<string, Relationship> = {};
  Object.values(CHARACTERS).forEach((char) => {
    relationships[char.id] = {
      characterId: char.id,
      status: 'stranger',
      trust: char.initialTrust,
      affinity: 30,
      history: [],
      lastInteraction: 0,
    };
  });
  return relationships;
}

export function createInitialStoryState(): StoryState {
  return {
    currentChapter: 0,
    currentNode: 'prologue-start',
    visitedNodes: new Set(),
    activeEvents: [],
    pendingChoices: [],
    storyFlags: {},
    gameLog: [],
    endingType: null,
  };
}

export function createNewGameState(config: NewGameState): GameState {
  const difficulty = config.difficulty;
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const baseCapital = config.initialCapital;
  const startingCash = Math.round(baseCapital * settings.startingCapitalMultiplier);

  const customization: PlayerCustomization = {
    name: config.playerName,
    background: config.background as Background,
    businessType: config.businessType,
    personalityTraits: config.personalityTraits as PersonalityTrait[],
    riskTolerance: config.riskTolerance as RiskTolerance,
    initialCapital: config.initialCapital,
  };

  let playerStats = createInitialStats();
  playerStats = applyBackground(customization, playerStats);
  playerStats.cash = startingCash;

  const companyStats = createInitialCompanyStats(startingCash, config.businessType);

  const business = BUSINESS_DEFINITIONS[config.businessType];

  const customerSegments: CustomerSegment[] = business.defaultCustomerSegments.map((seg) => ({
    id: seg.id,
    name: seg.name,
    size: seg.baseSize,
    needs: seg.needs,
    budget: seg.budget,
    preferences: seg.preferences,
    acquisitionCost: seg.acquisitionCost,
    lifetimeValue: seg.lifetimeValue,
    satisfaction: 50,
    churnRate: seg.churnRate,
    conversionRate: seg.conversionRate,
    count: 0,
  }));

  const marketingChannels: MarketingChannelState[] = business.defaultChannels.map((ch) => ({
    channelId: ch.channelId,
    invested: 0,
    conversions: 0,
    costPerAcquisition: 0,
    isActive: false,
  }));

  const playerSkills: SkillSet = { ...INITIAL_SKILLS };

  return {
    version: GAME_VERSION,
    difficulty,
    player: {
      customization,
      stats: playerStats,
      skills: playerSkills,
      level: 1,
      experience: 0,
    },
    company: {
      name: config.companyName || `${config.playerName}'s ${business.name}`,
      businessType: config.businessType,
      month: 0,
      stats: companyStats,
      employees: [],
      customerSegments,
      marketingChannels,
      product: createInitialProduct(config.businessType),
      culture: createInitialCulture(),
      financialHistory: [],
      notes: [],
      monthlyExpenses: business.monthlyOverhead.normal,
      monthlyRevenue: 0,
      totalMarketingSpend: 0,
      totalInvestment: 0,
    },
    characters: { ...CHARACTERS },
    relationships: createInitialRelationships(),
    story: createInitialStoryState(),
    activeEvents: [],
    availableActions: [],
    educationHistory: [],
    gameOver: {
      isOver: false,
      endingType: null,
      reason: null,
      summary: [],
    },
  };
}

export function calculateCompanyStats(state: GameState): CompanyStats {
  const s = state.company.stats;
  s.cash = state.player.stats.cash;
  return s;
}

export function getPlayerSkillPoints(state: GameState): number {
  return state.player.skills.leadership +
         state.player.skills.sales +
         state.player.skills.operations +
         state.player.skills.finance +
         state.player.skills.marketing +
         state.player.skills.product +
         state.player.skills.negotiation +
         state.player.skills.strategicThinking;
}

export function saveGameState(state: GameState): void {
  try {
    const serialized = JSON.stringify({
      ...state,
      story: {
        ...state.story,
        visitedNodes: Array.from(state.story.visitedNodes),
      },
    });
    localStorage.setItem('business-game-state', serialized);
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

export function loadGameState(): GameState | null {
  try {
    const saved = localStorage.getItem('business-game-state');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    parsed.story.visitedNodes = new Set(parsed.story.visitedNodes);
    return parsed as GameState;
  } catch (e) {
    console.error('Failed to load game state:', e);
    return null;
  }
}

export function clearGameState(): void {
  localStorage.removeItem('business-game-state');
}
