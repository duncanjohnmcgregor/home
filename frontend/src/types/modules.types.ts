// Finance Module Types
export interface FinanceRecord {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  monthlyAverage: number;
}

// Health Module Types
export interface HealthRecord {
  id: string;
  userId: string;
  type: 'weight' | 'exercise' | 'sleep' | 'meal';
  value: number;
  unit: string;
  notes?: string;
  date: string;
  createdAt: string;
  updatedAt?: string;
}

export interface HealthSummary {
  averageWeight?: number;
  exerciseCount: number;
  averageSleep?: number;
  weeklyGoalProgress: number;
}

// Home Module Types
export interface HomeTask {
  id: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface HomeItem {
  id: string;
  userId: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

// Social Module Types
export interface SocialContact {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  email?: string;
  phone?: string;
  birthday?: string;
  notes?: string;
  lastContact?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SocialEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  attendees?: string[];
  createdAt: string;
  updatedAt?: string;
}
