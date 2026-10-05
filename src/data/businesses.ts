import { BusinessDefinition } from '../types/event';
import { BusinessType } from '../types/game';

export const BUSINESS_DEFINITIONS: Record<BusinessType, BusinessDefinition> = {
  saas: {
    type: 'saas',
    name: 'SaaS Product',
    description:
      'A software-as-a-service product targeting businesses or consumers. Recurring revenue but high customer acquisition costs and churn risk.',
    startupCost: { easy: 8000, normal: 5000, hard: 3000 },
    monthlyOverhead: { easy: 1200, normal: 1500, hard: 1800 },
    customerAcquisitionDifficulty: 7,
    baseMargins: { gross: 0.85, net: 0.2 },
    operationalComplexity: 5,
    growthPotential: 9,
    employeeRequirements: [
      { role: 'Developer', minCount: 1, recommendedSkills: ['product'] },
      { role: 'Marketer', minCount: 1, recommendedSkills: ['marketing'] },
    ],
    risks: ['Churn', 'Technical debt', 'Competition from established players', 'Customer concentration'],
    marketDynamics:
      'High competition, rapid technological change, subscription fatigue, and platform dependencies. Pricing pressure is constant.',
    defaultCustomerSegments: [
      {
        id: 'smb',
        name: 'Small Business Owners',
        needs: ['Simple automation', 'Low cost', 'Easy setup'],
        budget: 200,
        preferences: ['Self-service', 'Quick results', 'Affordable'],
        acquisitionCost: 350,
        lifetimeValue: 1800,
        conversionRate: 0.02,
        churnRate: 0.08,
        baseSize: 500,
        description: 'Budget-conscious businesses looking for affordable automation solutions.',
      },
      {
        id: 'enterprise',
        name: 'Enterprise Teams',
        needs: ['Robust features', 'Security', 'Support'],
        budget: 5000,
        preferences: ['Custom solutions', 'Demos', 'Account management'],
        acquisitionCost: 2500,
        lifetimeValue: 18000,
        conversionRate: 0.005,
        churnRate: 0.04,
        baseSize: 50,
        description: 'Large organizations with bigger budgets but longer sales cycles.',
      },
    ],
    defaultChannels: [
      { channelId: 'content', name: 'Content Marketing', baseCost: 300, conversionRate: 0.015, scalability: 7, risk: 3, timeRequirement: 6, description: 'Educational content that attracts organic traffic over time.' },
      { channelId: 'ads', name: 'Paid Advertising', baseCost: 500, conversionRate: 0.03, scalability: 5, risk: 4, timeRequirement: 2, description: 'Immediate traffic but costs scale with competition.' },
      { channelId: 'seo', name: 'SEO', baseCost: 200, conversionRate: 0.01, scalability: 9, risk: 2, timeRequirement: 8, description: 'Long-term organic growth that compounds over time.' },
    ],
    productFocus: { quality: 7, features: 8, speed: 5, reliability: 8, userExperience: 7, innovation: 6, developmentCostMultiplier: 1.5 },
    startingValuation: 25000,
  },
  edtech: {
    type: 'edtech',
    name: 'EdTech Platform',
    description:
      'An educational technology platform. Serves schools, corporations, or individual learners. Long sales cycles in B2B but high engagement in B2C.',
    startupCost: { easy: 10000, normal: 7000, hard: 4000 },
    monthlyOverhead: { easy: 900, normal: 1200, hard: 1500 },
    customerAcquisitionDifficulty: 8,
    baseMargins: { gross: 0.7, net: 0.12 },
    operationalComplexity: 6,
    growthPotential: 7,
    employeeRequirements: [
      { role: 'Curriculum Designer', minCount: 1, recommendedSkills: ['product', 'operations'] },
      { role: 'Developer', minCount: 1, recommendedSkills: ['product'] },
      { role: 'Educator', minCount: 1, recommendedSkills: ['marketing'] },
    ],
    risks: ['Regulatory changes', 'Institutional procurement delays', 'Content quality concerns', 'Seasonality'],
    marketDynamics:
      'Regulated market with institutional buyers. Long sales cycles but high customer lifetime value. Competition from established educational publishers.',
    defaultCustomerSegments: [
      {
        id: 'school', name: 'Schools/Districts', needs: ['Curriculum alignment', 'Assessment tools', 'Admin features'],
        budget: 10000, preferences: ['Proven outcomes', 'Training', 'Support'], acquisitionCost: 5000,
        lifetimeValue: 50000, conversionRate: 0.002, churnRate: 0.15, baseSize: 30, description: 'Educational institutions seeking curriculum-aligned solutions.'
      },
      {
        id: 'individual', name: 'Individual Learners', needs: ['Personalized learning', 'Affordable', 'Mobile access'],
        budget: 50, preferences: ['Self-paced', 'Gamification', 'Progress tracking'], acquisitionCost: 30,
        lifetimeValue: 150, conversionRate: 0.05, churnRate: 0.3, baseSize: 5000, description: 'Self-directed learners on a budget.'
      },
    ],
    defaultChannels: [
      { channelId: 'content', name: 'Educational Content', baseCost: 400, conversionRate: 0.02, scalability: 6, risk: 3, timeRequirement: 5, description: 'Content that educates and demonstrates value.' },
      { channelId: 'partnerships', name: 'Institutional Partnerships', baseCost: 800, conversionRate: 0.15, scalability: 4, risk: 6, timeRequirement: 8, description: 'Direct outreach to schools and organizations.' },
      { channelId: 'referrals', name: 'Referrals', baseCost: 150, conversionRate: 0.04, scalability: 3, risk: 2, timeRequirement: 2, description: 'Word-of-mouth from satisfied users.' },
    ],
    productFocus: { quality: 8, features: 6, speed: 4, reliability: 7, userExperience: 7, innovation: 5, developmentCostMultiplier: 2.0 },
    startingValuation: 30000,
  },
  restaurant: {
    type: 'restaurant',
    name: 'Restaurant & Bar',
    description:
      'A physical dining establishment. High fixed costs, thin margins, and intense local competition.',
    startupCost: { easy: 50000, normal: 35000, hard: 25000 },
    monthlyOverhead: { easy: 4000, normal: 5500, hard: 7000 },
    customerAcquisitionDifficulty: 6,
    baseMargins: { gross: 0.3, net: 0.05 },
    operationalComplexity: 8,
    growthPotential: 4,
    employeeRequirements: [
      { role: 'Chef', minCount: 1, recommendedSkills: ['operations'] },
      { role: 'Server', minCount: 3, recommendedSkills: [] },
      { role: 'Manager', minCount: 1, recommendedSkills: ['operations', 'leadership'] },
    ],
    risks: ['Food safety issues', 'Labor shortages', 'Rent increases', 'Seasonal demand', 'Supply chain disruptions'],
    marketDynamics:
      'Location-dependent. High foot traffic is crucial. Margins are razor-thin. Quality and consistency matter more than marketing.',
    defaultCustomerSegments: [
      {
        id: 'locals', name: 'Local Regulars', needs: ['Consistent quality', 'Good value', 'Friendly service'],
        budget: 25, preferences: ['Convenient location', 'Loyalty programs'], acquisitionCost: 8,
        lifetimeValue: 200, conversionRate: 0.4, churnRate: 0.1, baseSize: 2000, description: 'Neighborhood residents seeking reliable dining.'
      },
      {
        id: 'visitors', name: 'Visitors/Tourists', needs: ['Unique experience', 'Instagram-worthy', 'Quick service'],
        budget: 45, preferences: ['Atmosphere', 'Special occasion'], acquisitionCost: 15,
        lifetimeValue: 90, conversionRate: 0.15, churnRate: 0.6, baseSize: 1000, description: 'People looking for a memorable dining experience.'
      },
    ],
    defaultChannels: [
      { channelId: 'local', name: 'Local Presence', baseCost: 300, conversionRate: 0.3, scalability: 3, risk: 2, timeRequirement: 2, description: 'Foot traffic and local word-of-mouth.' },
      { channelId: 'social', name: 'Social Media', baseCost: 200, conversionRate: 0.12, scalability: 5, risk: 4, timeRequirement: 3, description: 'Photos and posts driving discovery and visits.' },
      { channelId: 'events', name: 'Events & Promotions', baseCost: 500, conversionRate: 0.25, scalability: 4, risk: 5, timeRequirement: 4, description: 'Live music, pop-ups, and special events.' },
    ],
    productFocus: { quality: 8, features: 4, speed: 7, reliability: 8, userExperience: 7, innovation: 3, developmentCostMultiplier: 1.2 },
    startingValuation: 150000,
  },
  fitness: {
    type: 'fitness',
    name: 'Fitness Business',
    description: 'A gym, studio, or wellness business. Member retention is key; acquisition is expensive.',
    startupCost: { easy: 30000, normal: 22000, hard: 15000 },
    monthlyOverhead: { easy: 2500, normal: 3500, hard: 4500 },
    customerAcquisitionDifficulty: 7,
    baseMargins: { gross: 0.6, net: 0.15 },
    operationalComplexity: 6,
    growthPotential: 5,
    employeeRequirements: [
      { role: 'Trainer', minCount: 3, recommendedSkills: [] },
      { role: 'Manager', minCount: 1, recommendedSkills: ['operations', 'leadership'] },
    ],
    risks: ['Member churn', 'Liability issues', 'Equipment maintenance', 'Seasonal fluctuations'],
    marketDynamics:
      'Membership-based with high churn. Results depend on member engagement and retention. Local competition is fierce.',
    defaultCustomerSegments: [
      {
        id: 'enthusiasts', name: 'Fitness Enthusiasts', needs: ['Varied workouts', 'Quality equipment', 'Expert guidance'],
        budget: 150, preferences: ['Advanced classes', 'Personal training'], acquisitionCost: 200,
        lifetimeValue: 1200, conversionRate: 0.08, churnRate: 0.12, baseSize: 800, description: 'Dedicated individuals who value quality and variety.'
      },
      {
        id: 'beginners', name: 'Beginners', needs: ['Low pressure', 'Guided instruction', 'Affordable'],
        budget: 80, preferences: ['Beginner-friendly', 'Flexible scheduling'], acquisitionCost: 100,
        lifetimeValue: 480, conversionRate: 0.15, churnRate: 0.25, baseSize: 1200, description: 'Newcomers looking for a welcoming environment.'
      },
    ],
    defaultChannels: [
      { channelId: 'community', name: 'Community Building', baseCost: 250, conversionRate: 0.1, scalability: 6, risk: 2, timeRequirement: 4, description: 'Building an engaged community that refers others.' },
      { channelId: 'social', name: 'Social Media', baseCost: 150, conversionRate: 0.08, scalability: 7, risk: 3, timeRequirement: 3, description: 'Showcasing transformations and workouts.' },
      { channelId: 'referrals', name: 'Referral Program', baseCost: 100, conversionRate: 0.12, scalability: 4, risk: 2, timeRequirement: 2, description: 'Members referring friends for discounts.' },
    ],
    productFocus: { quality: 6, features: 5, speed: 5, reliability: 7, userExperience: 6, innovation: 4, developmentCostMultiplier: 1.0 },
    startingValuation: 100000,
  },
  consulting: {
    type: 'consulting',
    name: 'Consulting Firm',
    description: 'Professional services firm. High margins but people-heavy and hard to scale.',
    startupCost: { easy: 3000, normal: 2000, hard: 1500 },
    monthlyOverhead: { easy: 500, normal: 700, hard: 1000 },
    customerAcquisitionDifficulty: 8,
    baseMargins: { gross: 0.7, net: 0.25 },
    operationalComplexity: 7,
    growthPotential: 3,
    employeeRequirements: [
      { role: 'Consultant', minCount: 1, recommendedSkills: ['sales', 'strategicThinking'] },
    ],
    risks: ['Client concentration', 'Key person dependency', 'Reputation risk', 'Economic sensitivity'],
    marketDynamics:
      'Knowledge-based. Reputation and relationships drive growth. Economic downturns reduce demand. Each client is high-value but high-touch.',
    defaultCustomerSegments: [
      {
        id: 'smb', name: 'Growing Companies', needs: ['Expert guidance', 'Quick results', 'Strategic advice'],
        budget: 5000, preferences: ['Proven ROI', 'Flexible engagement'], acquisitionCost: 3000,
        lifetimeValue: 20000, conversionRate: 0.01, churnRate: 0.2, baseSize: 100, description: 'Fast-growing companies needing strategic guidance.'
      },
      {
        id: 'enterprise', name: 'Enterprises', needs: ['Deep expertise', 'Scalability', 'Compliance'],
        budget: 20000, preferences: ['Track record', 'Large team'], acquisitionCost: 8000,
        lifetimeValue: 150000, conversionRate: 0.003, churnRate: 0.15, baseSize: 30, description: 'Large organizations with complex, high-value projects.'
      },
    ],
    defaultChannels: [
      { channelId: 'network', name: 'Professional Network', baseCost: 200, conversionRate: 0.03, scalability: 3, risk: 2, timeRequirement: 3, description: 'Leveraging relationships for referrals and warm introductions.' },
      { channelId: 'content', name: 'Thought Leadership', baseCost: 300, conversionRate: 0.02, scalability: 5, risk: 3, timeRequirement: 5, description: 'Speaking, writing, and sharing insights to build reputation.' },
      { channelId: 'sales', name: 'Direct Outreach', baseCost: 400, conversionRate: 0.025, scalability: 4, risk: 5, timeRequirement: 3, description: 'Proactive outreach to potential clients.' },
    ],
    productFocus: { quality: 8, features: 3, speed: 6, reliability: 9, userExperience: 6, innovation: 5, developmentCostMultiplier: 1.3 },
    startingValuation: 75000,
  },
  ecommerce: {
    type: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Online retail business. Inventory-heavy with variable demand and customer acquisition costs.',
    startupCost: { easy: 15000, normal: 10000, hard: 7000 },
    monthlyOverhead: { easy: 800, normal: 1000, hard: 1200 },
    customerAcquisitionDifficulty: 7,
    baseMargins: { gross: 0.4, net: 0.1 },
    operationalComplexity: 6,
    growthPotential: 6,
    employeeRequirements: [
      { role: 'Fulfillment', minCount: 2, recommendedSkills: [] },
      { role: 'Marketer', minCount: 1, recommendedSkills: ['marketing'] },
    ],
    risks: ['Inventory obsolescence', 'Shipping issues', 'Ad platform changes', 'Seasonal demand'],
    marketDynamics:
      'Highly competitive with thin margins. Customer acquisition costs keep rising. Success depends on product-market fit and efficient fulfillment.',
    defaultCustomerSegments: [
      {
        id: 'mainstream', name: 'Mainstream Consumers', needs: ['Affordable products', 'Fast shipping', 'Easy returns'],
        budget: 75, preferences: ['Variety', 'Deals', 'Reviews'], acquisitionCost: 45,
        lifetimeValue: 300, conversionRate: 0.012, churnRate: 0.4, baseSize: 3000, description: 'Price-conscious shoppers looking for convenience.'
      },
      {
        id: 'premium', name: 'Premium Customers', needs: ['Unique products', 'Excellent service', 'Quality'],
        budget: 200, preferences: ['Brand story', 'Premium packaging'], acquisitionCost: 120,
        lifetimeValue: 800, conversionRate: 0.008, churnRate: 0.3, baseSize: 500, description: 'Customers willing to pay more for quality and uniqueness.'
      },
    ],
    defaultChannels: [
      { channelId: 'ads', name: 'Paid Advertising', baseCost: 600, conversionRate: 0.015, scalability: 5, risk: 5, timeRequirement: 3, description: 'Social media and search ads driving immediate traffic.' },
      { channelId: 'seo', name: 'SEO', baseCost: 300, conversionRate: 0.01, scalability: 8, risk: 2, timeRequirement: 7, description: 'Organic search traffic that compounds over time.' },
      { channelId: 'social', name: 'Social Media', baseCost: 250, conversionRate: 0.012, scalability: 6, risk: 3, timeRequirement: 4, description: 'Organic social content driving brand awareness.' },
    ],
    productFocus: { quality: 6, features: 5, speed: 5, reliability: 6, userExperience: 6, innovation: 4, developmentCostMultiplier: 1.4 },
    startingValuation: 100000,
  },
  'marketing-agency': {
    type: 'marketing-agency',
    name: 'Marketing Agency',
    description: 'Provides marketing services to clients. Project-based revenue with high variability.',
    startupCost: { easy: 4000, normal: 2500, hard: 1500 },
    monthlyOverhead: { easy: 600, normal: 800, hard: 1000 },
    customerAcquisitionDifficulty: 7,
    baseMargins: { gross: 0.5, net: 0.15 },
    operationalComplexity: 5,
    growthPotential: 5,
    employeeRequirements: [
      { role: 'Marketer', minCount: 1, recommendedSkills: ['marketing', 'sales'] },
      { role: 'Designer', minCount: 1, recommendedSkills: ['product'] },
    ],
    risks: ['Project delays', 'Client churn', 'Creative block', 'Scope creep'],
    marketDynamics:
      'Service-based with creative elements. Client satisfaction is paramount. Revenue depends on winning and retaining clients. Talent retention is critical.',
    defaultCustomerSegments: [
      {
        id: 'smb', name: 'Small Business', needs: ['Affordable marketing', 'Quick results', 'Creative ideas'],
        budget: 1500, preferences: ['Flexible', 'Results-focused'], acquisitionCost: 800,
        lifetimeValue: 6000, conversionRate: 0.03, churnRate: 0.25, baseSize: 400, description: 'Budget-conscious businesses needing marketing help.'
      },
      {
        id: 'brands', name: 'Growing Brands', needs: ['Full-service', 'Data-driven', 'Brand strategy'],
        budget: 8000, preferences: ['Proven results', 'Agency partnership'], acquisitionCost: 3000,
        lifetimeValue: 48000, conversionRate: 0.015, churnRate: 0.15, baseSize: 80, description: 'Established brands scaling their marketing.'
      },
    ],
    defaultChannels: [
      { channelId: 'network', name: 'Professional Network', baseCost: 200, conversionRate: 0.05, scalability: 3, risk: 2, timeRequirement: 2, description: 'Referrals and word-of-mouth from past clients.' },
      { channelId: 'content', name: 'Case Studies & Portfolio', baseCost: 300, conversionRate: 0.03, scalability: 5, risk: 3, timeRequirement: 4, description: 'Showcasing past work to attract new clients.' },
      { channelId: 'events', name: 'Events & Networking', baseCost: 400, conversionRate: 0.04, scalability: 4, risk: 4, timeRequirement: 3, description: 'Speaking at events and industry meetups.' },
    ],
    productFocus: { quality: 7, features: 4, speed: 6, reliability: 7, userExperience: 6, innovation: 6, developmentCostMultiplier: 1.1 },
    startingValuation: 50000,
  },
  manufacturing: {
    type: 'manufacturing',
    name: 'Manufacturing',
    description: 'Physical product manufacturing. High capital investment, supply chain complexity, and scaling challenges.',
    startupCost: { easy: 100000, normal: 75000, hard: 50000 },
    monthlyOverhead: { easy: 5000, normal: 7000, hard: 9000 },
    customerAcquisitionDifficulty: 9,
    baseMargins: { gross: 0.35, net: 0.08 },
    operationalComplexity: 9,
    growthPotential: 6,
    employeeRequirements: [
      { role: 'Production Manager', minCount: 1, recommendedSkills: ['operations'] },
      { role: 'Quality Control', minCount: 1, recommendedSkills: ['operations'] },
      { role: 'Line Worker', minCount: 5, recommendedSkills: [] },
    ],
    risks: ['Supply chain disruption', 'Quality defects', 'Equipment breakdown', 'Raw material price volatility'],
    marketDynamics:
      'Capital-intensive with complex supply chains. Scale economies are important. Quality and reliability are non-negotiable. Long-term contracts provide stability but limit flexibility.',
    defaultCustomerSegments: [
      {
        id: 'distributors', name: 'Distributors', needs: ['Reliable supply', 'Competitive pricing', 'Quality consistency'],
        budget: 50000, preferences: ['Bulk pricing', 'On-time delivery'], acquisitionCost: 15000,
        lifetimeValue: 500000, conversionRate: 0.01, churnRate: 0.1, baseSize: 20, description: 'Distribution partners with volume needs.'
      },
      {
        id: 'retailers', name: 'Retailers', needs: ['Trend awareness', 'Fast turnaround', 'Private label'],
        budget: 25000, preferences: ['Flexible orders', 'Branded products'], acquisitionCost: 8000,
        lifetimeValue: 200000, conversionRate: 0.008, churnRate: 0.15, baseSize: 50, description: 'Retail chains seeking private label products.'
      },
    ],
    defaultChannels: [
      { channelId: 'trade-show', name: 'Trade Shows', baseCost: 1500, conversionRate: 0.05, scalability: 3, risk: 6, timeRequirement: 3, description: 'Industry events for B2B networking.' },
      { channelId: 'partnerships', name: 'Strategic Partnerships', baseCost: 1000, conversionRate: 0.08, scalability: 4, risk: 5, timeRequirement: 5, description: 'Long-term partnerships with suppliers and distributors.' },
      { channelId: 'sales', name: 'B2B Sales Team', baseCost: 2000, conversionRate: 0.03, scalability: 6, risk: 4, timeRequirement: 4, description: 'Dedicated sales outreach to enterprise buyers.' },
    ],
    productFocus: { quality: 8, features: 4, speed: 4, reliability: 9, userExperience: 5, innovation: 3, developmentCostMultiplier: 1.6 },
    startingValuation: 200000,
  },
  'mobile-app': {
    type: 'mobile-app',
    name: 'Mobile App',
    description:
      'A consumer or business mobile application. Low upfront costs but intense competition and user acquisition challenges.',
    startupCost: { easy: 6000, normal: 4000, hard: 2500 },
    monthlyOverhead: { easy: 400, normal: 600, hard: 800 },
    customerAcquisitionDifficulty: 8,
    baseMargins: { gross: 0.9, net: 0.25 },
    operationalComplexity: 4,
    growthPotential: 8,
    employeeRequirements: [
      { role: 'Developer', minCount: 1, recommendedSkills: ['product'] },
      { role: 'Designer', minCount: 1, recommendedSkills: ['product'] },
      { role: 'Growth Marketer', minCount: 1, recommendedSkills: ['marketing'] },
    ],
    risks: ['App store rejection', 'Platform changes', 'User retention', 'Copycat competitors'],
    marketDynamics:
      'Winner-take-most dynamics. User acquisition costs are high and volatile. Retention is the biggest challenge. Viral growth is possible but rare.',
    defaultCustomerSegments: [{
      id: 'users', name: 'App Users', needs: ['Solve a problem', 'Easy to use', 'Fast'],
      budget: 5, preferences: ['Intuitive design', 'Offline access', 'No ads'], acquisitionCost: 3,
      lifetimeValue: 25, conversionRate: 0.12, churnRate: 0.35, baseSize: 10000, description: 'Mobile-first users with low willingness to pay.',
    }],
    defaultChannels: [
      { channelId: 'social', name: 'Social Media', baseCost: 300, conversionRate: 0.015, scalability: 8, risk: 5, timeRequirement: 3, description: 'Viral content and social sharing.' },
      { channelId: 'ads', name: 'Paid Ads', baseCost: 400, conversionRate: 0.02, scalability: 5, risk: 6, timeRequirement: 2, description: 'Targeted mobile advertising.' },
      { channelId: 'organic', name: 'App Store Optimization', baseCost: 150, conversionRate: 0.01, scalability: 7, risk: 2, timeRequirement: 4, description: 'Optimizing app store presence for organic discovery.' },
    ],
    productFocus: { quality: 7, features: 6, speed: 8, reliability: 8, userExperience: 9, innovation: 6, developmentCostMultiplier: 1.3 },
    startingValuation: 50000,
  },
  'local-service': {
    type: 'local-service',
    name: 'Local Service Business',
    description: 'A service business serving a local area: plumbing, cleaning, consulting, etc.',
    startupCost: { easy: 5000, normal: 3000, hard: 2000 },
    monthlyOverhead: { easy: 300, normal: 400, hard: 500 },
    customerAcquisitionDifficulty: 5,
    baseMargins: { gross: 0.5, net: 0.2 },
    operationalComplexity: 3,
    growthPotential: 3,
    employeeRequirements: [
      { role: 'Technician', minCount: 1, recommendedSkills: [] },
    ],
    risks: ['Seasonal demand', 'Customer disputes', 'Insurance costs', 'Labor availability'],
    marketDynamics:
      'Hyper-local. Reputation is everything. Word-of-mouth and local SEO drive growth. Scale is limited by geography and labor.',
    defaultCustomerSegments: [
      {
        id: 'residential', name: 'Residential Customers', needs: ['Reliable service', 'Fair pricing', 'Quick response'],
        budget: 200, preferences: ['Same-day service', 'Transparent pricing'], acquisitionCost: 50,
        lifetimeValue: 500, conversionRate: 0.15, churnRate: 0.3, baseSize: 300, description: 'Homeowners and renters needing local services.'
      },
      {
        id: 'commercial', name: 'Commercial Clients', needs: ['Scheduled maintenance', 'Contracts', 'Scalability'],
        budget: 2000, preferences: ['Long-term contracts', 'Professional service'], acquisitionCost: 300,
        lifetimeValue: 12000, conversionRate: 0.05, churnRate: 0.15, baseSize: 50, description: 'Businesses requiring regular service contracts.'
      },
    ],
    defaultChannels: [
      { channelId: 'local', name: 'Local SEO & Directories', baseCost: 100, conversionRate: 0.12, scalability: 4, risk: 2, timeRequirement: 3, description: 'Google My Business and local listings.' },
      { channelId: 'referrals', name: 'Referrals', baseCost: 80, conversion: 0.2, scalability: 5, risk: 1, timeRequirement: 1, description: 'Satisfied customers referring friends.' },
      { channelId: 'community', name: 'Community Involvement', baseCost: 150, conversionRate: 0.08, scalability: 3, risk: 2, timeRequirement: 2, description: 'Local sponsorships and community presence.' },
    ],
    productFocus: { quality: 7, features: 2, speed: 6, reliability: 8, userExperience: 6, innovation: 2, developmentCostMultiplier: 0.8 },
    startingValuation: 40000,
  },
  media: {
    type: 'media',
    name: 'Media Company',
    description: 'Creates and distributes content. Audience is the product—revenue from advertising and subscriptions.',
    startupCost: { easy: 8000, normal: 5000, hard: 3000 },
    monthlyOverhead: { easy: 1000, normal: 1500, hard: 2000 },
    customerAcquisitionDifficulty: 6,
    baseMargins: { gross: 0.7, net: 0.15 },
    operationalComplexity: 5,
    growthPotential: 7,
    employeeRequirements: [
      { role: 'Content Creator', minCount: 2, recommendedSkills: ['marketing'] },
      { role: 'Editor', minCount: 1, recommendedSkills: ['product'] },
    ],
    risks: ['Audience churn', 'Platform algorithm changes', 'Content controversy', 'Ad rate fluctuations'],
    marketDynamics:
      'Audience-driven with platform dependencies. Viral hits can change everything overnight. Ad rates fluctuate with the economy. Content consistency matters.',
    defaultCustomerSegments: [
      {
        id: 'audience', name: 'Audience', needs: ['Engaging content', 'Value', 'Consistency'],
        budget: 0, preferences: ['Free access', 'High quality'], acquisitionCost: 5,
        lifetimeValue: 0, conversionRate: 0.9, churnRate: 0.2, baseSize: 10000, description: 'Engaged audience consuming content.'
      },
      {
        id: 'advertisers', name: 'Advertisers', needs: ['Audience reach', 'Engagement', 'Brand safety'],
        budget: 10000, preferences: ['Targeted advertising', 'Measurable ROI'], acquisitionCost: 0,
        lifetimeValue: 50000, conversionRate: 0.3, churnRate: 0.1, baseSize: 100, description: 'Brands seeking advertising opportunities.'
      },
    ],
    defaultChannels: [
      { channelId: 'social', name: 'Social Media', baseCost: 250, conversionRate: 0.15, scalability: 9, risk: 4, timeRequirement: 4, description: 'Content distribution across social platforms.' },
      { channelId: 'email', name: 'Email Newsletter', baseCost: 100, conversionRate: 0.3, scalability: 6, risk: 3, timeRequirement: 2, description: 'Direct audience engagement.' },
      { channelId: 'seo', name: 'SEO', baseCost: 200, conversionRate: 0.08, scalability: 8, risk: 2, timeRequirement: 5, description: 'Search engine optimization for content discovery.' },
    ],
    productFocus: { quality: 8, features: 6, speed: 7, reliability: 6, userExperience: 7, innovation: 7, developmentCostMultiplier: 1.2 },
    startingValuation: 60000,
  },
  'creative-agency': {
    type: 'creative-agency',
    name: 'Creative Agency',
    description:
      'Provides creative services: design, branding, content production. Project-based with high variability.',
    startupCost: { easy: 5000, normal: 3500, hard: 2000 },
    monthlyOverhead: { easy: 700, normal: 1000, hard: 1500 },
    customerAcquisitionDifficulty: 7,
    baseMargins: { gross: 0.55, net: 0.18 },
    operationalComplexity: 4,
    growthPotential: 5,
    employeeRequirements: [
      { role: 'Designer', minCount: 1, recommendedSkills: ['product'] },
      { role: 'Account Manager', minCount: 1, recommendedSkills: ['sales', 'leadership'] },
    ],
    risks: ['Project delays', 'Scope creep', 'Client satisfaction', 'Talent turnover'],
    marketDynamics:
      'Creative services with high client interaction. Reputation and portfolio are key. Each project is unique, making scaling challenging.',
    defaultCustomerSegments: [
      {
        id: 'smb', name: 'Small Businesses', needs: ['Affordable creative', 'Quick turnaround', 'Good communication'],
        budget: 3000, preferences: ['Package deals', 'Fast delivery'], acquisitionCost: 600,
        lifetimeValue: 8000, conversionRate: 0.04, churnRate: 0.3, baseSize: 200, description: 'Small businesses needing creative services.'
      },
      {
        id: 'brands', name: 'Established Brands', needs: ['High-quality work', 'Brand alignment', 'Strategic thinking'],
        budget: 15000, preferences: ['Agency partnership', 'Proven track record'], acquisitionCost: 5000,
        lifetimeValue: 100000, conversionRate: 0.02, churnRate: 0.15, baseSize: 30, description: 'Large brands seeking premium creative services.'
      },
    ],
    defaultChannels: [
      { channelId: 'portfolio', name: 'Portfolio & Case Studies', baseCost: 300, conversionRate: 0.05, scalability: 5, risk: 2, timeRequirement: 4, description: 'Showcasing award-winning work.' },
      { channelId: 'network', name: 'Professional Network', baseCost: 200, conversionRate: 0.04, scalability: 3, risk: 2, timeRequirement: 2, description: 'Referrals from past clients and partners.' },
      { channelId: 'events', name: 'Industry Events', baseCost: 500, conversionRate: 0.03, scalability: 4, risk: 5, timeRequirement: 3, description: 'Speaking and exhibiting at creative conferences.' },
    ],
    productFocus: { quality: 9, features: 3, speed: 6, reliability: 7, userExperience: 8, innovation: 7, developmentCostMultiplier: 1.1 },
    startingValuation: 55000,
  },
};
