export type Platform = 'Instagram' | 'TikTok';

export type FollowupStage = 
  | 'Follow-up 1 of 3'
  | 'Follow-up 2 of 3'
  | 'Follow-up 3 of 3 (Final)'
  | 'Initial Outreach'
  | 'Demo Delivered'
  | 'Contract Sent'
  | 'Closed Won';

export type IntentType = 
  | 'High-Ticket Contract'
  | 'Tech Feasibility'
  | 'Demo Booked'
  | 'Pricing Request'
  | 'Menu Integration';

export interface UrgentTarget {
  id: string;
  name: string;
  location: string;
  subtext: string;
  platform: Platform;
  handle: string;
  overdueSla: string;
  slaSeverity: 'critical' | 'high' | 'warning' | 'normal';
  sequenceStage: FollowupStage;
  mockupFile: string;
  mockupTitle: string;
  avatarChar: string;
  avatarColor: string;
  status: 'pending' | 'sent' | 'replied' | 'closed';
  lastMessage?: string;
  cuisine: string;
  avgCheck: number;
}

export interface InboundSignal {
  id: string;
  restaurantName: string;
  handle: string;
  platform: Platform;
  timeAgo: string;
  message: string;
  intent: IntentType;
  avatarUrl: string;
  unread: boolean;
}

export interface FunnelStage {
  id: string;
  number: string;
  name: string;
  leadsCount: number;
  dropRate?: string;
  avgVelocity: string;
  percentTotal: string;
  badgeLabel: string;
  gradient: string;
  shadowColor: string;
  leads: string[];
}

export interface QueuedCopilotAction {
  restaurantName: string;
  handle: string;
  badge: string;
  subBadge: string;
  imageUrl: string;
  stageName: string;
  generatedDM: string;
  cuisine: string;
  suggestedFollowupDate: string;
  hookAngle: string;
}

export interface LeadAcquisitionCandidate {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  avgCheck: number;
  coversNight: number;
  michelinStatus: string;
  instagramHandle: string;
  followers: string;
  bookingProvider: string;
  status: 'uncontacted' | 'enriching' | 'queued';
}

export type NavTab = 
  | 'executive-dashboard'
  | 'follow-up-copilot'
  | 'crm-master-pipeline'
  | 'lead-acquisition'
  | 'insights-analytics';

export type Timeframe = 'Real-time' | '7D' | '30D' | 'Quarter';

export type HospitalityFilter = 
  | 'all'
  | 'michelin'
  | 'fine-dining'
  | 'nightclub-lounges'
  | 'multi-location';
