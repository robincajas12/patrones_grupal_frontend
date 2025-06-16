import { create } from "zustand";
import type { User } from "../interfaces/User"
import { SignupFormData } from '../interfaces/signup-form-data.interface';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
  status: AuthStatus
  user: User | null

  signin: (email: string, password: string) => Promise<boolean>
  socialSignin: (provider: string) => Promise<boolean>

  signup: (signupFormData: SignupFormData) => Promise<boolean>

  logout: () => Promise<void>

  changeStatus: () => Promise<boolean>

  currentUser: (user: User) => Promise<void>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  user: null,

  signin: async (email: string, password: string) => {
    return true
  },

  socialSignin: async (provider: string) => {
    return true
  },
  signup: async (signupFormData: SignupFormData) => {
    return true
  },
  logout: async () => {
    set({ status: 'unauthenticated', user: null })
  },
  changeStatus: async () => {
    const currentStatus = get().status;
    set({ status: currentStatus === 'checking' ? 'unauthenticated' : 'checking' });
    return true;
  }
  ,
  currentUser: async (user: User) => {
    set({ user, status: 'authenticated' });
    return;
  }
}))