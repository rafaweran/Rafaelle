export enum Priority {
  URGENT = 'Urgente',
  STANDARD = 'Padrão',
  LOW = 'Baixa'
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  priority: Priority;
  waitTime: string;
  complaint: string;
  email?: string;
}

export interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
}

export interface FinancialStats {
  totalEarnings: number;
  previousMonthComparison: number; // Percentage
  lastTransferDate: string;
}

export interface DashboardStats {
  totalPatients: number;
  completedVisits: number;
  newRequests: number;
}

export type NavigationItem = 'home' | 'patients' | 'chat' | 'agenda' | 'finance' | 'settings' | 'logout';