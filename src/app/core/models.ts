export type SubscriptionPlan = 'free' | 'month' | 'year';

export type CardStatus = 'new' | 'learning' | 'review' | 'mastered';

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: SubscriptionPlan;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface BiochemModule {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  cardsTotal: number;
  color: string;
}

export interface StudyCard {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  clinicalNote: string;
  tags: string[];
}

export interface CardProgress {
  cardId: string;
  status: CardStatus;
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  lastReviewedAt?: string;
}

export interface ReviewItem {
  card: StudyCard;
  progress: CardProgress;
  module: BiochemModule;
}

export interface ModuleStats {
  moduleId: string;
  cardsTotal: number;
  dueNow: number;
  mastered: number;
  accuracy: number;
}

export interface LearningStats {
  dueNow: number;
  newCards: number;
  mastered: number;
  streakDays: number;
  averageAccuracy: number;
  modules: ModuleStats[];
}
