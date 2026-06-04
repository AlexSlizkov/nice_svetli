export interface RoiCalculation {
  monthlySavings: number;
  revenueIncreaseThreeMonths: number;
  hoursSavedPerWeek: number;
  conversionBoosterPercent: number;
  savingsBreakdown: {
    hrRoutine: number;
    taskControl: number;
    financeLeaks: number;
  };
  topThreeLevers: string[];
  rolloutRoadmap: {
    month: string;
    focus: string;
    actions: string[];
    expectedOutcome: string;
  }[];
  executiveSummary: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  monthlyRevenue: number;
  employeesCount: number;
  painPoints: string[];
  role: string;
  aiAnalysis?: {
    leadScore: number;
    qualification: string;
    suggestedModules: string[];
    immediateAction: string;
    draftIntroCopy: string;
  };
}

export interface Tariff {
  name: string;
  price: number;
  pricePeriod: string;
  badge?: string;
  users: string;
  features: string[];
  outsourcing: string[];
  color: string;
}
