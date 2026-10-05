import { PersonalityTrait } from './game';
import { SkillSet } from './player';

export type CharacterId =
  | 'maya'
  | 'emre'
  | 'selin'
  | 'kerem'
  | 'deniz'
  | 'professor-arda'
  | 'alex-chen'
  | 'riya-patel'
  | 'tomasz-nowak';

export type RelationshipStatus = 'stranger' | 'acquaintance' | 'contact' | 'friend' | 'confidant' | 'rival';

export interface Character {
  id: CharacterId;
  name: string;
  description: string;
  role: string;
  personality: PersonalityTrait[];
  strengths: string[];
  weaknesses: string[];
  initialTrust: number;
  skills: Partial<SkillSet>;
  goals: string[];
  availableAt: number[];
  conversationTopics: string[];
  offers: CharacterOffer[];
}

export interface CharacterOffer {
  id: string;
  text: string;
  type: 'join' | 'invest' | 'partner' | 'job' | 'advice' | 'competition' | 'service';
  conditions: OfferCondition[];
  effects: OfferEffect[];
}

export interface OfferCondition {
  type: 'trust' | 'reputation' | 'chapter' | 'company-stat' | 'player-stat' | 'character-relationship';
  target: string;
  operator: '>=' | '>' | '<=' | '<' | '===' | '!==' | 'between';
  value: number;
  value2?: number;
}

export interface OfferEffect {
  type: 'join-company' | 'invest' | 'partnership' | 'knowledge-gain' | 'network-gain' | 'reputation-gain' | 'resource' | 'event-trigger' | 'stat-change';
  target: string;
  amount: number;
  description: string;
}

export interface Relationship {
  characterId: CharacterId;
  status: RelationshipStatus;
  trust: number;
  affinity: number;
  history: RelationshipEvent[];
  lastInteraction: number;
}

export interface RelationshipEvent {
  month: number;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  trustChange: number;
}
