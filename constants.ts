import { Doctor, FinancialStats, Patient, Priority, DashboardStats } from './types';

export const CURRENT_DOCTOR: Doctor = {
  name: "Dr. Gabriel Martins",
  specialty: "Cardiologia",
  avatar: "https://picsum.photos/id/64/200/200"
};

export const DASHBOARD_STATS: DashboardStats = {
  totalPatients: 1240,
  completedVisits: 48,
  newRequests: 12
};

export const FINANCIAL_STATS: FinancialStats = {
  totalEarnings: 15430.00,
  previousMonthComparison: 12.5,
  lastTransferDate: "15/10/2023"
};

export const WAITING_LIST: Patient[] = [
  {
    id: '1',
    name: 'Mariana Costa',
    avatar: 'https://picsum.photos/id/65/200/200',
    priority: Priority.URGENT,
    waitTime: '15 min',
    complaint: 'Dor torácica aguda e falta de ar.'
  },
  {
    id: '2',
    name: 'Roberto Almeida',
    avatar: 'https://picsum.photos/id/66/200/200',
    priority: Priority.STANDARD,
    waitTime: '45 min',
    complaint: 'Renovação de receita de hipertensão.'
  },
  {
    id: '3',
    name: 'Fernanda Lima',
    avatar: 'https://picsum.photos/id/67/200/200',
    priority: Priority.STANDARD,
    waitTime: '1h 10min',
    complaint: 'Dúvidas sobre efeitos colaterais da medicação.'
  },
  {
    id: '4',
    name: 'Carlos Souza',
    avatar: 'https://picsum.photos/id/68/200/200',
    priority: Priority.URGENT,
    waitTime: '5 min',
    complaint: 'Palpitações fortes e tontura.'
  }
];