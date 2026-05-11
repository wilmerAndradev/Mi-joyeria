import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminUser {
  name: string;
  email: string;
  role: 'admin' | 'editor';
  avatar?: string;
}

interface AdminState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

// Mock credentials
const MOCK_ADMIN: AdminUser = {
  name: 'Valentina Morales',
  email: 'admin@lumiere.cl',
  role: 'admin',
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 800)); // simulate network delay

        if (email === 'admin@lumiere.cl' && password === 'lumiere2026') {
          set({ isAuthenticated: true, user: MOCK_ADMIN });
          return { success: true };
        }

        return { success: false, error: 'Credenciales incorrectas. Intenta nuevamente.' };
      },

      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'lumiere-admin-auth',
    }
  )
);
