import { EventTemplate } from '../types/event';

export const EVENT_TEMPLATES: Record<string, EventTemplate> = {
  'customer-complaint': {
    id: 'customer-complaint',
    title: 'Customer Complaint',
    description: (ctx) =>
      `A customer contacts you about a problem with your ${ctx.productName || 'product'}. They are ${ctx.customerName || 'dissatisfied'} and the issue is ${ctx.issue || 'serious'}.`,
    choices: [
      {
        text: 'Resolve the issue immediately, even at a cost to the company.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -300, description: 'Refund and compensation paid.' },
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: 8, description: '+8 Customer Satisfaction.' },
          { type: 'reputation-change', target: 'reputation', amount: 5, description: '+5 Reputation (customer service).' },
          { type: 'knowledge-gain', target: 'customer-experience', amount: 5, description: 'Learn customer service.' },
        ],
      },
      {
        text: 'Offer a partial solution but explain limitations.',
        consequences: [
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: 3, description: '+3 Customer Satisfaction.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: -5, description: 'Brand reputation takes a hit.' },
        ],
      },
      {
        text: 'Ignore the complaint and hope it goes away.',
        consequences: [
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: -10, description: '-10 Customer Satisfaction.' },
          { type: 'reputation-change', target: 'reputation', amount: -8, description: '-8 Reputation.' },
          { type: 'company-stat-change', target: 'churnRate', amount: 5, description: 'Increased churn rate.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'customers', operator: '>', value: 5 }],
    weight: 15,
    difficultyModifier: { easy: 0.7, normal: 1, hard: 1.3 },
    concepts: ['customer-experience', 'reputation-management'],
    timeCost: 1,
  },
  'employee-resignation': {
    id: 'employee-resignation',
    title: 'Employee Resignation',
    description: (ctx) =>
      ctx.employeeName
        ? `${ctx.employeeName} has resigned${ctx.reason ? ' citing ' + ctx.reason : ''}.`
        : 'A key team member has resigned unexpectedly.',
    choices: [
      {
        text: 'Try to convince them to stay with better terms.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -500, description: 'Retention bonus and salary increase.' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: 5, description: '+5 Employee Morale.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 3, description: 'Learn retention skills.' },
        ],
      },
      {
        text: 'Accept the departure and begin the search for a replacement.',
        consequences: [
          { type: 'company-stat-change', target: 'employeeMorale', amount: -5, description: '-5 Employee Morale (team impact).' },
          { type: 'company-stat-change', target: 'productivity', amount: -8, description: '-8 Productivity.' },
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (team disruption).' },
        ],
      },
      {
        text: 'Offer them a consulting role instead of full-time.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -200, description: 'Consulting contract.' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: 3, description: '+3 Employee Morale (flexibility).' },
          { type: 'stat-change', target: 'energy', amount: -5, description: '-5 Energy (transition overhead).' },
        ],
      },
    ],
    conditions: [{ type: 'employee-count', operator: '>', value: 0 }],
    weight: 12,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.2 },
    concepts: ['talent-retention', 'leadership'],
    timeCost: 1,
  },
  'unexpected-expense': {
    id: 'unexpected-expense',
    title: 'Unexpected Expense',
    description: (ctx) =>
      `An urgent ${ctx.expenseType || 'business'} expense has arisen. ${ctx.description || 'Something needs immediate attention.'}`,
    choices: [
      {
        text: 'Cover the expense from company funds.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -800, description: 'Expense paid.' },
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (financial pressure).' },
        ],
      },
      {
        text: 'Delay payment and negotiate terms.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: -5, description: 'Delayed payment hurts reputation.' },
          { type: 'knowledge-gain', target: 'negotiation', amount: 5, description: 'Learn hard bargaining.' },
        ],
      },
      {
        text: 'Cut corners elsewhere to cover this cost.',
        consequences: [
          { type: 'company-stat-change', target: 'productQuality', amount: -5, description: 'Product quality suffers.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: -3, description: 'Operational shortcuts taken.' },
        ],
      },
    ],
    conditions: [{ type: 'random', target: 'any', operator: '>', value: 0.1 }],
    weight: 10,
    difficultyModifier: { easy: 0.7, normal: 1, hard: 1.5 },
    concepts: ['cost-management', 'crisis-management'],
    timeCost: 1,
  },
  'viral-post': {
    id: 'viral-post',
    title: 'Viral Social Media Post',
    description: (ctx) =>
      `Your ${ctx.contentType || 'recent post'} has gone viral! Thousands of people are seeing your brand for the first time.`,
    choices: [
      {
        text: 'Lean into the momentum with targeted marketing.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1000, description: 'Paid promotion to maximise reach.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 12, description: '+12 Brand Reputation.' },
          { type: 'company-stat-change', target: 'customers', amount: 15, description: '+15 new customers.' },
          { type: 'knowledge-gain', target: 'marketing', amount: 5, description: 'Learn viral marketing.' },
        ],
      },
      {
        text: 'Take a measured approach and manage expectations.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: 8, description: '+8 Brand Reputation.' },
          { type: 'company-stat-change', target: 'customers', amount: 8, description: '+8 new customers.' },
          { type: 'stat-change', target: 'stress', amount: -3, description: '-3 Stress (controlled growth).' },
        ],
      },
      {
        text: 'Let it ride and see where it goes naturally.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: 10, description: '+10 Brand Reputation.' },
          { type: 'company-stat-change', target: 'customers', amount: 5, description: '+5 new customers.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'brandReputation', operator: '>', value: 20 }],
    weight: 8,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['viral-marketing', 'opportunity-cost'],
    timeCost: 1,
  },
  'competitor-launch': {
    id: 'competitor-launch',
    title: 'Competitor Product Launch',
    description: (ctx) =>
      `${ctx.competitorName || 'A competitor'} has launched a new product that directly competes with yours. They are ${ctx.strategy || 'aggressively pricing'}.`,
    choices: [
      {
        text: 'Match their pricing and defend your position.',
        consequences: [
          { type: 'company-stat-change', target: 'profit', amount: -6, description: 'Margins reduced.' },
          { type: 'company-stat-change', target: 'marketShare', amount: 3, description: 'Held market share.' },
          { type: 'knowledge-gain', target: 'marketing', amount: 5, description: 'Learn competitive pricing.' },
        ],
      },
      {
        text: 'Double down on your unique value proposition.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -600, description: 'Marketing to differentiate.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 8, description: '+8 Brand Reputation.' },
          { type: 'company-stat-change', target: 'marketShare', amount: 5, description: 'Gained loyal customers.' },
        ],
      },
      {
        text: 'Innovate and leapfrog their offering.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -2500, description: 'R&D investment.' },
          { type: 'company-stat-change', target: 'productQuality', amount: 10, description: '+10 Product Quality.' },
          { type: 'knowledge-gain', target: 'product', amount: 8, description: 'Advanced product development.' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (competitive pressure).' },
        ],
      },
    ],
    conditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 3 }],
    weight: 10,
    difficultyModifier: { easy: 0.7, normal: 1, hard: 1.3 },
    concepts: ['competitive-advantage', 'differentiation'],
    timeCost: 1,
  },
  'supplier-problem': {
    id: 'supplier-problem',
    title: 'Supplier Issue',
    description: (ctx) =>
      `Your key supplier is experiencing ${ctx.problem || 'a disruption'}. This affects your ability to deliver to customers.`,
    choices: [
      {
        text: 'Find an alternative supplier immediately, even at higher cost.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1200, description: 'Higher supplier rates.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 3, description: '+3 Operational Efficiency.' },
        ],
      },
      {
        text: 'Work with your supplier to resolve the issue together.',
        consequences: [
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: -8, description: 'Delivery delays.' },
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: -5, description: 'Customer frustration.' },
          { type: 'knowledge-gain', target: 'negotiation', amount: 5, description: 'Learn supplier negotiation.' },
        ],
      },
      {
        text: 'Stockpile inventory to weather the disruption.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -2000, description: 'Bulk purchase for safety stock.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 5, description: '+5 Operational Efficiency.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'customers', operator: '>', value: 10 }],
    weight: 8,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.4 },
    concepts: ['supply-chain', 'risk-management'],
    timeCost: 1,
  },
  'investor-meeting': {
    id: 'investor-meeting',
    title: 'Investor Meeting',
    description: (ctx) =>
      `${ctx.investorName || 'An investor'} wants to meet about a potential investment in your company.`,
    choices: [
      {
        text: 'Prepare thoroughly and present your strongest case.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -300, description: 'Meeting preparation costs.' },
          { type: 'knowledge-gain', target: 'finance', amount: 8, description: 'Learn investor pitching.' },
          { type: 'relationship-change', target: 'kerem', amount: 8, description: '+8 Trust with investor.' },
        ],
      },
      {
        text: 'Go in unprepared but rely on passion and charisma.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence.' },
          { type: 'relationship-change', target: 'kerem', amount: 3, description: '+3 Trust (but unconvincing).' },
        ],
      },
      {
        text: 'Decline the meeting—for now.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: -3, description: '-3 Confidence (missed opportunity).' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 5, description: 'Learn timing decisions.' },
        ],
      },
    ],
    conditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 4 }],
    weight: 6,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['fundraising', 'pitch-deck', 'valuation'],
    timeCost: 1,
  },
  'partnership-opportunity': {
    id: 'partnership-opportunity',
    title: 'Partnership Opportunity',
    description: (ctx) =>
      `${ctx.partnerName || 'A potential partner'} has proposed a strategic partnership that could ${ctx.benefit || 'open new markets'}.`,
    choices: [
      {
        text: 'Accept the partnership and integrate quickly.',
        consequences: [
          { type: 'company-stat-change', target: 'customers', amount: 10, description: '+10 customers from partner channel.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: '+5 Brand Reputation.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: -5, description: 'Integration overhead.' },
        ],
      },
      {
        text: 'Negotiate better terms before committing.',
        consequences: [
          { type: 'knowledge-gain', target: 'negotiation', amount: 8, description: 'Learn partnership negotiation.' },
          { type: 'relationship-change', target: 'network', amount: 5, description: '+5 Network.' },
          { type: 'company-stat-change', target: 'customers', amount: 5, description: '+5 customers.' },
        ],
      },
      {
        text: 'Decline—focus on your core strategy.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (focus).' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 5, description: 'Learn strategic focus.' },
        ],
      },
    ],
    conditions: [
      { type: 'reputation', operator: '>=', value: 15 },
      { type: 'chapter', target: 'any', operator: '>=', value: 5 },
    ],
    weight: 7,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['partnerships', 'strategic-alliances'],
    timeCost: 1,
  },
  'employee-conflict': {
    id: 'employee-conflict',
    title: 'Team Conflict',
    description: (ctx) =>
      `Two of your team members are in conflict${ctx.details ? ': ' + ctx.details : ''}. This is affecting team morale and productivity.`,
    choices: [
      {
        text: 'Step in directly to mediate the situation.',
        consequences: [
          { type: 'stat-change', target: 'energy', amount: -5, description: '-5 Energy (mediation effort).' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: 8, description: '+8 Employee Morale.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 7, description: 'Learn conflict resolution.' },
        ],
      },
      {
        text: 'Delegate to HR or a manager.',
        consequences: [
          { type: 'company-stat-change', target: 'employeeMorale', amount: 5, description: '+5 Employee Morale.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: -3, description: 'Process overhead.' },
        ],
      },
      {
        text: 'Hope they work it out themselves.',
        consequences: [
          { type: 'company-stat-change', target: 'employeeMorale', amount: -10, description: '-10 Employee Morale.' },
          { type: 'company-stat-change', target: 'productivity', amount: -8, description: '-8 Productivity.' },
        ],
      },
    ],
    conditions: [{ type: 'employee-count', operator: '>=', value: 3 }],
    weight: 9,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.2 },
    concepts: ['conflict-resolution', 'team-management'],
    timeCost: 1,
  },
  'economic-downturn': {
    id: 'economic-downturn',
    title: 'Economic Downturn',
    description: () => `Economic conditions are worsening. Consumer spending is declining, and businesses are cutting costs.`,
    choices: [
      {
        text: 'Cut costs aggressively to survive the downturn.',
        consequences: [
          { type: 'company-stat-change', target: 'employeeMorale', amount: -8, description: 'Layoffs affect morale.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 5, description: 'Streamlined operations.' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (tough decisions).' },
          { type: 'knowledge-gain', target: 'finance', amount: 6, description: 'Learn recession management.' },
        ],
      },
      {
        text: 'Hold course and maintain investment in the company.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -500, description: 'Burn rate remains high.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: 'Reputation for stability.' },
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (financial risk).' },
        ],
      },
      {
        text: 'Diversify and pivot to weather the storm.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1000, description: 'Investment in new direction.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 8, description: 'Learn crisis pivoting.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (adaptability).' },
        ],
      },
    ],
    conditions: [
      { type: 'chapter', target: 'any', operator: '>=', value: 4 },
      { type: 'random', target: 'any', operator: '>', value: 0.3 },
    ],
    weight: 5,
    difficultyModifier: { easy: 0.5, normal: 1, hard: 1.5 },
    concepts: ['economic-cycles', 'crisis-management'],
    timeCost: 2,
  },
  'bad-review': {
    id: 'bad-review',
    title: 'Bad Online Review',
    description: () => `A customer has left a scathing review online. It is gaining attention and could damage your reputation.`,
    choices: [
      {
        text: 'Respond publicly and offer to make things right.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: '+5 Brand Reputation (professional response).' },
          { type: 'cash-change', target: 'cash', amount: -200, description: 'Compensation to customer.' },
          { type: 'knowledge-gain', target: 'customer-experience', amount: 5, description: 'Learn reputation management.' },
        ],
      },
      {
        text: 'Ignore it—reviews even out over time.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: -8, description: '-8 Brand Reputation.' },
          { type: 'company-stat-change', target: 'customers', amount: -5, description: '-5 customers lost.' },
        ],
      },
      {
        text: 'Reach out privately and resolve the issue.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: 7, description: '+7 Brand Reputation.' },
          { type: 'cash-change', target: 'cash', amount: -150, description: 'Resolution cost.' },
          { type: 'knowledge-gain', target: 'customer-experience', amount: 6, description: 'Learn customer relations.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'brandReputation', operator: '<', value: 50 }],
    weight: 10,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.2 },
    concepts: ['reputation-management', 'customer-service'],
    timeCost: 1,
  },
  'loyal-customer': {
    id: 'loyal-customer',
    title: 'Loyal Customer Advocacy',
    description: () => `A long-time customer goes out of their way to recommend your service to others. Word of mouth is one of the most powerful marketing channels.`,
    choices: [
      {
        text: 'Thank them and ask for an introduction.',
        consequences: [
          { type: 'company-stat-change', target: 'customers', amount: 5, description: '+5 new customers.' },
          { type: 'network-change', target: 'network', amount: 5, description: '+5 Network.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence.' },
        ],
      },
      {
        text: 'Offer them a referral incentive program.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -400, description: 'Referral program cost.' },
          { type: 'company-stat-change', target: 'customers', amount: 10, description: '+10 new customers.' },
        ],
      },
    ],
    conditions: [
      { type: 'company-stat', target: 'customerSatisfaction', operator: '>=', value: 60 },
      { type: 'company-stat', target: 'customers', operator: '>', value: 3 },
    ],
    weight: 8,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['customer-retention', 'referral-marketing'],
    timeCost: 0,
  },
  'founder-burnout': {
    id: 'founder-burnout',
    title: 'Founder Burnout',
    description: () => `You are running on empty. The weight of responsibility, long hours, and constant pressure are taking a toll on your health and well-being.`,
    choices: [
      {
        text: 'Take a step back and prioritise your health.',
        consequences: [
          { type: 'stat-change', target: 'energy', amount: 10, description: '+10 Energy.' },
          { type: 'stat-change', target: 'stress', amount: -15, description: '-15 Stress.' },
          { type: 'company-stat-change', target: 'productivity', amount: -5, description: 'Brief productivity dip.' },
        ],
      },
      {
        text: 'Push through—rest can come later.',
        consequences: [
          { type: 'stat-change', target: 'energy', amount: -10, description: '-10 Energy.' },
          { type: 'stat-change', target: 'stress', amount: 15, description: '+15 Stress.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (perseverance).' },
          { type: 'knowledge-gain', target: 'leadership', amount: 5, description: 'Learn about resilience.' },
        ],
      },
      {
        text: 'Delegate more and hire help.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -800, description: 'New hire salary.' },
          { type: 'stat-change', target: 'stress', amount: -8, description: '-8 Stress.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 5, description: '+5 Operational Efficiency.' },
        ],
      },
    ],
    conditions: [{ type: 'player-stat', target: 'stress', operator: '>=', value: 70 }],
    weight: 0,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.2 },
    concepts: ['founder-wellbeing', 'leadership'],
    timeCost: 1,
  },
  'cash-flow-crisis': {
    id: 'cash-flow-crisis',
    title: 'Cash Flow Crisis',
    description: () => `Your cash runway is dangerously low. Even profitable operations can fail if you run out of cash.`,
    choices: [
      {
        text: 'Seek emergency funding from investors.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 5000, description: 'Emergency investment.' },
          { type: 'stat-change', target: 'stress', amount: -8, description: '-8 Stress (relief).' },
          { type: 'relationship-change', target: 'kerem', amount: -5, description: 'Emergency funding at poor terms.' },
        ],
      },
      {
        text: 'Drastically cut expenses and delay payments.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 800, description: 'Cost savings.' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: -12, description: '-12 Employee Morale.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: -5, description: '-5 Brand Reputation.' },
        ],
      },
      {
        text: 'Try to accelerate receivables and defer payables.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 500, description: 'Cash collected early.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: -3, description: 'Supplier relationships strained.' },
          { type: 'knowledge-gain', target: 'finance', amount: 7, description: 'Learn cash flow management.' },
        ],
      },
    ],
    conditions: [{ type: 'cash', operator: '<', value: 500 }],
    weight: 0,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.2 },
    concepts: ['cash-flow', 'emergency-funding'],
    timeCost: 1,
  },
  'sudden-demand': {
    id: 'sudden-demand',
    title: 'Unexpected Demand Surge',
    description: () => `Demand for your product has surged unexpectedly. You need to scale quickly to meet customer needs.`,
    choices: [
      {
        text: 'Scale up rapidly to capture the opportunity.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -3000, description: 'Scaling investment.' },
          { type: 'company-stat-change', target: 'customers', amount: 25, description: '+25 new customers.' },
          { type: 'company-stat-change', target: 'productQuality', amount: -5, description: 'Quality stretched thin.' },
          { type: 'stat-change', target: 'stress', amount: 10, description: '+10 Stress (scaling pressure).' },
        ],
      },
      {
        text: 'Manage demand carefully to maintain quality.',
        consequences: [
          { type: 'company-stat-change', target: 'customers', amount: 10, description: '+10 new customers.' },
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: 10, description: '+10 Customer Satisfaction.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 8, description: '+8 Brand Reputation.' },
        ],
      },
    ],
    conditions: [
      { type: 'company-stat', target: 'customers', operator: '>', value: 20 },
      { type: 'random', target: 'any', operator: '>', value: 0.4 },
    ],
    weight: 6,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['scaling', 'capacity-planning'],
    timeCost: 1,
  },
  'successful-campaign': {
    id: 'successful-campaign',
    title: 'Marketing Campaign Success',
    description: () => `Your marketing campaign is outperforming expectations. You are acquiring customers at a fraction of the usual cost.`,
    choices: [
      {
        text: 'Reinvest the savings into scaling the campaign.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -800, description: 'Additional ad spend.' },
          { type: 'company-stat-change', target: 'customers', amount: 12, description: '+12 new customers.' },
          { type: 'knowledge-gain', target: 'marketing', amount: 5, description: 'Learn campaign optimisation.' },
        ],
      },
      {
        text: 'Bank the profit and maintain current spend.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 600, description: 'Extra profit retained.' },
          { type: 'company-stat-change', target: 'customers', amount: 5, description: '+5 new customers.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'brandReputation', operator: '>=', value: 30 }],
    weight: 5,
    difficultyModifier: { easy: 1.2, normal: 1, hard: 0.8 },
    concepts: ['marketing-roi', 'growth-strategy'],
    timeCost: 1,
  },
  'product-failure': {
    id: 'product-failure',
    title: 'Product Issue',
    description: () => `A critical bug or defect has been discovered in your product. Customers are affected and trust is at risk.`,
    choices: [
      {
        text: 'Issue a transparent public apology and fix immediately.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1000, description: 'Fix development costs.' },
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: 5, description: 'Customers appreciate honesty.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: '+5 Brand Reputation (trust).' },
          { type: 'knowledge-gain', target: 'customer-experience', amount: 5, description: 'Learn crisis communication.' },
        ],
      },
      {
        text: 'Quietly fix the issue without public announcement.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -700, description: 'Fix costs.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: -5, description: 'Some customers noticed.' },
        ],
      },
      {
        text: 'Blame it on external factors.',
        consequences: [
          { type: 'company-stat-change', target: 'brandReputation', amount: -10, description: '-10 Brand Reputation.' },
          { type: 'company-stat-change', target: 'customers', amount: -8, description: '-8 customers lost.' },
        ],
      },
    ],
    conditions: [{ type: 'company-stat', target: 'productQuality', operator: '<', value: 50 }],
    weight: 6,
    difficultyModifier: { easy: 0.8, normal: 1, hard: 1.3 },
    concepts: ['product-quality', 'crisis-communication', 'trust'],
    timeCost: 1,
  },
  'legal-issue': {
    id: 'legal-issue',
    title: 'Legal Challenge',
    description: () => `You are facing a legal issue that requires attention and potentially costly resolution.`,
    choices: [
      {
        text: 'Settle the matter quickly to avoid prolonged uncertainty.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1500, description: 'Settlement cost.' },
          { type: 'stat-change', target: 'stress', amount: -5, description: '-5 Stress (resolved).' },
        ],
      },
      {
        text: 'Fight the claim vigorously.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -3000, description: 'Legal fees.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: '+5 Brand Reputation (stood ground).' },
          { type: 'stat-change', target: 'stress', amount: 10, description: '+10 Stress (legal battle).' },
        ],
      },
    ],
    conditions: [
      { type: 'chapter', target: 'any', operator: '>=', value: 6 },
      { type: 'random', target: 'any', operator: '>', value: 0.25 },
    ],
    weight: 4,
    difficultyModifier: { easy: 0.7, normal: 1, hard: 1.3 },
    concepts: ['legal-risk', 'compliance'],
    timeCost: 2,
  },
  'meet-maya': {
    id: 'meet-maya',
    title: 'Meeting Maya',
    description: () => `Maya Chen, a talented software architect, crosses your path. She is intrigued by your idea but cautious about jumping in.`,
    choices: [
      {
        text: 'Ask Maya to be your co-founder.',
        consequences: [
          { type: 'relationship-change', target: 'maya', amount: 10, description: 'Maya respects your boldness.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence.' },
        ],
      },
      {
        text: 'Ask Maya for advice first.',
        consequences: [
          { type: 'knowledge-gain', target: 'product', amount: 8, description: 'Valuable technical advice.' },
          { type: 'relationship-change', target: 'maya', amount: 8, description: '+8 Trust with Maya.' },
        ],
      },
      {
        text: 'Try to hire her as an employee.',
        consequences: [
          { type: 'relationship-change', target: 'maya', amount: 5, description: 'Maya is intrigued but unsure about employment.' },
          { type: 'stat-change', target: 'confidence', amount: 3, description: '+3 Confidence.' },
        ],
      },
    ],
    conditions: [{ type: 'story-flag', target: 'maya-met', operator: '===', value: 0 }],
    weight: 0,
    difficultyModifier: { easy: 1, normal: 1, hard: 1 },
    concepts: ['co-founder-selection', 'talent-acquisition'],
    timeCost: 0,
  },
};
