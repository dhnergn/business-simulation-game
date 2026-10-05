import { StoryNode } from '../types/story';

export const STORY_NODES: Record<string, StoryNode> = {
  'prologue-start': {
    id: 'prologue-start',
    chapter: 0,
    title: 'A Moment of Change',
    text: 'You are going about your routine life, but something feels off. A nagging sense that there is more to be done. As you walk home, a conversation with a stranger sparks an idea—something that could solve a problem you have personally experienced. The seed of a business is planted.',
    choices: [
      {
        id: 'embrace-idea',
        text: 'Embrace this idea and commit to exploring it.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: 'Your confidence grows with commitment.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 3, description: 'You begin to think seriously about the opportunity.' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Chapter 1: The Idea begins.' },
        ],
      },
      {
        id: 'hesitate',
        text: 'You are intrigued but want to learn more before committing.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 2, description: 'Cautious optimism sets in.' },
          { type: 'knowledge-gain', target: 'product', amount: 5, description: 'You spend time thinking through the concept.' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Chapter 1: The Idea begins.' },
        ],
      },
    ],
    nextNodes: ['character-creation'],
  },
  'character-creation': {
    id: 'character-creation',
    chapter: 0,
    title: 'Who Are You?',
    text: 'Before you begin, you must understand yourself. Who you are, what you know, and what resources you bring to this journey will shape everything that follows.',
    choices: [],
    nextNodes: ['background-selection'],
    autoAdvance: true,
  },
  'background-selection': {
    id: 'background-selection',
    chapter: 0,
    title: 'Your Background',
    text: 'Every background brings its own advantages and disadvantages. Your past experiences will influence your starting skills, initial capital, and the networks you can access.',
    choices: [
      {
        id: 'bg-teacher',
        text: 'Teacher — Strong communication and learning skills, modest resources.',
        consequences: [
          { type: 'stat-change', target: 'knowledge', amount: 15, description: '+15 Knowledge' },
          { type: 'cash-change', target: 'cash', amount: 500, description: '+$500 starting capital' },
          { type: 'stat-change', target: 'reputation', amount: 2, description: '+2 Reputation' },
          { type: 'stat-change', target: 'network', amount: 1, description: '+1 Network' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Start Chapter 1.' },
        ],
      },
      {
        id: 'bg-engineer',
        text: 'Engineer — Analytical mind, technical skills, and moderate capital.',
        consequences: [
          { type: 'stat-change', target: 'knowledge', amount: 20, description: '+20 Knowledge' },
          { type: 'cash-change', target: 'cash', amount: 1200, description: '+$1,200 starting capital' },
          { type: 'stat-change', target: 'reputation', amount: 1, description: '+1 Reputation' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Start Chapter 1.' },
        ],
      },
      {
        id: 'bg-sales',
        text: 'Salesperson — Natural persuader with strong networks but shallow capital.',
        consequences: [
          { type: 'stat-change', target: 'knowledge', amount: 10, description: '+10 Knowledge' },
          { type: 'cash-change', target: 'cash', amount: 600, description: '+$600 starting capital' },
          { type: 'stat-change', target: 'reputation', amount: 3, description: '+3 Reputation' },
          { type: 'stat-change', target: 'network', amount: 5, description: '+5 Network' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Start Chapter 1.' },
        ],
      },
      {
        id: 'bg-unemployed',
        text: 'Unemployed Entrepreneur — Nothing to lose, everything to gain. Very little cash but raw determination.',
        consequences: [
          { type: 'stat-change', target: 'knowledge', amount: 5, description: '+5 Knowledge' },
          { type: 'cash-change', target: 'cash', amount: 200, description: '+$200 starting capital' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (grit bonus)' },
          { type: 'chapter-advance', target: 'chapter-1', amount: 1, description: 'Start Chapter 1.' },
        ],
      },
    ],
    nextNodes: [],
  },
  'the-idea-start': {
    id: 'the-idea-start',
    chapter: 1,
    title: 'The Opportunity',
    text: 'You have been thinking about this idea for weeks. It came from a personal frustration—a problem you faced that others likely face too. The market for solutions seems sizable, but you are not sure. Do you rush in or take time to validate?',
    choices: [
      {
        id: 'rush-in',
        text: 'A. Start immediately with limited research. Time is of the essence.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -200, description: 'Spend $200 on initial setup.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 5, description: 'Some quick market scanning.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (rushing)' },
          { type: 'time-cost', target: 'month', amount: 1, description: '1 month passes.' },
          { type: 'stat-change', target: 'knowledge', amount: -10, description: 'Missed insights from not researching.' },
        ],
      },
      {
        id: 'research-market',
        text: 'B. Spend money researching the market before building anything.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -500, description: 'Spend $500 on market research.' },
          { type: 'knowledge-gain', target: 'marketing', amount: 10, description: 'Gain market research skills.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 8, description: 'Better understanding of demand.' },
          { type: 'stat-change', target: 'confidence', amount: 8, description: '+8 Confidence (informed decision)' },
          { type: 'stat-change', target: 'stress', amount: -3, description: '-3 Stress (feeling prepared)' },
          { type: 'time-cost', target: 'month', amount: 1, description: '1 month passes.' },
        ],
      },
      {
        id: 'talk-to-customers',
        text: 'C. Talk to potential customers before spending anything.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -100, description: 'Spend $100 on coffee and transport.' },
          { type: 'knowledge-gain', target: 'sales', amount: 7, description: 'Learn customer discovery.' },
          { type: 'network-change', target: 'network', amount: 5, description: '+5 Network (customer connections)' },
          { type: 'reputation-change', target: 'reputation', amount: 3, description: '+3 Reputation (perceived as thorough)' },
          { type: 'stat-change', target: 'stress', amount: -5, description: '-5 Stress' },
          { type: 'time-cost', target: 'month', amount: 1, description: '1 month passes.' },
        ],
      },
      {
        id: 'abandon-idea',
        text: 'D. Abandon this idea and search for something else.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: -5, description: '-5 Confidence (self-doubt)' },
          { type: 'stat-change', target: 'stress', amount: 10, description: '+10 Stress (uncertainty)' },
          { type: 'chapter-advance', target: 'chapter-2-alt', amount: 1, description: 'Find a new opportunity.' },
        ],
      },
      {
        id: 'find-co-founder',
        text: 'E. Search for a co-founder instead of going solo.',
        consequences: [
          { type: 'network-change', target: 'network', amount: 8, description: '+8 Network (meeting potential partners)' },
          { type: 'stat-change', target: 'confidence', amount: 3, description: '+3 Confidence' },
          { type: 'reputation-change', target: 'reputation', amount: 2, description: '+2 Reputation (serious founder)' },
          { type: 'time-cost', target: 'month', amount: 2, description: '2 months pass.' },
          { type: 'trigger-event', target: 'meet-maya', amount: 1, description: 'Maya expresses interest in co-founding.' },
        ],
      },
    ],
    nextNodes: ['idea-research', 'idea-validate'],
  },
  'idea-research': {
    id: 'idea-research',
    chapter: 1,
    title: 'Research Findings',
    text: 'Based on your initial approach, you gather preliminary insights about your market opportunity.',
    choices: [],
    nextNodes: [],
    autoAdvance: true,
  },
  'idea-validate': {
    id: 'idea-validate',
    chapter: 1,
    title: 'Validating the Idea',
    text: 'You now have enough information to make a critical decision: proceed with building or pivot your approach.',
    choices: [
      {
        id: 'proceed-build',
        text: 'Proceed with building the product.',
        consequences: [
          { type: 'chapter-advance', target: 'chapter-2', amount: 1, description: 'Chapter 2: The First Customer.' },
        ],
      },
      {
        id: 'pivot-idea',
        text: 'Pivot based on what you learned.',
        consequences: [
          { type: 'knowledge-gain', target: 'product', amount: 10, description: 'New perspective on the problem.' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (learning from feedback)' },
          { type: 'chapter-advance', target: 'chapter-2', amount: 1, description: 'Chapter 2: The First Customer.' },
        ],
      },
    ],
  },
  'chapter-2-alt': {
    id: 'chapter-2-alt',
    chapter: 0,
    title: 'A New Direction',
    text: 'Abandoning the first idea was hard, but you realize you learned valuable lessons. A new opportunity presents itself—one that better aligns with your strengths.',
    choices: [],
    nextNodes: ['the-idea-start'],
    autoAdvance: true,
  },
  'first-customer-start': {
    id: 'first-customer-start',
    chapter: 2,
    title: 'Testing the Waters',
    text: 'You have a basic understanding of your market. Now the critical question: will anyone actually pay for your solution? The gap between a good idea and a viable business is customer validation.',
    choices: [
      {
        id: 'build-mvp',
        text: 'Build a minimum viable product to show potential customers.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -800, description: 'Invest $800 in basic prototype development.' },
          { type: 'product-improvement', target: 'quality', amount: 3, description: '+3 Product Quality.' },
          { type: 'knowledge-gain', target: 'product', amount: 8, description: 'Learn rapid prototyping.' },
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (development pressure)' },
          { type: 'time-cost', target: 'month', amount: 1, description: '1 month passes.' },
        ],
      },
      {
        id: 'customer-interview',
        text: 'Interview potential customers before writing any code or creating anything.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -150, description: 'Spend $150 on travel and interviews.' },
          { type: 'knowledge-gain', target: 'sales', amount: 10, description: 'Deep customer insights gained.' },
          { type: 'network-change', target: 'network', amount: 3, description: '+3 Network (customer contacts)' },
          { type: 'stat-change', target: 'confidence', amount: 4, description: '+4 Confidence (customer validation)' },
          { type: 'time-cost', target: 'month', amount: 1, description: '1 month passes.' },
        ],
      },
      {
        id: 'skip-validation',
        text: 'Skip validation and go straight to building. You know what people want.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 10, description: '+10 Confidence' },
          { type: 'stat-change', target: 'stress', amount: 3, description: '-3 Stress (avoiding uncertainty)' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: -5, description: 'Missing customer insights.' },
        ],
      },
    ],
    nextNodes: ['customer-research', 'build-mvp'],
  },
  'customer-research': {
    id: 'customer-research',
    chapter: 2,
    title: 'Early Validation',
    text: 'Your efforts at customer discovery yield important results.',
    choices: [
      {
        id: 'positive-feedback',
        text: 'Customers respond positively to your concept.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 10, description: '+10 Confidence' },
          { type: 'network-change', target: 'network', amount: 5, description: '+5 Network (interested prospects)' },
          { type: 'chapter-advance', target: 'chapter-3', amount: 1, description: 'Time to pursue sales.' },
        ],
      },
      {
        id: 'mixed-feedback',
        text: 'Feedback is mixed—some see value, others do not.',
        consequences: [
          { type: 'knowledge-gain', target: 'marketing', amount: 5, description: 'Learn to segment markets.' },
          { type: 'stat-change', target: 'confidence', amount: 3, description: '+3 Confidence (nuanced understanding)' },
          { type: 'chapter-advance', target: 'chapter-3', amount: 1, description: 'Time to pursue sales.' },
        ],
      },
      {
        id: 'negative-feedback',
        text: 'Interest is lukewarm. People are not convinced.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: -8, description: '-8 Confidence' },
          { type: 'knowledge-gain', target: 'product', amount: 8, description: 'Time to iterate on the concept.' },
          { type: 'chapter-advance', target: 'chapter-3', amount: 1, description: 'Pivot and try again.' },
        ],
      },
    ],
    autoAdvance: true,
  },
  'build-mvp': {
    id: 'build-mvp',
    chapter: 2,
    title: 'Building Your MVP',
    text: 'You develop a minimum viable product. The process reveals what you can and cannot do alone.',
    choices: [],
    nextNodes: ['customer-research'],
    autoAdvance: true,
  },
  'first-sale-start': {
    id: 'first-sale-start',
    chapter: 3,
    title: 'The Moment of Truth',
    text: 'After validating your concept, you are ready to make your first sale. This is where many founders fail—the gap between knowing what people want and getting them to pay for it.',
    choices: [
      {
        id: 'price-high',
        text: 'Price high to signal quality and maximize revenue per customer.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (premium positioning)' },
          { type: 'knowledge-gain', target: 'marketing', amount: 5, description: 'Learn premium positioning.' },
          { type: 'stat-change', target: 'stress', amount: 3, description: '+3 Stress (risk of rejection)' },
        ],
      },
      {
        id: 'price-low',
        text: 'Price low to attract early customers and build momentum quickly.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 8, description: '+8 Confidence (quick traction)' },
          { type: 'knowledge-gain', target: 'sales', amount: 7, description: 'Learn volume-based strategy.' },
          { type: 'company-stat-change', target: 'customers', amount: 3, description: '+3 early customers (low price effect)'},
        ],
      },
      {
        id: 'negotiate',
        text: 'Negotiate flexible terms with your first customer.',
        consequences: [
          { type: 'knowledge-gain', target: 'negotiation', amount: 10, description: 'Learn negotiation skills.' },
          { type: 'stat-change', target: 'network', amount: 4, description: '+4 Network (customer relationship)' },
          { type: 'stat-change', target: 'stress', amount: -2, description: '-2 Stress (mutual agreement)' },
        ],
      },
    ],
    nextNodes: ['pricing-decision', 'sales-pitch', 'customer-negotiation'],
  },
  'pricing-decision': {
    id: 'pricing-decision',
    chapter: 3,
    title: 'Pricing Lessons',
    text: 'Your pricing strategy directly affects revenue, customer perception, and long-term sustainability.',
    choices: [
      {
        id: 'learn-from-pricing',
        text: 'Analyze what worked and what did not with your pricing.',
        consequences: [
          { type: 'knowledge-gain', target: 'marketing', amount: 8, description: 'Better understanding of value pricing.' },
          { type: 'chapter-advance', target: 'chapter-4', amount: 1, description: 'Chapter 4: The Team.' },
        ],
      },
    ],
    autoAdvance: true,
  },
  'sales-pitch': {
    id: 'sales-pitch',
    chapter: 3,
    title: 'The Art of Selling',
    text: 'Your first sales conversation was a crash course in persuasion, objection handling, and value communication.',
    choices: [
      {
        id: 'successful-sale',
        text: 'The sale goes through. You realize selling is as much about trust as it is about features.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 500, description: '+$500 from first sale' },
          { type: 'knowledge-gain', target: 'sales', amount: 8, description: 'First sale experience.' },
          { type: 'stat-change', target: 'confidence', amount: 10, description: '+10 Confidence' },
          { type: 'chapter-advance', target: 'chapter-4', amount: 1, description: 'Chapter 4: The Team.' },
        ],
      },
    ],
    autoAdvance: true,
  },
  'customer-negotiation': {
    id: 'customer-negotiation',
    chapter: 3,
    title: 'The Negotiation',
    text: 'The back-and-forth of negotiation teaches you as much about yourself as about business.',
    choices: [
      {
        id: 'close-deal',
        text: 'You reach a mutually beneficial agreement.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: 400, description: '+$400 from negotiated deal' },
          { type: 'knowledge-gain', target: 'negotiation', amount: 10, description: 'Real-world negotiation experience.' },
          { type: 'network-change', target: 'network', amount: 6, description: '+6 Network (happy customer)' },
          { type: 'chapter-advance', target: 'chapter-4', amount: 1, description: 'Chapter 4: The Team.' },
        ],
      },
    ],
    autoAdvance: true,
  },
  'team-start': {
    id: 'team-start',
    chapter: 4,
    title: 'Going Beyond Solo',
    text: 'You realize that growth has natural limits when you are alone. To build something lasting, you need help. But hiring or partnering is a significant commitment—one misstep can create long-term problems.',
    choices: [
      {
        id: 'hire-first-employee',
        text: 'Hire your first employee to handle a specific function.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1200, description: 'Monthly salary commitment.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 5, description: 'Learn people management basics.' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (responsibility for others)' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: -5, description: 'Team adjustment period.' },
        ],
      },
      {
        id: 'seek-co-founder',
        text: 'Look for a co-founder who complements your skills.',
        consequences: [
          { type: 'network-change', target: 'network', amount: 10, description: '+10 Network (searching for partners)' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (serious about growth)' },
          { type: 'reputation-change', target: 'reputation', amount: 5, description: '+5 Reputation (seeking partners)' },
          { type: 'trigger-event', target: 'meet-maya', amount: 1, description: 'Maya is interested in a co-founder conversation.' },
        ],
      },
      {
        id: 'stay-solo',
        text: 'Stay solo for now and handle everything yourself.',
        consequences: [
          { type: 'stat-change', target: 'energy', amount: -10, description: '-10 Energy (burnout risk)' },
          { type: 'stat-change', target: 'stress', amount: 10, description: '+10 Stress (overwhelm)' },
          { type: 'company-stat-change', target: 'productivity', amount: -5, description: 'Limited bandwidth.' },
          { type: 'chapter-advance', target: 'chapter-5', amount: 1, description: 'Chapter 5: The First Crisis.' },
        ],
      },
    ],
    nextNodes: ['hiring-decision', 'co-founder', 'team-culture'],
  },
  'hiring-decision': {
    id: 'hiring-decision',
    chapter: 4,
    title: 'The Hiring Process',
    text: 'Hiring your first employee is unlike anything you have done before. You must find someone who is both capable and a good fit for your emerging culture.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'co-founder': {
    id: 'co-founder',
    chapter: 4,
    title: 'Partnership Potential',
    text: 'A potential co-founder relationship is forming. This is one of the most important decisions you will make.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'team-culture': {
    id: 'team-culture',
    chapter: 4,
    title: 'Early Culture',
    text: 'Every interaction with your new team member is setting a precedent. What kind of culture are you building?',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'crisis-start': {
    id: 'crisis-start',
    chapter: 5,
    title: 'The First Crisis',
    text: 'Every company faces its first existential challenge. How you respond will define your leadership and determine whether you survive.',
    choices: [
      {
        id: 'face-problem',
        text: 'Confront the problem directly, even if the truth is painful.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 10, description: '+10 Confidence (integrity)' },
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (difficult truth)' },
          { type: 'knowledge-gain', target: 'leadership', amount: 8, description: 'Learn crisis leadership.' },
          { type: 'chapter-advance', target: 'chapter-6', amount: 1, description: 'Chapter 6: Cash Flow.' },
        ],
      },
      {
        id: 'avoid-problem',
        text: 'Delay addressing the issue. Maybe it will resolve itself.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: -5, description: '-5 Confidence (avoidance)' },
          { type: 'company-stat-change', target: 'productQuality', amount: -5, description: 'Quality suffers from neglect.' },
          { type: 'company-stat-change', target: 'customerSatisfaction', amount: -8, description: 'Customers notice.' },
          { type: 'chapter-advance', target: 'chapter-6', amount: 1, description: 'Chapter 6: Cash Flow.' },
        ],
      },
      {
        id: 'pivot-approach',
        text: 'Use this crisis as an opportunity to pivot in a new direction.',
        consequences: [
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 10, description: 'Learn to adapt strategy.' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (uncertainty)' },
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (agility)' },
          { type: 'chapter-advance', target: 'chapter-6', amount: 1, description: 'Chapter 6: Cash Flow.' },
        ],
      },
    ],
    nextNodes: ['crisis-response', 'crisis-recovery'],
  },
  'crisis-response': {
    id: 'crisis-response',
    chapter: 5,
    title: 'Under Pressure',
    text: 'Your crisis response reveals strengths and weaknesses you did not know you had.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'crisis-recovery': {
    id: 'crisis-recovery',
    chapter: 5,
    title: 'After the Storm',
    text: 'The crisis has passed, but its effects will linger. What did you learn about yourself and your company?',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'cash-flow-start': {
    id: 'cash-flow-start',
    chapter: 6,
    title: 'The Cash Flow Reality',
    text: 'You are making sales, but the money in the bank is not growing as fast as you expected. Revenue is not the same as cash in the bank.',
    choices: [
      {
        id: 'cut-expenses',
        text: 'Cut non-essential expenses to preserve cash.',
        consequences: [
          { type: 'stat-change', target: 'stress', amount: 5, description: '+5 Stress (tightening belt)' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: -8, description: 'Morale affected by cuts.' },
          { type: 'cash-change', target: 'cash', amount: 300, description: 'Preserve $300 cash.' },
          { type: 'knowledge-gain', target: 'finance', amount: 7, description: 'Learn cost management.' },
        ],
      },
      {
        id: 'accelerate-revenue',
        text: 'Double down on sales to bring in more revenue.',
        consequences: [
          { type: 'stat-change', target: 'stress', amount: 3, description: '+3 Stress (pushing hard)' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: 'Stronger market presence.' },
          { type: 'knowledge-gain', target: 'sales', amount: 6, description: 'Learn aggressive sales tactics.' },
        ],
      },
      {
        id: 'seek-funding',
        text: 'Consider bringing in outside capital to extend your runway.',
        consequences: [
          { type: 'stat-change', target: 'reputation', amount: 3, description: '+3 Reputation (serious player)' },
          { type: 'trigger-event', target: 'investor-meeting', amount: 1, description: 'An investor expresses interest.' },
          { type: 'knowledge-gain', target: 'finance', amount: 5, description: 'Learn about funding rounds.' },
        ],
      },
    ],
    nextNodes: ['expense-review', 'funding-decision'],
  },
  'expense-review': {
    id: 'expense-review',
    chapter: 6,
    title: 'Financial Awareness',
    text: 'You gain a deeper understanding of how expenses, timing, and cash flow interact.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'funding-decision': {
    id: 'funding-decision',
    chapter: 6,
    title: 'Funding Crossroads',
    text: 'The funding decision is more complex than just getting money. Each path has tradeoffs that will shape your company\'s future.',
    choices: [
      {
        id: 'bootstrap',
        text: 'Bootstrap—grow slowly but maintain full control.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 8, description: '+8 Confidence (self-reliant)' },
          { type: 'stat-change', target: 'stress', amount: 10, description: '+10 Stress (resource constraints)' },
          { type: 'knowledge-gain', target: 'operations', amount: 8, description: 'Learn resource efficiency.' },
          { type: 'chapter-advance', target: 'chapter-7-slow', amount: 1, description: 'Slow growth path.' },
        ],
      },
      {
        id: 'take-investment',
        text: 'Take investment—grow faster but with external expectations.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (validation)' },
          { type: 'stat-change', target: 'stress', amount: 3, description: '-3 Stress (financial cushion)' },
          { type: 'knowledge-gain', target: 'finance', amount: 10, description: 'Learn fundraising and investor relations.' },
          { type: 'company-stat-change', target: 'companyValuation', amount: 10000, description: 'Valuation increases.' },
          { type: 'chapter-advance', target: 'chapter-7-fast', amount: 1, description: 'Fast growth path.' },
        ],
      },
    ],
  },
  'growth-start': {
    id: 'growth-start',
    chapter: 7,
    title: 'The Growth Dilemma',
    text: 'Your company has traction. Now the critical question: do you grow aggressively to capture market share, or grow slowly and profitably?',
    choices: [
      {
        id: 'aggressive-growth',
        text: 'Pursue aggressive growth. Hire quickly, spend on marketing, capture market share.',
        consequences: [
          { type: 'stat-change', target: 'stress', amount: 12, description: '+12 Stress (rapid scaling)' },
          { type: 'stat-change', target: 'energy', amount: -10, description: '-10 Energy (exhaustion)' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: -5, description: 'Rapid growth strains team.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 5, description: 'Learn scaling leadership.' },
        ],
      },
      {
        id: 'sustainable-growth',
        text: 'Focus on sustainable growth. Prioritize profit and team well-being over speed.',
        consequences: [
          { type: 'stat-change', target: 'stress', amount: -5, description: '-5 Stress (steady pace)' },
          { type: 'company-stat-change', target: 'profit', amount: 5, description: 'Higher profitability.' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: 8, description: 'Happy, stable team.' },
          { type: 'knowledge-gain', target: 'operations', amount: 7, description: 'Learn sustainable operations.' },
        ],
      },
      {
        id: 'niche-focus',
        text: 'Double down on a specific niche. Dominate a small market before expanding.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 7, description: '+7 Confidence (focused strategy)' },
          { type: 'company-stat-change', target: 'marketShare', amount: 8, description: 'Dominate your niche.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 8, description: 'Learn focus strategy.' },
        ],
      },
    ],
    nextNodes: ['growth-strategy'],
  },
  'growth-strategy': {
    id: 'growth-strategy',
    chapter: 7,
    title: 'Growth Strategy',
    text: 'Your chosen growth path yields specific results in this quarter.',
    choices: [],
    autoAdvance: true,
    nextNodes: ['scaling-decision', 'growth-costs'],
  },
  'scaling-decision': {
    id: 'scaling-decision',
    chapter: 7,
    title: 'Scaling Challenges',
    text: 'Scaling reveals friction points in your processes and team structure.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'growth-costs': {
    id: 'growth-costs',
    chapter: 7,
    title: 'The Cost of Growth',
    text: 'You weigh the financial and personal costs of your growth strategy.',
    choices: [
      {
        id: 'course-correct',
        text: 'Make adjustments to your growth strategy based on results.',
        consequences: [
          { type: 'chapter-advance', target: 'chapter-8', amount: 1, description: 'Chapter 8: The Organization.' },
        ],
      },
    ],
  },
  'organization-start': {
    id: 'organization-start',
    chapter: 8,
    title: 'Building Systems',
    text: 'Your company is growing beyond the point where you can manage everything personally. Systems, processes, and culture are no longer optional—they are essential.',
    choices: [
      {
        id: 'invest-in-systems',
        text: 'Invest heavily in systems and processes.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -1500, description: 'System implementation costs.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 12, description: '+12 Operational Efficiency.' },
          { type: 'company-stat-change', target: 'productivity', amount: 10, description: '+10 Productivity.' },
          { type: 'knowledge-gain', target: 'operations', amount: 8, description: 'Learn system design.' },
          { type: 'stat-change', target: 'stress', amount: -5, description: '-5 Stress (systems reduce chaos)' },
        ],
      },
      {
        id: 'culture-first',
        text: 'Focus on building company culture before systems.',
        consequences: [
          { type: 'company-stat-change', target: 'employeeMorale', amount: 12, description: '+12 Employee Morale.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: 5, description: '+5 Brand Reputation (employer brand).' },
          { type: 'knowledge-gain', target: 'leadership', amount: 10, description: 'Learn cultural leadership.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: -3, description: 'Processes still need work.' },
        ],
      },
      {
        id: 'hire-leadership',
        text: 'Hire experienced managers to handle operations.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -2000, description: 'Senior management salaries.' },
          { type: 'company-stat-change', target: 'operationalEfficiency', amount: 15, description: '+15 Operational Efficiency.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 7, description: 'Learn delegation.' },
          { type: 'stat-change', target: 'energy', amount: 5, description: '+5 Energy (delegation)' },
        ],
      },
    ],
    nextNodes: ['culture-building', 'process-system', 'leadership-development'],
  },
  'culture-building': {
    id: 'culture-building',
    chapter: 8,
    title: 'Culture Takes Shape',
    text: 'Your company culture is emerging from the decisions you have made. It is not what you say— it is what you do.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'process-system': {
    id: 'process-system',
    chapter: 8,
    title: 'Process and Procedure',
    text: 'You formalise your workflows. Some employees welcome the clarity; others feel constrained.',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
  'leadership-development': {
    id: 'leadership-development',
    chapter: 8,
    title: 'Leading Leaders',
    text: 'Your biggest challenge is no longer the work—it is leading people who lead other people.',
    choices: [
      {
        id: 'develop-team',
        text: 'Invest in developing your team\'s leadership capabilities.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -800, description: 'Training costs.' },
          { type: 'knowledge-gain', target: 'leadership', amount: 10, description: 'Advanced leadership skills.' },
          { type: 'company-stat-change', target: 'employeeMorale', amount: 10, description: '+10 Employee Morale.' },
          { type: 'chapter-advance', target: 'chapter-9', amount: 1, description: 'Chapter 9: The Competitor.' },
        ],
      },
    ],
  },
  'competitor-start': {
    id: 'competitor-start',
    chapter: 9,
    title: 'A New Challenger Appears',
    text: 'Deniz Kara has launched a competing product. They have more funding, a faster product, and they are gaining market share rapidly. Your market position is under threat.',
    choices: [
      {
        id: 'differentiate-product',
        text: 'Differentiate on product quality and depth.',
        consequences: [
          { type: 'cash-change', target: 'cash', amount: -2000, description: 'R&D investment.' },
          { type: 'company-stat-change', target: 'productQuality', amount: 10, description: '+10 Product Quality.' },
          { type: 'knowledge-gain', target: 'product', amount: 8, description: 'Advanced product development.' },
          { type: 'stat-change', target: 'stress', amount: 8, description: '+8 Stress (playing catch-up)' },
        ],
      },
      {
        id: 'compete-on-price',
        text: 'Compete on price. Cut your prices to retain customers.',
        consequences: [
          { type: 'company-stat-change', target: 'profit', amount: -8, description: 'Margins squeezed.' },
          { type: 'company-stat-change', target: 'marketShare', amount: 5, description: 'Retained some customers.' },
          { type: 'company-stat-change', target: 'brandReputation', amount: -3, description: 'Perceived as cheap.' },
          { type: 'knowledge-gain', target: 'marketing', amount: 6, description: 'Learn competitive pricing.' },
        ],
      },
      {
        id: 'find-niche',
        text: 'Find an underserved niche that Deniz is ignoring.',
        consequences: [
          { type: 'company-stat-change', target: 'marketShare', amount: 3, description: 'Smaller but loyal segment.' },
          { type: 'knowledge-gain', target: 'strategicThinking', amount: 10, description: 'Learn niche strategy.' },
          { type: 'stat-change', target: 'confidence', amount: 8, description: '+8 Confidence (strategic clarity)' },
        ],
      },
      {
        id: 'partner-competitor',
        text: 'Explore a partnership or acquisition conversation with Deniz.',
        consequences: [
          { type: 'stat-change', target: 'confidence', amount: 5, description: '+5 Confidence (strategic thinking)' },
          { type: 'network-change', target: 'network', amount: 8, description: '+8 Network (industry connections)' },
          { type: 'knowledge-gain', target: 'negotiation', amount: 8, description: 'Learn M&A negotiation.' },
        ],
      },
    ],
    nextNodes: ['differentiation', 'competitive-response', 'innovation-focus'],
  },
  'differentiation': {
    id: 'differentiation',
    chapter: 9,
    title: 'Standing Out',
    text: 'You work to establish what makes your company uniquely valuable in the eyes of customers.',
    choices: [],
    autoAdvance: true,
    nextNodes: ['competitive-response'],
  },
  'competitive-response': {
    id: 'competitive-response',
    chapter: 9,
    title: 'Market Response',
    text: 'The market responds to your strategy. Customers, employees, and competitors take note of your moves.',
    choices: [],
    autoAdvance: true,
    nextNodes: ['innovation-focus'],
  },
  'innovation-focus': {
    id: 'innovation-focus',
    chapter: 9,
    title: 'The Innovation Imperative',
    text: 'You realize that innovation is not just about new features—it is about solving problems in new ways.',
    choices: [
      {
        id: 'innovate-or-die',
        text: 'Double down on innovation as your core strategy.',
        consequences: [
          { type: 'chapter-advance', target: 'chapter-10', amount: 1, description: 'Chapter 10: The Decision.' },
        ],
      },
    ],
  },
  'final-start': {
    id: 'final-start',
    chapter: 10,
    title: 'The Defining Decision',
    text: 'You have grown from an idea to a real company. Now you must decide what kind of company you want to build. There is no single right answer—only your answer.',
    choices: [
      {
        id: 'end-bootstrap',
        text: 'Build a profitable, self-sustaining business. Keep it small and efficient.',
        consequences: [
          { type: 'ending', target: 'bootstrapped', amount: 1, description: 'The Bootstrapped Company ending.' },
        ],
      },
      {
        id: 'end-growth',
        text: 'Pursue aggressive growth. Scale to become a market leader.',
        consequences: [
          { type: 'ending', target: 'high-growth', amount: 1, description: 'The High-Growth Company ending.' },
        ],
      },
      {
        id: 'end-sustainable',
        text: 'Create a sustainable, mission-driven company focused on long-term impact.',
        consequences: [
          { type: 'ending', target: 'sustainable', amount: 1, description: 'The Sustainable Company ending.' },
        ],
      },
      {
        id: 'end-exit',
        text: 'Sell the company. Turn your vision into realized value for everyone involved.',
        consequences: [
          { type: 'ending', target: 'founder-exit', amount: 1, description: 'The Founder Exit ending.' },
        ],
      },
    ],
    nextNodes: ['exit-decision', 'legacy-choice'],
  },
  'exit-decision': {
    id: 'exit-decision',
    chapter: 10,
    title: 'Exit or Continue?',
    text: 'The future of your company rests on this decision. Each path offers different rewards and challenges.',
    choices: [],
    autoAdvance: true,
    nextNodes: ['legacy-choice'],
  },
  'legacy-choice': {
    id: 'legacy-choice',
    chapter: 10,
    title: 'Your Legacy',
    text: 'What will you be remembered for? The company you built, the people you hired, the lessons you learned?',
    choices: [],
    autoAdvance: true,
    nextNodes: [],
  },
};
