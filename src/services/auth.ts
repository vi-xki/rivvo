import api from './api';
import type { User } from '@/types';

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await api.post('/auth/login', { email, password });
  // map API's `access_token` to expected `token` property
  return { token: res.data?.access_token ?? (res.data as any)?.token, user: res.data.user };
}

export async function signup(name: string, email: string, password: string): Promise<{ token: string; user: User }> {
  const res = await api.post('/auth/signup', { name, email, password });
  // map API's `access_token` to expected `token` property
  return { token: res.data?.access_token ?? (res.data as any)?.token, user: res.data.user };
}

export async function me() {
  const res = await api.get('/auth/me');
  return res.data;
}
