import { GameState } from '../types/gameState';
import { StoryNode, StoryChoice, ChoiceConsequence, Chapter } from '../types/story';
import { StoryState } from '../types/story';
import { EVENT_TEMPLATES } from '../data/events';
import { STORY_NODES } from '../data/storyNodes';
import { CHAPTERS } from '../data/chapters';
import { BUSINESS_DEFINITIONS } from '../data/businesses';
import { CHARACTERS } from '../data/characters';
import { DIFFICULTY_SETTINGS } from '../data/backgrounds';
import { ConceptExplanation, CONCEPT_EXPLANATIONS } from '../data/concepts';
import { calculateFinancials, calculateCustomerMetrics, calculateEmployeeMetrics, calculateValuation, clampStat, calculateSkillGain } from '../utils/formulas';
import { SkillSet } from '../types/player';
import { MAX_STAT, MIN_STAT, ConceptId, EndingType } from '../types/game';

export class GameEngine {
  private state: GameState;
  private conceptMap: Record<string, ConceptExplanation>;

  constructor(initialState: GameState) {
    this.state = initialState;
    this.conceptMap = CONCEPT_EXPLANATIONS;
  }

  getState(): GameState {
    return this.state;
  }

  setState(state: GameState): void {
    this.state = state;
  }

  // ─── TURN PROCESSING ────────────────────────────────────────────────────

  processTurn(): { newState: GameState; logEntries: any[]; education: any[] } {
    const logEntries: any[] = [];
    const education: any[] = [];

    this.state.company.month += 1;
    const month = this.state.company.month;

    const beforeStats = { ...this.state.company.stats };

    this.runFinancialSimulation();
    this.runCustomerSimulation();
    this.runEmployeeSimulation();
    this.generateAndProcessEvents();
    this.updateDerivedStats();
    this.regenerateActions();

    const logEntry = this.createTurnLogEntry(month, beforeStats);
    logEntries.push(logEntry);

    const newEducation = this.triggerEducationIfAppropriate(logEntry);
    education.push(...newEducation);

    this.checkGameOver();

    return { newState: this.state, logEntries, education };
  }

  private runFinancialSimulation(): void {
    const business = BUSINESS_DEFINITIONS[this.state.company.businessType];
    const employeeCount = this.state.company.employees.length;
    const marketingSpend = this.state.company.totalMarketingSpend / Math.max(1, this.state.company.month);

    const fin = calculateFinancials(
      this.state.company.stats,
      this.state.player.skills,
      business,
      employeeCount,
      marketingSpend,
      this.state.company.month,
    );

    const stats = this.state.company.stats;
    stats.revenue = this.state.company.monthlyRevenue;
    stats.expenses = fin.operatingExpenses + fin.cogs + fin.taxEstimate;
    stats.profit = fin.operatingProfit;
    stats.cashFlow = fin.netCashFlow;
    stats.cash = (stats.cash || 0) + fin.netCashFlow;
    stats.runway = fin.runway;

    this.state.player.stats.cash = stats.cash;

    stats.companyValuation = calculateValuation(stats, this.state.company.month);

    this.state.company.financialHistory.push({
      month: this.state.company.month,
      revenue: fin.revenue,
      grossProfit: fin.grossProfit,
      operatingExpenses: fin.operatingExpenses,
      operatingProfit: fin.operatingProfit,
      netCashFlow: fin.netCashFlow,
      cash: stats.cash,
    });

    this.state.company.totalMarketingSpend = 0;
  }

  private runCustomerSimulation(): void {
    const skills = this.state.player.skills;
    const productQuality = this.state.company.product.quality;
    const brandReputation = this.state.company.stats.brandReputation;

    const segmentData = this.state.company.customerSegments.map((seg) => ({
      id: seg.id,
      conversionRate: seg.conversionRate,
      acquisitionCost: seg.acquisitionCost,
      lifetimeValue: seg.lifetimeValue,
      churnRate: seg.churnRate,
      count: seg.count,
      baseSize: seg.size,
      budget: seg.budget,
    }));

    const marketingSpend: Record<string, number> = {};
    this.state.company.marketingChannels.forEach((ch) => {
      marketingSpend[ch.channelId] = ch.invested;
    });

    const channels = this.getChannelsForSimulation();

    const metrics = calculateCustomerMetrics(
      segmentData,
      marketingSpend,
      channels,
      skills,
      productQuality,
      brandReputation,
      this.state.company.month,
    );

    this.state.company.stats.customers += metrics.netNewCustomers;
    this.state.company.stats.customers = Math.max(0, this.state.company.stats.customers);

    const satisfactionChange = metrics.customerSatisfactionChange;
    this.state.company.stats.customerSatisfaction = clampStat(
      this.state.company.stats.customerSatisfaction + satisfactionChange * 2,
    );

    this.state.company.stats.churnRate = (
      this.state.company.customerSegments.reduce((s, seg) => s + seg.churnRate * seg.count, 0) /
      Math.max(1, this.state.company.stats.customers)
    );
    this.state.company.stats.revenuePerUser = this.state.company.stats.customers > 0
      ? (this.state.company.monthlyRevenue || 0) / this.state.company.stats.customers
      : 0;
    this.state.company.stats.customerLifetimeValue = this.state.company.stats.customers > 0
      ? this.state.company.customerSegments.reduce((s, seg) => s + seg.lifetimeValue, 0) / this.state.company.customerSegments.length
      : 0;

    this.state.company.customerSegments.forEach((seg) => {
      const conversions = metrics.channelConversions[seg.id] || 0;
      seg.count += conversions;
      seg.count = Math.max(0, seg.count - Math.round(seg.count * seg.churnRate));
    });

    this.state.company.stats.marketShare = Math.min(100, this.state.company.stats.customers / 100);
    this.state.company.monthlyRevenue = this.state.company.stats.customers * (this.state.company.stats.revenuePerUser || 50);
  }

