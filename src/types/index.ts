export type User = {
  id: string;
  name: string;
  email: string;
  currency?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Category = {
  id: string;
  name: string;
  icon?: string; // icon name
  color?: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: Category;
  date: string; // ISO
  note?: string;
  userId?: string;
};

export type Budget = {
  month: string; // YYYY-MM
  amount: number;
};

export type ApiError = {
  message: string;
  details?: any;
};