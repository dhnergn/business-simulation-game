import { ConceptId } from '../types/game';

export interface ConceptExplanation {
  id: ConceptId;
  title: string;
  explanation: string;
  businessPrinciple: string;
}

export const CONCEPT_EXPLANATIONS: Record<ConceptId, ConceptExplanation> = {
  'cash-flow': {
    id: 'cash-flow',
    title: 'Cash Flow',
    explanation:
      'Cash flow is the net amount of cash moving into and out of your business. Revenue represents sales, but cash flow measures actual money in the bank. A company can be profitable on paper yet still run out of cash if customers pay slowly while you must pay employees and suppliers immediately.',
    businessPrinciple:
      'Always monitor your cash runway—the months of operating expenses your current cash can cover. Positive cash flow enables reinvestment and survival; negative cash flow requires either more revenue, less spending, or external capital.',
  },
  'customer-validation': {
    id: 'customer-validation',
    title: 'Customer Validation',
    explanation:
      'Customer validation is the process of confirming that people will actually pay for your product or service. An idea that seems brilliant to you may not solve a problem that people are willing to spend money to solve.',
    businessPrinciple:
      'Build a minimum viable product (MVP) and test it with real potential customers before investing heavily. Iterate based on feedback. The goal is to find product-market fit: a product that satisfies strong market demand.',
  },
  'opportunity-cost': {
    id: 'opportunity-cost',
    title: 'Opportunity Cost',
    explanation:
      'Every choice you make has an opportunity cost—the value of the next best alternative you did not choose. When you spend time on one activity, you cannot spend it on another.',
    businessPrinciple:
      'Consider not just the direct cost of a decision, but what you are giving up. The most expensive choice is often the one that prevents you from pursuing a better opportunity.',
  },
  'unit-economics': {
    id: 'unit-economics',
    title: 'Unit Economics',
    explanation:
      'Unit economics measure the profit or loss a single customer generates. If the cost to acquire a customer (CAC) exceeds their lifetime value (LTV), your business is burning money on growth.',
    businessPrinciple:
      'Calculate LTV/CAC ratio. A ratio above 3:1 generally indicates a healthy, sustainable business. Focus on customers with high lifetime value and low acquisition costs.',
  },
  hiring: {
    id: 'hiring',
    title: 'Strategic Hiring',
    explanation:
      'Hiring the right person is one of the most impactful decisions a founder makes. A single bad hire can cost 2-5x their annual salary in lost productivity, training time, and cultural damage.',
    businessPrinciple:
      'Hire for values and cultural fit first, skills second. Skills can be taught; attitude cannot be changed. Move fast to fire bad fits—the longer you wait, the more damage accumulates.',
  },
  leadership: {
    id: 'leadership',
    title: 'Leadership',
    explanation:
      'Leadership is not about being the smartest person in the room. It is about setting direction, aligning people, and creating conditions where others can do their best work.',
    businessPrinciple:
      'Great leaders build systems and develop people. They admit mistakes, take responsibility, and inspire others toward a shared vision. Leadership is a skill that improves with deliberate practice.',
  },
  marketing: {
    id: 'marketing',
    title: 'Marketing',
    explanation:
      'Marketing is not just advertising—it is understanding your customer deeply and communicating how you solve their problems. Effective marketing creates demand; ineffective marketing wastes resources.',
    businessPrinciple:
      'Start with free channels: word-of-mouth, content, and community. Measure everything. The best marketing feels like helpful content, not a sales pitch. Focus on customer retention—it costs 5-25x less than acquisition.',
  },
  negotiation: {
    id: 'negotiation',
    title: 'Negotiation',
    explanation:
      'Negotiation is about creating value for all parties, not winning zero-sum battles. The best outcomes happen when both sides feel they have gained something.',
    businessPrinciple:
      'Enter negotiations with alternatives (BATNA). Understand the other party\'s true interests, not just their stated positions. Seek mutual gain through creative solutions.',
  },
  'competitive-advantage': {
    id: 'competitive-advantage',
    title: 'Competitive Advantage',
    explanation:
      'A competitive advantage is what makes your company uniquely valuable compared to alternatives. Without one, customers have no reason to choose you over competitors.',
    businessPrinciple:
      'Sustainable advantages come from unique resources, customer relationships, brand strength, network effects, or proprietary technology. They must be difficult for competitors to replicate.',
  },
  'organizational-culture': {
    id: 'organizational-culture',
    title: 'Organizational Culture',
    explanation:
      'Culture is the sum of how things get done in your organization when you are not watching. It is shaped by your actions, rewards, and the behaviors you tolerate.',
    businessPrinciple:
      'Culture emerges from consistent decisions, not mission statements. Hire people who reinforce the culture you want. Replace or retrain those who damage it. A healthy culture attracts great people and drives performance.',
  },
  'value-creation': {
    id: 'value-creation',
    title: 'Value Creation',
    explanation:
      'Value creation is the process of producing goods or services that people want more than the alternatives, at a price they are willing to pay. All profit comes from value creation.',
    businessPrinciple:
      'Focus relentlessly on creating value for customers. Revenue, profit, and growth are results—not goals. When you consistently create value, financial success follows.',
  },
  'value-delivery': {
    id: 'value-delivery',
    title: 'Value Delivery',
    explanation:
      'Value delivery is how you bring your product or service to customers. Poor delivery can destroy the value you created. Great delivery amplifies it.',
    businessPrinciple:
      'Design your operations around the customer journey. Remove friction at every touchpoint. Measure customer satisfaction and act on feedback immediately.',
  },
  finance: {
    id: 'finance',
    title: 'Financial Management',
    explanation:
      'Financial management is the art of planning, controlling, and monitoring money flows. It enables you to make informed decisions, secure funding, and ensure sustainability.',
    businessPrinciple:
      'Key metrics: Revenue, Gross Profit, Operating Profit, Cash Flow, and Runway. Monitor these monthly. Cash is the oxygen of business—without it, even a great product dies.',
  },
  operations: {
    id: 'operations',
    title: 'Operations',
    explanation:
      'Operations are the systems and processes that deliver your product or service. Efficient operations reduce costs, improve quality, and enable growth.',
    businessPrinciple:
      'Systematize repeatable processes early. Measure key performance indicators. Continuously improve through feedback loops. The goal is to make the system so good that any competent person can run it.',
  },
  'customer-experience': {
    id: 'customer-experience',
    title: 'Customer Experience',
    explanation:
      'Customer experience (CX) is the sum of every interaction a customer has with your company. Each touchpoint shapes their perception and loyalty.',
    businessPrinciple:
      'Delight customers at every touchpoint. Make it easy to buy, use, and get help. Listen to feedback and act on it. A great customer experience creates word-of-mouth marketing and reduces churn.',
  },
  'product-development': {
    id: 'product-development',
    title: 'Product Development',
    explanation:
      'Product development is the process of designing, building, and delivering a product that meets customer needs. It requires balancing quality, speed, features, and cost.',
    businessPrinciple:
      'Start with the minimum viable product. Iterate based on customer feedback. Prioritize features by impact and feasibility. Avoid gold-plating—good enough today is better than perfect tomorrow.',
  },
  'systems-thinking': {
    id: 'systems-thinking',
    title: 'Systems Thinking',
    explanation:
      'Systems thinking is the ability to see how different parts of a business interconnect and influence each other. A change in one area creates ripple effects elsewhere.',
    businessPrinciple:
      'Identify feedback loops, bottlenecks, and unintended consequences. Optimize the whole system, not just individual parts. A small change in the right place can have outsized effects.',
  },
  focus: {
    id: 'focus',
    title: 'Focus',
    explanation:
      'Focus means saying no to many good opportunities to say yes to the few that matter most. Scattered effort produces scattered results.',
    businessPrinciple:
      'Do one thing well before expanding. The undisciplined pursuit of more leads to mediocrity. Great companies become great by making fewer, better decisions and executing them flawlessly.',
  },
  'disciplined-execution': {
    id: 'disciplined-execution',
    title: 'Disciplined Execution',
    explanation:
      'Disciplined execution is the ability to consistently turn plans into results through daily discipline. It is the gap between knowing what to do and doing it.',
    businessPrinciple:
      'Set clear priorities. Establish measurable goals. Create accountability. Build processes that make the right thing the easy thing. Execution is a habit, not an event.',
  },
  'talent-acquisition': {
    id: 'talent-acquisition',
    title: 'Talent Acquisition',
    explanation:
      'Getting the right people on your team is more important than almost any other decision. Great talent multiplies your effectiveness; the wrong talent drags you down.',
    businessPrinciple:
      'Hire people smarter than you. Look for learning agility, cultural fit, and intrinsic motivation. Pay fairly but tie compensation to performance. Fire fast when it is not working.',
  },
};

export const ALL_CONCEPT_IDS: ConceptId[] = [
  'cash-flow',
  'customer-validation',
  'opportunity-cost',
  'unit-economics',
  'hiring',
  'leadership',
  'marketing',
  'negotiation',
  'competitive-advantage',
  'organizational-culture',
  'value-creation',
  'value-delivery',
  'finance',
  'operations',
  'customer-experience',
  'product-development',
  'systems-thinking',
  'focus',
  'disciplined-execution',
  'talent-acquisition',
];