  private runEmployeeSimulation(): void {
    const cultureValues = {
      employeeAutonomy: this.state.company.culture.employeeAutonomy,
      discipline: this.state.company.culture.discipline,
    };

    const empMetrics = calculateEmployeeMetrics(
      this.state.company.employees,
      cultureValues,
      this.state.player.skills,
    );

    this.state.company.stats.employeeMorale = clampStat(
      this.state.company.stats.employeeMorale + (empMetrics.moraleImpact * 2),
    );
    this.state.company.stats.productivity = clampStat(
      50 + Math.min(50, empMetrics.totalProductivity / Math.max(1, this.state.company.employees.length) * 2),
    );
    this.state.company.stats.operationalEfficiency = clampStat(
      this.state.company.stats.operationalEfficiency + (empMetrics.moraleImpact * 1.5),
    );

    if (Math.random() < empMetrics.turnoverRisk && this.state.company.employees.length > 0) {
      const randomEmployee = this.state.company.employees[Math.floor(Math.random() * this.state.company.employees.length)];
      const idx = this.state.company.employees.indexOf(randomEmployee);
      if (idx >= 0) {
        this.state.company.employees.splice(idx, 1);
        this.addGameLog(
          'event',
          'Employee Departure',
          `${randomEmployee.name} has decided to leave the company.`,
          ['Team size reduced. Productivity may decline.'],
          [],
        );
      }
    }
  }

  private getChannelsForSimulation(): Array<{ channelId: string; conversionRate: number; scalability: number }> {
    const business = BUSINESS_DEFINITIONS[this.state.company.businessType];
    return business.defaultChannels.map((ch) => ({
      channelId: ch.channelId,
      conversionRate: ch.conversionRate,
      scalability: ch.scalability,
    }));
  }

  private generateAndProcessEvents(): void {
    const month = this.state.company.month;
    const difficulty = this.state.difficulty;
    const settings = DIFFICULTY_SETTINGS[difficulty];

    const triggeredEvents: string[] = [];

    if (this.state.player.stats.stress >= 75) {
      triggeredEvents.push('founder-burnout');
    }
    if (this.state.player.stats.cash < 500) {
      triggeredEvents.push('cash-flow-crisis');
    }
    if (this.state.company.employees.length >= 3) {
      if (Math.random() < 0.08 * settings.eventFrequency) {
        triggeredEvents.push('employee-conflict');
      }
    }

    Object.values(EVENT_TEMPLATES).forEach((template) => {
      if (triggeredEvents.includes(template.id)) return;

      const shouldTrigger = this.checkEventConditions(template, settings);
      if (shouldTrigger) {
        const existingEvent = this.state.activeEvents.find((e) => e.eventId === template.id);
        if (!existingEvent) {
          triggeredEvents.push(template.id);
        }
      }
    });

    triggeredEvents.forEach((eventId) => {
      const template = EVENT_TEMPLATES[eventId];
      if (!template) return;

      const event = this.createActiveEvent(template, month);
      this.state.activeEvents.push(event);

      if (event.eventId === 'meet-maya' && this.state.relationships['maya']) {
        this.state.relationships['maya'].lastInteraction = month;
      }
    });
  }

  private checkEventConditions(template: typeof EVENT_TEMPLATES[keyof typeof EVENT_TEMPLATES], settings: any): boolean {
    if (template.conditions && template.conditions.length > 0) {
      for (const cond of template.conditions) {
        if (!this.evaluateCondition(cond)) return false;
      }
    }
    if (template.weight === 0) return false;

    const baseChance = (template.weight / 100) * settings.eventFrequency;
    const r = Math.random();
    return r < baseChance;
  }

  private evaluateCondition(cond: { type: string; target: string; operator: string; value: number; value2?: number }): boolean {
    let actual: number | boolean = 0;
    let compareValue = cond.value;

    switch (cond.type) {
      case 'player-stat':
        actual = this.getStat(cond.target);
        break;
      case 'company-stat':
        actual = this.getCompanyStat(cond.target);
        break;
      case 'reputation':
        actual = this.state.player.stats.reputation;
        break;
      case 'chapter':
        actual = this.state.story.currentChapter;
        break;
      case 'cash':
        actual = this.state.player.stats.cash;
        break;
      case 'runway':
        actual = this.state.company.stats.runway;
        break;
      case 'employee-count':
        actual = this.state.company.employees.length;
        break;
      case 'story-flag':
        actual = this.state.story.storyFlags[cond.target] ? 1 : 0;
        compareValue = cond.operator === '===' ? 0 : 0;
        if (cond.operator === '===') return (actual as number) === compareValue;
        if (cond.operator === '!==') return (actual as number) !== compareValue;
        break;
      case 'random':
        actual = Math.random();
        break;
    }

    if (typeof actual !== 'number') return false;

    switch (cond.operator) {
      case '>=': return actual >= compareValue;
      case '>': return actual > compareValue;
      case '<=': return actual <= compareValue;
      case '<': return actual < compareValue;
      case '===': return actual === compareValue;
      case '!==': return actual !== compareValue;
      case 'between':
        return actual >= compareValue && (cond.value2 !== undefined ? actual <= cond.value2 : true);
      default: return false;
    }
  }

  private createActiveEvent(template: any, month: number): any {
    return {
      id: `evt-${month}-${template.id}-${Math.random().toString(36).substr(2, 9)}`,
      eventId: template.id,
      month,
      expiresMonth: month + 2,
      choices: template.choices,
      context: {},
    };
  }

