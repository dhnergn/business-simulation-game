import { Character, RelationshipStatus } from '../types/character';
import { PersonalityTrait } from '../types/game';

export const CHARACTERS: Record<string, Character> = {
  maya: {
    id: 'maya',
    name: 'Maya Chen',
    description:
      'A software architect with a sharp eye for technical debt and a deep skepticism of hype. She builds things that last rather than things that scale quickly.',
    role: 'Potential Co-founder & CTO',
    personality: ['analytical', 'methodical', 'risk-averse', 'independent'],
    strengths: ['Technical expertise', 'Architectural vision', 'Attention to quality', 'Long-term thinking'],
    weaknesses: ['Risk-averse', 'Slow to trust', 'Can over-engineer', 'Dislikes rapid change'],
    initialTrust: 30,
    skills: { product: 8, operations: 5, strategicThinking: 6 },
    goals: [
      'Build robust, scalable systems',
      'Maintain technical excellence',
      'Avoid rushed decisions',
    ],
    availableAt: [1, 2, 3],
    conversationTopics: [
      'Technology stack choices',
      'Technical debt',
      'Product architecture',
      'Code quality',
    ],
    offers: [
      {
        id: 'join-as-ctO',
        text: 'Maya offers to join your company as CTO. She wants a significant equity stake and veto power over technical decisions.',
        type: 'join',
        conditions: [{ type: 'trust', target: 'maya', operator: '>=', value: 50 }],
        effects: [
          {
            type: 'join-company',
            target: 'maya',
            amount: 1,
            description: 'Maya joins as CTO. Product quality and operational efficiency will improve significantly.',
          },
        ],
      },
      {
        id: 'advice-technical-debt',
        text: 'Maya shares her thoughts on technical debt and long-term architecture.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'maya', operator: '>=', value: 25 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'product',
            amount: 8,
            description: 'You gain technical knowledge about architecture and product planning.',
          },
        ],
      },
    ],
  },
  emre: {
    id: 'emre',
    name: 'Emre Torun',
    description:
      'A charismatic sales veteran who can close deals in his sleep. He speaks confidently about numbers that may or may not be realistic.',
    role: 'Sales Lead',
    personality: ['optimistic', 'intuitive', 'risk-tolerant', 'independent', 'collaborative'],
    strengths: ['Natural persuasion', 'High energy', 'Network connections', 'Closing deals'],
    weaknesses: ['Overpromises', 'Can be unrealistic', 'May burn bridges', 'Short-term focus'],
    initialTrust: 35,
    skills: { sales: 9, negotiation: 7, marketing: 5 },
    goals: [
      'Hit ambitious sales targets',
      'Expand the customer base rapidly',
      'Win big deals',
    ],
    availableAt: [1, 2, 3],
    conversationTopics: [
      'Sales pipeline',
      'Customer objections',
      'Deal negotiation',
      'Revenue projections',
    ],
    offers: [
      {
        id: 'join-as-sales',
        text: 'Emre wants to join as head of sales. He promises to triple your revenue but asks for aggressive commission terms.',
        type: 'join',
        conditions: [{ type: 'trust', target: 'emre', operator: '>=', value: 40 }],
        effects: [
          {
            type: 'join-company',
            target: 'emre',
            amount: 1,
            description: 'Emre joins as Sales Lead. Revenue growth will accelerate, but be wary of overpromising.',
          },
        ],
      },
      {
        id: 'advice-sales',
        text: 'Emre shares his philosophy on closing deals and reading customers.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'emre', operator: '>=', value: 25 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'sales',
            amount: 8,
            description: 'You learn persuasion techniques and sales psychology.',
          },
        ],
      },
    ],
  },
  selin: {
    id: 'selin',
    name: 'Selin Yilmaz',
    description:
      'An operations consultant turned entrepreneur. She sees inefficiency everywhere and has a system for everything.',
    role: 'Operations Manager',
    personality: ['methodical', 'analytical', 'risk-averse', 'collaborative'],
    strengths: ['Process design', 'Systems thinking', 'Quality control', 'Cost optimization'],
    weaknesses: ['Can be overly bureaucratic', 'Resists rapid change', 'Focuses on details over results'],
    initialTrust: 30,
    skills: { operations: 9, finance: 6, product: 4 },
    goals: [
      'Create efficient, repeatable processes',
      'Eliminate waste',
      'Build reliable systems',
    ],
    availableAt: [2, 3, 4],
    conversationTopics: [
      'Process improvement',
      'Operational efficiency',
      'Cost reduction',
      'System design',
    ],
    offers: [
      {
        id: 'join-as-operations',
        text: 'Selin offers to join as operations manager. She will streamline your processes but may clash with Emre\'s chaotic sales approach.',
        type: 'join',
        conditions: [{ type: 'trust', target: 'selin', operator: '>=', value: 45 }],
        effects: [
          {
            type: 'join-company',
            target: 'selin',
            amount: 1,
            description: 'Selin joins as Operations Manager. Efficiency improves but rapid growth may slow.',
          },
        ],
      },
      {
        id: 'advice-operations',
        text: 'Selin explains how systematic thinking can transform your business.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'selin', operator: '>=', value: 25 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'operations',
            amount: 8,
            description: 'You learn about operational efficiency and process design.',
          },
        ],
      },
    ],
  },
  kerem: {
    id: 'kerem',
    name: 'Kerem Demir',
    description:
      'An investor who has backed dozens of startups. He sees potential where others see risk, but his money comes with expectations.',
    role: 'Investor',
    personality: ['optimistic', 'intuitive', 'risk-tolerant', 'independent'],
    strengths: ['Capital allocation', 'Growth mindset', 'Network access', 'Strategic guidance'],
    weaknesses: ['Pushes for rapid growth', 'May not understand the product', 'Expects high returns', 'Can micromanage'],
    initialTrust: 25,
    skills: { finance: 8, strategicThinking: 7, leadership: 5 },
    goals: [
      'Achieve exponential growth',
      'Exit within 5-7 years',
      'Generate strong returns for investors',
    ],
    availableAt: [3, 4, 5, 6, 7],
    conversationTopics: [
      'Investment terms',
      'Growth strategy',
      'Valuation',
      'Exit planning',
    ],
    offers: [
      {
        id: 'invest-offer',
        text: 'Kerem offers to invest in your company. The deal is substantial but he wants a board seat and growth milestones.',
        type: 'invest',
        conditions: [{ type: 'trust', target: 'kerem', operator: '>=', value: 40 }, { type: 'chapter', target: 'any', operator: '>=', value: 3 }],
        effects: [
          {
            type: 'invest',
            target: 'kerem',
            amount: 25000,
            description: 'Kerem invests. You gain capital but must meet aggressive growth targets.',
          },
        ],
      },
      {
        id: 'advice-investment',
        text: 'Kerem shares his perspective on what investors look for.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'kerem', operator: '>=', value: 30 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'finance',
            amount: 7,
            description: 'You learn about investor psychology and funding rounds.',
          },
        ],
      },
    ],
  },
  deniz: {
    id: 'deniz',
    name: 'Deniz Kara',
    description:
      'Your main competitor. They moved fast, raised money, and are gaining market share. They are not malicious—just hungry.',
    role: 'Competitor',
    personality: ['competitive', 'optimistic', 'risk-tolerant', 'independent'],
    strengths: ['Speed of execution', 'Aggressive marketing', 'Strong funding'],
    weaknesses: ['May sacrifice quality', 'Can be reckless', 'Short-term focus'],
    initialTrust: 20,
    skills: { sales: 7, marketing: 8, product: 5 },
    goals: [
      'Capture market share',
      'Outpace competitors',
      'Become the market leader',
    ],
    availableAt: [5, 6, 7, 8],
    conversationTopics: ['Market positioning', 'Competitive advantage', 'Differentiation'],
    offers: [
      {
        id: 'compete-directly',
        text: 'Deniz is aggressively pricing their product below cost to steal your customers.',
        type: 'competition',
        conditions: [{ type: 'chapter', target: 'any', operator: '>=', value: 5 }],
        effects: [
          {
            type: 'company-stat-change',
            target: 'marketShare',
            amount: -5,
            description: 'Deniz\'s price war erodes your market share.',
          },
        ],
      },
      {
        id: 'advice-competition',
        text: 'Deniz surprisingly offers a candid assessment of your competitive position.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'deniz', operator: '>=', value: 50 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'strategicThinking',
            amount: 6,
            description: 'You learn about competitive strategy and differentiation.',
          },
        ],
      },
    ],
  },
  'professor-arda': {
    id: 'professor-arda',
    name: 'Professor Arda Yildirim',
    description:
      'A veteran entrepreneurship professor who has founded and failed companies himself. He challenges assumptions and asks the questions you haven\'t thought to ask.',
    role: 'Mentor',
    personality: ['analytical', 'methodical', 'collaborative'],
    strengths: ['Business philosophy', 'Strategic thinking', 'Pattern recognition', 'Hard-won wisdom'],
    weaknesses: ['Can be too philosophical', 'Sometimes out of touch with modern markets'],
    initialTrust: 40,
    skills: { strategicThinking: 9, leadership: 7, finance: 6 },
    goals: [
      'Share hard-won wisdom',
      'See students succeed without losing themselves',
      'Challenge conventional thinking',
    ],
    availableAt: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    conversationTopics: [
      'Strategy',
      'Leadership',
      'Decision-making',
      'Long-term thinking',
    ],
    offers: [
      {
        id: 'advice-mentor',
        text: 'Professor Arda offers guidance on your current challenge.',
        type: 'advice',
        conditions: [{ type: 'trust', target: 'professor-arda', operator: '>=', value: 20 }],
        effects: [
          {
            type: 'knowledge-gain',
            target: 'strategicThinking',
            amount: 5,
            description: 'You gain strategic insight from an experienced mentor.',
          },
        ],
      },
    ],
  },
};

export const CHARACTER_RELATIONSHIP_TITLES: Record<RelationshipStatus, string> = {
  stranger: 'Stranger',
  acquaintance: 'Acquaintance',
  contact: 'Contact',
  friend: 'Friend',
  confidant: 'Confidant',
  rival: 'Rival',
};
