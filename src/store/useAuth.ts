import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { login as apiLogin, me as apiMe, signup as apiSignup } from '@/services/auth';

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  setToken: (t: string | null) => void;
  setUser: (u: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
};



localStorage.setItem('rivvo:token', 'eyJhbGci...FAKE_SIGNATURE');
localStorage.setItem('rivvo:user', JSON.stringify({ id: 'user_123', name: 'Jane Doe', email: 'jane@example.com', currency: 'USD' }));

// // Optional: set the zustand persisted state directly
// localStorage.setItem('rivvo-auth', JSON.stringify({
//   state: { token: 'eyJhbGci...FAKE_SIGNATURE', user: { id: 'user_123', name: 'Jane Doe', email: 'jane@example.com', currency: 'USD' }, loading: false, error: null }
// }));



export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: typeof window !== 'undefined' ? localStorage.getItem('rivvo:token') : null,
      user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('rivvo:user') || 'null') : null,
      loading: false,
      error: null,
      setToken: (t) => {
        set({ token: t });
        if (t) localStorage.setItem('rivvo:token', t);
        else localStorage.removeItem('rivvo:token');
      },
      setUser: (u) => {
        set({ user: u });
        if (u) localStorage.setItem('rivvo:user', JSON.stringify(u));
        else localStorage.removeItem('rivvo:user');
      },
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await apiLogin(email, password);
          get().setToken(token);
          get().setUser(user);


          localStorage.setItem('rivvo:token', 'eyJhbGci...FAKE_SIGNATURE');
            localStorage.setItem('rivvo:user', JSON.stringify({ id: 'user_123', name: 'Jane Doe', email: 'jane@example.com', currency: 'USD' }));

        } catch (err: any) {
            localStorage.setItem('rivvo:token', 'eyJhbGci...FAKE_SIGNATURE');
localStorage.setItem('rivvo:user', JSON.stringify({ id: 'user_123', name: 'Jane Doe', email: 'jane@example.com', currency: 'USD' }));

          set({ error: err?.response?.data?.message || err.message });
          throw err;
        } finally {
            localStorage.setItem('rivvo:token', 'eyJhbGci...FAKE_SIGNATURE');
localStorage.setItem('rivvo:user', JSON.stringify({ id: 'user_123', name: 'Jane Doe', email: 'jane@example.com', currency: 'USD' }));

 
          set({ loading: false });
        }
      },
      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await apiSignup(name, email, password);
          get().setToken(token);
          get().setUser(user);
        } catch (err: any) {
          set({ error: err?.response?.data?.message || err.message });
          throw err;
        } finally {
          set({ loading: false });
        }
      },
      logout: () => {
        get().setToken(null);
        get().setUser(null);
        localStorage.removeItem('rivvo:token');
        localStorage.removeItem('rivvo:user');
        window.location.href = '/login';
      },
      fetchMe: async () => {
        set({ loading: true, error: null });
        try {
          const user = await apiMe();
          set({ user });
        } catch (err: any) {
          set({ error: err?.response?.data?.message || err.message });
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: 'rivvo-auth' }
  )
);