  private updateDerivedStats(): void {
    const stats = this.state.company.stats;
    stats.cash = this.state.player.stats.cash;
    stats.runway = stats.cash > 0 && stats.expenses > 0 ? stats.cash / Math.max(1, stats.expenses) : 0;
  }

  private regenerateActions(): void {
    this.state.availableActions = this.generateAvailableActions();
  }

  private createTurnLogEntry(month: number, beforeStats: any): any {
    return {
      id: `log-${month}`,
      month,
      type: 'turn-summary' as const,
      title: `Month ${month} Summary`,
      description: `Another month of building your company. Revenue: $${this.formatCurrency(this.state.company.monthlyRevenue || 0)}, Profit: $${this.formatCurrency(this.state.company.stats.profit || 0)}.`,
      consequences: [
        `Cash: ${this.formatCurrency(beforeStats.cash)} → ${this.formatCurrency(this.state.company.stats.cash)}`,
        `Customers: ${beforeStats.customers} → ${this.state.company.stats.customers}`,
        `Revenue: ${this.formatCurrency(beforeStats.revenue)} → ${this.formatCurrency(this.state.company.stats.revenue)}`,
      ],
      concepts: [] as string[],
    };
  }

  private formatCurrency(val: number): string {
    const abs = Math.abs(val);
    if (abs >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val}`;
  }

  private triggerEducationIfAppropriate(logEntry: any): any[] {
    const education: any[] = [];
    const concepts = logEntry.concepts || [];
    if (concepts.length > 0 && Math.random() < 0.5) {
      const conceptId = concepts[Math.floor(Math.random() * concepts.length)] as string;
      const concept = this.conceptMap[conceptId];
      if (concept && !this.hasConceptBeenShown(conceptId)) {
        education.push({
          conceptId,
          title: concept.title,
          explanation: concept.explanation,
          businessPrinciple: concept.businessPrinciple,
        });
        this.markConceptShown(conceptId);
      }
    }
    return education;
  }

  private shownConcepts: Set<string> = new Set();
  private hasConceptBeenShown(conceptId: string): boolean {
    return this.shownConcepts.has(conceptId);
  }
  private markConceptShown(conceptId: string): void {
    this.shownConcepts.add(conceptId);
    this.state.educationHistory.push({
      id: `edu-${this.state.company.month}-${conceptId}`,
      month: this.state.company.month,
      conceptId: conceptId as ConceptId,
      title: this.conceptMap[conceptId]?.title || conceptId,
      triggeredBy: 'game-event',
      read: false,
    });
  }

  // ─── STORY PROCESSING ───────────────────────────────────────────────────

  getCurrentStoryNode(): StoryNode | null {
    if (!this.state.story.currentNode) {
      this.state.story.currentNode = 'prologue-start';
    }
    return STORY_NODES[this.state.story.currentNode] || null;
  }

  applyStoryChoice(choiceId: string): { newState: GameState; logEntry: any; education: any[] } {
    const node = this.getCurrentStoryNode();
    if (!node) {
      return { newState: this.state, logEntry: null, education: [] };
    }

    const choice = node.choices.find((c) => c.id === choiceId);
    if (!choice) {
      return { newState: this.state, logEntry: null, education: [] };
    }

    this.state.story.visitedNodes.add(node.id);
    this.state.story.currentNode = '';

    const consequences: string[] = [];
    const concepts: ConceptId[] = [];

    for (const cons of choice.consequences) {
      this.applyConsequence(cons, consequences, concepts);
    }

    const nextNodeId = this.determineNextNode(node, choice);
    if (nextNodeId) {
      this.state.story.currentNode = nextNodeId;
    }

    const affectedCharacters = Array.from(new Set(consequences.map(() => '')));
    concepts.push(...this.conceptsForStoryNode(node.id));

    const logEntry: any = {
      id: `log-story-${this.state.company.month}-${node.id}-${choiceId}`,
      month: this.state.company.month,
      type: 'decision' as const,
      title: `${node.title}: ${choice.text.substring(0, 50)}`,
      description: choice.text,
      consequences,
      concepts: Array.from(new Set(concepts)),
    };

    this.addGameLogEntry(logEntry);

    const education = this.triggerEducationFromStory(node.id, concepts);
    return { newState: this.state, logEntry, education };
  }

  private conceptsForStoryNode(nodeId: string): ConceptId[] {
    const conceptMap: Record<string, ConceptId[]> = {
      'the-idea-start': ['opportunity-cost', 'value-creation'],
      'first-customer-start': ['customer-validation', 'unit-economics'],
      'first-sale-start': ['sales', 'value-delivery'],
      'team-start': ['hiring', 'talent-acquisition'],
      'crisis-start': ['crisis-management', 'leadership'],
      'cash-flow-start': ['cash-flow', 'finance'],
      'growth-start': ['growth-strategy', 'focus'],
      'organization-start': ['organizational-culture', 'systems-thinking'],
      'competitor-start': ['competitive-advantage', 'differentiation'],
      'final-start': ['leadership', 'organizational-culture'],
    };
    return conceptMap[nodeId] || [];
  }

  private triggerEducationFromStory(nodeId: string, concepts: ConceptId[]): any[] {
    const education: any[] = [];
    const allConcepts = Array.from(new Set([...concepts, ...this.conceptsForStoryNode(nodeId)]));

    for (const conceptId of allConcepts) {
      if (!this.hasConceptBeenShown(conceptId)) {
        const concept = this.conceptMap[conceptId];
        if (concept) {
          education.push({
            conceptId,
            title: concept.title,
            explanation: concept.explanation,
            businessPrinciple: concept.businessPrinciple,
          });
          this.markConceptShown(conceptId);
        }
      }
    }
    return education;
  }

  private determineNextNode(node: StoryNode, choice: StoryChoice): string | null {
    if (choice.consequences.some((c) => c.type === 'chapter-advance')) {
      const chapterAdv = choice.consequences.find((c) => c.type === 'chapter-advance');
      if (chapterAdv) {
        const targetChapter = this.parseChapterTarget(chapterAdv.target);
        if (targetChapter > 0) {
          this.state.story.currentChapter = targetChapter;
          return this.getChapterStartNode(targetChapter);
        }
      }
    }

    if (choice.consequences.some((c) => c.type === 'trigger-event')) {
      const eventCons = choice.consequences.find((c) => c.type === 'trigger-event');
      if (eventCons?.target === 'meet-maya') {
        this.state.story.storyFlags['maya-met'] = true;
        return 'meet-maya';
      }
    }

    if (node.nextNodes && node.nextNodes.length > 0) {
      return node.nextNodes[0];
    }
    return null;
  }

  private parseChapterTarget(target: string): number {
    const match = target.match(/chapter-(\d+)/);
    if (match) return parseInt(match[1], 10);
    if (target === 'chapter-1') return 1;
    if (target === 'chapter-2') return 2;
    return 0;
  }

  private getChapterStartNode(chapter: number): string | null {
    const chapterDef = CHAPTERS[chapter];
    if (chapterDef && chapterDef.nodes.length > 0) {
      return chapterDef.nodes[0];
    }
    return null;
  }

  applyEventChoice(eventId: string, choiceIndex: number): { newState: GameState; logEntry: any } {
    const event = this.state.activeEvents.find((e) => e.id === eventId);
    if (!event) {
      return { newState: this.state, logEntry: null };
    }

    const template = EVENT_TEMPLATES[event.eventId];
    if (!template) {
      return { newState: this.state, logEntry: null };
    }

    const choice = template.choices[choiceIndex];
    if (!choice) {
      return { newState: this.state, logEntry: null };
    }

    const consequences: string[] = [];
    const concepts: ConceptId[] = [];

    for (const cons of choice.consequences) {
      if (cons.probability !== undefined) {
        if (Math.random() < cons.probability) {
          this.applyConsequence(cons, consequences, concepts);
        } else {
          consequences.push(`[${cons.target}] Did not trigger.`);
        }
      } else {
        this.applyConsequence(cons, consequences, concepts);
      }
    }

    const idx = this.state.activeEvents.indexOf(event);
    if (idx >= 0) {
      this.state.activeEvents.splice(idx, 1);
    }

    concepts.push(...template.concepts);

    const logEntry: any = {
      id: `log-event-${this.state.company.month}-${event.id}`,
      month: this.state.company.month,
      type: 'event' as const,
      title: template.title,
      description: '' + (template.description({ context: event.context }) || template.title),
      consequences,
      concepts: Array.from(new Set(concepts)),
    };

    this.addGameLogEntry(logEntry);
    this.triggerEducationFromStory('', concepts);

    return { newState: this.state, logEntry };
  }

  private applyConsequence(
    cons: ChoiceConsequence,
    consequences: string[],
    concepts: ConceptId[],
  ): void {
    switch (cons.type) {
      case 'stat-change':
        if (cons.target === 'cash') {
          this.state.player.stats.cash += cons.amount;
        } else if (cons.target === 'energy') {
          this.state.player.stats.energy = clampStat(this.state.player.stats.energy + cons.amount);
        } else if (cons.target === 'stress') {
          this.state.player.stats.stress = clampStat(this.state.player.stats.stress + cons.amount);
        } else if (cons.target === 'confidence') {
          this.state.player.stats.confidence = clampStat(this.state.player.stats.confidence + cons.amount);
        } else if (cons.target === 'reputation') {
          this.state.player.stats.reputation = clampStat(this.state.player.stats.reputation + cons.amount);
        } else if (cons.target === 'network') {
          this.state.player.stats.network = clampStat(this.state.player.stats.network + cons.amount);
        } else if (cons.target === 'knowledge') {
          this.state.player.stats.knowledge = this.applySkillGain(cons.amount);
        } else {
          this.applyPlayerStatChange(cons.target, cons.amount);
        }
        consequences.push(cons.description || `${cons.target}: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'company-stat-change':
        this.applyCompanyStatChange(cons.target, cons.amount);
        consequences.push(cons.description || `${cons.target}: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'cash-change':
        this.state.player.stats.cash += cons.amount;
        this.state.company.stats.cash = this.state.player.stats.cash;
        consequences.push(cons.description || `Cash: ${cons.amount >= 0 ? '+' : ''}${this.formatCurrency(cons.amount)}`);
        break;

      case 'knowledge-gain':
        this.state.player.skills = this.applySkillGain(cons.amount, cons.target);
        this.state.player.experience += cons.amount * 10;
        this.levelUpIfNeeded();
        consequences.push(cons.description || `+${cons.amount} ${cons.target} knowledge`);
        if (cons.target && typeof cons.target === 'string') {
          concepts.push(cons.target as ConceptId);
        }
        break;

      case 'stat-change':
        break;

      case 'reputation-change':
        this.state.player.stats.reputation = clampStat(this.state.player.stats.reputation + cons.amount);
        this.state.company.stats.brandReputation = clampStat(this.state.company.stats.brandReputation + cons.amount);
        consequences.push(cons.description || `Reputation: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'network-change':
        this.state.player.stats.network = clampStat(this.state.player.stats.network + cons.amount);
        consequences.push(cons.description || `Network: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'relationship-change':
        this.applyRelationshipChange(cons.target, cons.amount);
        consequences.push(cons.description || `Relationship with ${cons.target}: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'product-improvement':
        this.applyProductChange(cons.target, cons.amount);
        consequences.push(cons.description || `Product ${cons.target}: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'company-stat-change':
        this.applyCompanyStatChange(cons.target, cons.amount);
        consequences.push(cons.description);
        break;

      case 'customer-change':
        this.state.company.stats.customers += cons.amount;
        consequences.push(cons.description || `Customers: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'employee-hire':
        this.hireEmployee(cons.target, cons.amount);
        consequences.push(cons.description || `Hired ${cons.target}`);
        break;

      case 'culture-change':
        this.applyCultureChange(cons.target, cons.amount);
        consequences.push(cons.description || `Culture ${cons.target}: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'stress-change':
        this.state.player.stats.stress = clampStat(this.state.player.stats.stress + cons.amount);
        consequences.push(cons.description || `Stress: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'energy-change':
        this.state.player.stats.energy = clampStat(this.state.player.stats.energy + cons.amount);
        consequences.push(cons.description || `Energy: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        break;

      case 'debt-change':
        this.state.company.stats.debt += cons.amount;
        consequences.push(cons.description || `Debt: ${cons.amount >= 0 ? '+' : ''}${cons.amount}`);
        concepts.push('finance');
        break;

      case 'chapter-advance':
        const targetChapter = this.parseChapterTarget(cons.target);
        if (targetChapter > 0) {
          this.state.story.currentChapter = targetChapter;
          consequences.push(cons.description || `Chapter advanced to ${targetChapter}`);
        }
        break;

      case 'trigger-event':
        if (cons.target === 'meet-maya') {
          this.state.story.storyFlags['maya-met'] = true;
        }
        consequences.push(cons.description || `Event triggered: ${cons.target}`);
        break;

      case 'join-company':
        if (cons.amount > 0) {
          this.hireNamedCharacter(cons.target);
          consequences.push(cons.description || `${cons.target} joined the company`);
        }
        break;

      case 'invest':
        this.state.player.stats.cash += cons.amount;
        this.state.company.stats.cash = this.state.player.stats.cash;
        this.state.company.totalInvestment += cons.amount;
        consequences.push(cons.description || `Investment received: ${this.formatCurrency(cons.amount)}`);
        concepts.push('finance');
        break;

      case 'skill-improve':
        this.state.player.skills = this.applySkillGain(cons.amount, cons.target);
        consequences.push(cons.description || `+${cons.amount} ${cons.target} skill`);
        break;

      case 'ending':
        this.state.gameOver.endingType = cons.target as EndingType;
        this.state.gameOver.isOver = true;
        this.state.gameOver.reason = `Your company\'s journey has reached its conclusion.`;
        consequences.push(cons.description || `Ending: ${cons.target}`);
        break;

      default:
        consequences.push(`[${cons.type}] ${cons.description || ''}`);
        break;
    }
  }

  private applyPlayerStatChange(target: string, amount: number): void {
    const statKeys = ['leadership', 'sales', 'operations', 'finance', 'marketing', 'product', 'negotiation', 'strategicThinking'];
    if (statKeys.includes(target)) {
      this.state.player.stats.knowledge[target as keyof SkillSet] = clampStat(
        (this.state.player.stats.knowledge[target as keyof SkillSet] || 0) + amount,
      );
    }
  }

  private applyCompanyStatChange(target: string, amount: number): void {
    const stats = this.state.company.stats;
    const clampKeys = ['customerSatisfaction', 'brandReputation', 'employeeMorale', 'productQuality', 'operationalEfficiency', 'marketShare'];
    if (clampKeys.includes(target)) {
      (stats as any)[target] = clampStat((stats as any)[target] + amount);
    } else if (target === 'cash') {
      stats.cash += amount;
      this.state.player.stats.cash = stats.cash;
    } else if (target === 'profit') {
      stats.profit = amount;
    } else if (target === 'customers') {
      stats.customers += amount;
    } else if (target === 'revenue') {
      stats.revenue += amount;
    } else if (target === 'churnRate') {
      stats.churnRate = clampStat((stats as any)[target] + amount / 100, 0, 1);
    } else if (target === 'companyValuation') {
      stats.companyValuation += amount;
    } else if (target === 'runway') {
      stats.runway = clampStat((stats as any)[target] + amount);
    } else {
      (stats as any)[target] = (stats as any)[target] + amount;
    }
  }

  private applyProductChange(target: string, amount: number): void {
    const product = this.state.company.product;
    const keys = ['quality', 'features', 'speed', 'reliability', 'userExperience', 'innovation'];
    if (keys.includes(target)) {
      (product as any)[target] = clampStat((product as any)[target] + amount);
    }
  }

  private applyCultureChange(target: string, amount: number): void {
    const culture = this.state.company.culture;
    (culture as any)[target] = clampStat((culture as any)[target] + amount);
  }

  private applyRelationshipChange(target: string, amount: number): void {
    if (this.state.relationships[target]) {
      this.state.relationships[target].trust = clampStat(this.state.relationships[target].trust + amount);
      this.state.relationships[target].affinity = clampStat(this.state.relationships[target].affinity + amount);
      this.updateRelationshipStatus(target);
    }
  }

  private updateRelationshipStatus(charId: string): void {
    const rel = this.state.relationships[charId];
    if (!rel) return;
    if (rel.trust >= 80) rel.status = 'confidant';
    else if (rel.trust >= 60) rel.status = 'friend';
    else if (rel.trust >= 40) rel.status = 'contact';
    else if (rel.trust >= 20) rel.status = 'acquaintance';
    else rel.status = 'stranger';

    if (CHARACTERS[charId]?.role === 'Competitor') {
      if (rel.trust < 30) rel.status = 'rival';
    }
  }

  private applySkillGain(amount: number, skillKey?: string): SkillSet {
    const newSkills = { ...this.state.player.skills };
    if (skillKey && (skillKey as keyof SkillSet) in newSkills) {
      const key = skillKey as keyof SkillSet;
      newSkills[key] = clampStat(newSkills[key] + calculateSkillGain(newSkills[key], amount));
    } else {
      const skillKeys = ['leadership', 'sales', 'operations', 'finance', 'marketing', 'product', 'negotiation', 'strategicThinking'];
      const randomKey = skillKeys[Math.floor(Math.random() * skillKeys.length)] as keyof SkillSet;
      newSkills[randomKey] = clampStat(newSkills[randomKey] + calculateSkillGain(newSkills[randomKey], amount));
    }
    return newSkills;
  }

  private levelUpIfNeeded(): void {
    const threshold = this.state.player.level * 100;
    if (this.state.player.experience >= threshold) {
      this.state.player.level += 1;
      this.state.player.skills = this.boostSkills();
      this.addGameLog(
        'financial',
        'Level Up!',
        `You reached Level ${this.state.player.level}. Your skills improve.`,
        ['All primary skills gain +2 points'],
        ['leadership'],
      );
    }
  }

  private boostSkills(): SkillSet {
    const skills = { ...this.state.player.skills };
    const keys = ['leadership', 'sales', 'operations', 'finance', 'marketing', 'product', 'negotiation', 'strategicThinking'];
    keys.forEach((k) => {
      skills[k as keyof SkillSet] = clampStat(skills[k as keyof SkillSet] + 2);
    });
    return skills;
  }

  private hireEmployee(roleId: string, count: number): void {
    const character = Object.values(CHARACTERS).find((c) => c.id === roleId);
    if (character) {
      this.hireNamedCharacter(roleId);
    } else {
      for (let i = 0; i < count; i++) {
        const names = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Quinn', 'Avery'];
        const name = names[Math.floor(Math.random() * names.length)] + ' ' + names[Math.floor(Math.random() * names.length) + 1];
        const roles = ['Developer', 'Marketer', 'Designer', 'Analyst', 'Specialist', 'Coordinator'];
        const role = roles[Math.floor(Math.random() * roles.length)];
        this.state.company.employees.push({
          id: `emp-${Date.now()}-${i}`,
          name,
          role,
          skills: {},
          salary: 3000,
          motivation: 60,
          productivity: 50,
          loyalty: 50,
          personality: 'Balanced',
          hiredMonth: this.state.company.month,
          experience: 2,
          performanceRating: 3,
        });
      }
    }
  }

  private hireNamedCharacter(charId: string): void {
    const character = this.state.characters[charId];
    if (!character) return;

    const roleMap: Record<string, string> = {
      maya: 'CTO',
      emre: 'Sales Lead',
      selin: 'Operations Manager',
    };

    const employee: Employee = {
      id: charId,
      name: character.name,
      role: roleMap[charId] || character.role,
      skills: character.skills || {},
      salary: 5000,
      motivation: 70,
      productivity: character.skills.product || character.skills.operations || 60,
      loyalty: 60,
      personality: character.personality.join(', '),
      hiredMonth: this.state.company.month,
      experience: 5,
      performanceRating: 4,
    };

    this.state.company.employees.push(employee);
    this.state.company.stats.employeeMorale = clampStat(this.state.company.stats.employeeMorale + 10);
  }

  // ─── ACTION SYSTEM ──────────────────────────────────────────────────────

  private generateAvailableActions(): any[] {
    const actions: any[] = [];
    const month = this.state.company.month;
    const chapter = this.state.story.currentChapter;

    if (chapter >= 1) {
      actions.push({
        id: 'action-research',
        type: 'research',
        label: 'Research Market',
        description: 'Invest time and money to understand your market better.',
        cost: { cash: 300, month: 1 },
        effects: [
          { type: 'knowledge-gain' as const, target: 'marketing', amount: 5, description: '+5 Marketing knowledge' },
          { type: 'knowledge-gain' as const, target: 'strategicThinking', amount: 5, description: '+5 Strategic thinking' },
        ],
      });
    }

    if (chapter >= 2) {
      actions.push({
        id: 'action-customer-interview',
        type: 'customer-interview',
        label: 'Interview Customers',
        description: 'Talk to potential and existing customers to gather feedback.',
        cost: { cash: 100, month: 1 },
        effects: [
          { type: 'knowledge-gain' as const, target: 'sales', amount: 4, description: '+4 Sales knowledge' },
          { type: 'network-change' as const, target: 'network', amount: 3, description: '+3 Network' },
        ],
      });
    }

    if (chapter >= 3) {
      actions.push({
        id: 'action-marketing',
        type: 'marketing',
        label: 'Launch Marketing Campaign',
        description: 'Invest in marketing to acquire new customers.',
        cost: { cash: 500, month: 1 },
        effects: [
          { type: 'company-stat-change' as const, target: 'customers', amount: 5, description: '+5 Customers' },
          { type: 'company-stat-change' as const, target: 'brandReputation', amount: 3, description: '+3 Brand Reputation' },
        ],
      });
    }

    if (chapter >= 4) {
      actions.push({
        id: 'action-hire',
        type: 'hire',
        label: 'Hire Employee',
        description: 'Bring on a team member to help grow the company.',
        cost: { cash: 2000, month: 1 },
        effects: [
          { type: 'employee-hire' as const, target: '', amount: 1, description: 'Hired a new employee' },
          { type: 'company-stat-change' as const, target: 'operationalEfficiency', amount: 5, description: '+5 Operational Efficiency' },
        ],
      });
    }

    if (chapter >= 5) {
      actions.push({
        id: 'action-improve-product',
        type: 'improve-product',
        label: 'Improve Product',
        description: 'Invest in product development to enhance quality and features.',
        cost: { cash: 800, month: 1 },
        effects: [
          { type: 'product-improvement' as const, target: 'quality', amount: 4, description: '+4 Product Quality' },
          { type: 'company-stat-change' as const, target: 'customerSatisfaction', amount: 5, description: '+5 Customer Satisfaction' },
          { type: 'knowledge-gain' as const, target: 'product', amount: 3, description: '+3 Product knowledge' },
        ],
      });
    }

    if (chapter >= 6) {
      actions.push({
        id: 'action-finance',
        type: 'finance',
        label: 'Review Finances',
        description: 'Analyze financial statements and optimize spending.',
        cost: { month: 0 },
        effects: [
          { type: 'knowledge-gain' as const, target: 'finance', amount: 6, description: '+6 Finance knowledge' },
          { type: 'company-stat-change' as const, target: 'operationalEfficiency', amount: 4, description: '+4 Operational Efficiency' },
        ],
      });
    }

    if (chapter >= 7) {
      actions.push({
        id: 'action-networking',
        type: 'networking',
        label: 'Network & Build Relationships',
        description: 'Attend events and meet potential partners, investors, or customers.',
        cost: { cash: 200, month: 1 },
        effects: [
          { type: 'network-change' as const, target: 'network', amount: 5, description: '+5 Network' },
          { type: 'relationship-change' as const, target: 'professor-arda', amount: 3, description: '+3 Trust with Professor Arda' },
        ],
      });
    }

    if (chapter >= 8) {
      actions.push({
        id: 'action-systemize',
        type: 'systemize',
        label: 'Systemize Operations',
        description: 'Create repeatable processes and systems for your company.',
        cost: { cash: 500, month: 1 },
        effects: [
          { type: 'company-stat-change' as const, target: 'operationalEfficiency', amount: 8, description: '+8 Operational Efficiency' },
          { type: 'company-stat-change' as const, target: 'productivity', amount: 6, description: '+6 Productivity' },
          { type: 'knowledge-gain' as const, target: 'operations', amount: 5, description: '+5 Operations knowledge' },
        ],
      });
    }

    if (chapter >= 4) {
      actions.push({
        id: 'action-train-leadership',
        type: 'train-leadership',
        label: 'Train Leadership',
        description: 'Invest in your leadership skills and those of your team.',
        cost: { cash: 400, month: 1 },
        effects: [
          { type: 'skill-improve' as const, target: 'leadership', amount: 5, description: '+5 Leadership skill' },
          { type: 'company-stat-change' as const, target: 'employeeMorale', amount: 4, description: '+4 Employee Morale' },
        ],
      });
    }

    if (chapter >= 2) {
      actions.push({
        id: 'action-reduce-expenses',
        type: 'reduce-expenses',
        label: 'Reduce Expenses',
        description: 'Cut non-essential costs to improve cash flow.',
        cost: { month: 0 },
        effects: [
          { type: 'stat-change' as const, target: 'stress', amount: -3, description: '-3 Stress (cost control)' },
          { type: 'company-stat-change' as const, target: 'operationalEfficiency', amount: 3, description: '+3 Operational Efficiency' },
        ],
      });
    }

    return actions;
  }

  processAction(actionId: string): { newState: GameState; logEntry: any } {
    const action = this.state.availableActions.find((a) => a.id === actionId);
    if (!action) {
      return { newState: this.state, logEntry: null };
    }

    const consequences: string[] = [];

    for (const effect of action.effects) {
      const tempEffect: ChoiceConsequence = {
        type: effect.type as any,
        target: effect.target,
        amount: effect.amount,
        description: effect.description,
      };
      this.applyConsequence(tempEffect, consequences, []);
    }

    if (action.cost?.cash) {
      this.state.player.stats.cash -= action.cost.cash;
      this.state.company.stats.cash = this.state.player.stats.cash;
      consequences.push(`Spent $${action.cost.cash} on action.`);
    }

    this.state.player.stats.energy = clampStat(this.state.player.stats.energy - 5);

    const logEntry: any = {
      id: `log-action-${this.state.company.month}-${actionId}`,
      month: this.state.company.month,
      type: 'production',
      title: action.label,
      description: action.description,
      consequences,
      concepts: [],
    };

    this.addGameLogEntry(logEntry);
    return { newState: this.state, logEntry };
  }

  // ─── EVENT QUEUE ────────────────────────────────────────────────────────

  getActiveEvents(): any[] {
    return this.state.activeEvents;
  }

  dismissEvent(eventId: string): void {
    const idx = this.state.activeEvents.findIndex((e) => e.id === eventId);
    if (idx >= 0) {
      this.state.activeEvents.splice(idx, 1);
    }
  }

  // ─── GAME OVER & ENDINGS ────────────────────────────────────────────────

  private checkGameOver(): void {
    if (this.state.gameOver.isOver) return;

    const stats = this.state.company.stats;
    const player = this.state.player.stats;

    if (stats.cash < -5000 && stats.debt > stats.cash + 10000) {
      this.state.gameOver.isOver = true;
      this.state.gameOver.endingType = 'failed-but-learned';
      this.state.gameOver.reason = 'Bankruptcy: You ran out of cash and could not recover.';
      this.buildFailureSummary();
      return;
    }

    if (player.stress >= 95) {
      this.state.gameOver.isOver = true;
      this.state.gameOver.endingType = 'failed-but-learned';
      this.state.gameOver.reason = 'Founder Burnout: Your health and well-being collapsed under the pressure.';
      this.buildFailureSummary();
      return;
    }

    if (this.state.company.month >= 60) {
      this.determineEnding();
    }
  }

  private buildFailureSummary(): void {
    this.state.gameOver.summary = [];

    if (this.state.company.stats.cash < 0) {
      this.state.gameOver.summary.push('Cash flow problems: Revenue never exceeded expenses.');
    }
    if (this.state.player.stats.stress >= 80) {
      this.state.gameOver.summary.push('Stress and burnout affected decision-making quality.');
    }
    if (this.state.company.employees.length > 0 && this.state.company.stats.employeeMorale < 30) {
      this.state.gameOver.summary.push('Poor team management led to low morale and high turnover.');
    }
    if (this.state.company.stats.customerSatisfaction < 30) {
      this.state.gameOver.summary.push('Neglecting customer experience damaged the business.');
    }
    if (this.state.player.stats.reputation < 30) {
      this.state.gameOver.summary.push('Damaged reputation made it harder to attract customers and talent.');
    }

    if (this.state.gameOver.summary.length === 0) {
      this.state.gameOver.summary.push('A combination of factors led to the outcome.');
    }
  }

  private determineEnding(): void {
    const stats = this.state.company.stats;
    const player = this.state.player.stats;
    const culture = this.state.company.culture;

    const isProfitable = stats.profit > 0;
    const isGrowing = stats.revenue > 50000;
    const hasTeam = this.state.company.employees.length > 3;
    const hasHighCulture = culture.discipline > 60 && culture.efficiency > 60;
    const hasHighReputation = player.reputation > 70 && stats.brandReputation > 60;

    if (isProfitable && !isGrowing && !hasTeam) {
      this.state.gameOver.endingType = 'small-profitable';
    } else if (isGrowing && hasTeam) {
      this.state.gameOver.endingType = 'high-growth';
    } else if (hasHighCulture && isProfitable) {
      this.state.gameOver.endingType = 'sustainable';
    } else if (hasHighReputation) {
      this.state.gameOver.endingType = 'mission-driven';
    } else if (hasTeam && !isProfitable) {
      this.state.gameOver.endingType = 'family-business';
    } else {
      this.state.gameOver.endingType = 'bootstrapped';
    }

    this.state.gameOver.isOver = true;
    this.state.gameOver.reason = 'You have completed your journey. The company you built reflects your choices.';
    this.buildEndingSummary();
  }

  private buildEndingSummary(): void {
    this.state.gameOver.summary = [];
    const stats = this.state.company.stats;

    this.state.gameOver.summary.push(`Final company valuation: ${this.formatCurrency(stats.companyValuation)}`);
    this.state.gameOver.summary.push(`Total customers: ${stats.customers}`);
    this.state.gameOver.summary.push(`Employee count: ${this.state.company.employees.length}`);
    this.state.gameOver.summary.push(`Player reputation: ${this.state.player.stats.reputation}`);

    switch (this.state.gameOver.endingType) {
      case 'bootstrapped':
        this.state.gameOver.summary.push('You chose independence over rapid scaling, building a profitable, self-funded business.');
        break;
      case 'high-growth':
        this.state.gameOver.summary.push('You pursued aggressive growth, scaling rapidly to dominate your market.');
        break;
      case 'sustainable':
        this.state.gameOver.summary.push('You prioritized sustainability and long-term thinking over short-term gains.');
        break;
      case 'mission-driven':
        this.state.gameOver.summary.push('You built a company guided by purpose and positive impact.');
        break;
      case 'small-profitable':
        this.state.gameOver.summary.push('You focused on efficiency and profitability, building a lean, profitable company.');
        break;
      case 'family-business':
        this.state.gameOver.summary.push('You grew a close-knit team into a stable, family-like organization.');
        break;
      case 'founder-exit':
        this.state.gameOver.summary.push('You successfully exited your company, turning your vision into realized value.');
        break;
      case 'failed-but-learned':
        this.state.gameOver.summary.push('While the company did not survive, the lessons learned are invaluable for your next venture.');
        break;
    }
  }

  // ─── LOGGING ────────────────────────────────────────────────────────────

  private addGameLogEntry(entry: any): void {
    this.state.story.gameLog.push(entry);
  }

  private addGameLog(type: string, title: string, description: string, consequences: string[], concepts: string[]): void {
    this.state.story.gameLog.push({
      id: `log-${this.state.company.month}-${Math.random().toString(36).substr(2, 9)}`,
      month: this.state.company.month,
      type,
      title,
      description,
      consequences,
      concepts: concepts as ConceptId[],
    });
  }

  // ─── UTILITIES ──────────────────────────────────────────────────────────

  getStat(target: string): number {
    const player = this.state.player;
    if (target === 'cash') return player.stats.cash;
    if (target === 'energy') return player.stats.energy;
    if (target === 'confidence') return player.stats.confidence;
    if (target === 'reputation') return player.stats.reputation;
    if (target === 'network') return player.stats.network;
    if (target === 'stress') return player.stats.stress;
    if ((target as keyof SkillSet) in player.stats.knowledge) {
      return player.stats.knowledge[target as keyof SkillSet];
    }
    return 0;
  }

  getCompanyStat(target: string): number {
    const stats = this.state.company.stats;
    if (target in stats) {
      return (stats as any)[target];
    }
    return 0;
  }

  private formatCurrency(val: number): string {
    const abs = Math.abs(val);
    if (abs >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val}`;
  }

  // ─── SERIALIZATION ──────────────────────────────────────────────────────

  serialize(): string {
    return JSON.stringify({
      ...this.state,
      story: {
        ...this.state.story,
        visitedNodes: Array.from(this.state.story.visitedNodes),
      },
      shownConcepts: Array.from(this.shownConcepts),
    });
  }

  static deserialize(data: string): GameEngine {
    const parsed = JSON.parse(data);
    if (parsed.shownConcepts) {
      (this as any)._shownConcepts = new Set(parsed.shownConcepts);
    }
    if (parsed.story?.visitedNodes) {
      parsed.story.visitedNodes = new Set(parsed.story.visitedNodes);
    }
    return new GameEngine(parsed);
  }
}
