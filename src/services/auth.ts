import api from './api';
import type { AuthResponse } from '@/types';

export async function login(email: string, password: string) {
  const res = await api.post<AuthResponse>('/auth/login', { email, password });
  return res.data;
}

export async function signup(name: string, email: string, password: string) {
  const res = await api.post<AuthResponse>('/auth/signup', { name, email, password });
  return res.data;
}

export async function me() {
  const res = await api.get('/auth/me');
  return res.data;
}
