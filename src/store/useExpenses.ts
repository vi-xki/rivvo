import { create } from 'zustand';
import api from '@/services/api';
import type { Expense } from '@/types';

type Filters = {
  month?: string; // YYYY-MM
  categoryId?: string;
};

type ExpenseState = {
  list: Expense[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  fetchExpenses: (filters?: Filters, page?: number) => Promise<void>;
  addExpense: (payload: Partial<Expense>) => Promise<Expense | null>;
  deleteExpense: (id: string) => Promise<void>;
};

export const useExpenses = create<ExpenseState>((set, get) => ({
  list: [],
  loading: false,
  error: null,
  total: 0,
  hasMore: true,
  fetchExpenses: async (filters = {}, page = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/expenses', { params: { ...filters, page } });
      const data = res.data;

      // Normalize response: API might return a raw array or an object { items, total }
      let items: Expense[] = [];
      let total = 0;

      if (Array.isArray(data)) {
        items = data;
        total = data.length;
      } else {
        items = data?.items ?? [];
        total = data?.total ?? items.length;
      }

      set((state) => {
        if (page === 1) {
          return { list: items, total, hasMore: items.length > 0 } as Partial<ExpenseState>;
        }
        // append for subsequent pages; if empty items, keep existing list
        return {
          list: items.length > 0 ? [...state.list, ...items] : state.list,
          total,
          hasMore: items.length > 0,
        } as Partial<ExpenseState>;
      });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
    } finally {
      set({ loading: false });
    }
  },
  addExpense: async (payload) => {
    try {
      const res = await api.post('/expenses', payload);
      set({ list: [res.data, ...get().list] });
      return res.data;
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
      return null;
    }
  },

  // Optimistic add: insert a temporary item then replace or rollback
  addExpenseOptimistic: async (payload: any) => {
    const tempId = `temp_${Date.now()}`;
    const tempItem = { ...payload, id: tempId } as Expense;
    set({ list: [tempItem, ...get().list] });
    try {
      const res = await api.post('/expenses', payload);
      // replace temp item with real item
      set({ list: get().list.map((i) => (i.id === tempId ? res.data : i)) });
      return res.data;
    } catch (err: any) {
      // rollback
      set({ list: get().list.filter((i) => i.id !== tempId) });
      set({ error: err?.response?.data?.message || err.message });
      return null;
    }
  },
  deleteExpense: async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      set({ list: get().list.filter((e) => e.id !== id) });
    } catch (err: any) {
      set({ error: err?.response?.data?.message || err.message });
    }
  },
}));
