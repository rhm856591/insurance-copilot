export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'hot' | 'warm' | 'cold';
  sentiment: number;
  lastContact: Date;
  policyInterest: string;
  notes: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'agent';
  content: string;
  timestamp: Date;
  sentiment?: number;
}

export interface ComplianceCheck {
  isCompliant: boolean;
  issues: string[];
  suggestions: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface DraftAnalysis {
  sentiment: number;
  tone: string;
  suggestions: string[];
  complianceCheck: ComplianceCheck;
}

export interface PolicyInfo {
  id: string;
  name: string;
  type: string;
  premium: number;
  coverage: number;
  term: number;
}
