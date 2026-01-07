import api from './api';

export type Summary = {
  totalSpent: number;
  remaining: number;
  dailyAverage: number;
  topCategory: { id: string; name: string; amount: number } | null;
};

export async function getSummary() {
  const res = await api.get<Summary>('/dashboard/summary');
  return res.data;
}
