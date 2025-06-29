import { create } from "zustand";

import type { User } from "../interfaces/user.interface"
import { type SignupFormData } from '../interfaces/signup-form-data.interface';
import { authSignin } from "../actions/auth-actions";

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
  status: AuthStatus
  user: User | null

  signin: (email: string, password: string) => Promise<boolean>
  socialSignin: (user: User) => Promise<boolean>

  signup: (signupFormData: SignupFormData) => Promise<boolean>

  logout: () => Promise<void>

  changeStatus: (user: User | null) => Promise<boolean>

  checkStatus: () => Promise<void>

  currentUser: (user?: User | null) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  user: null,

  signin: async (email: string, password: string) => {
    const user = await authSignin(email, password)

    return get().changeStatus(user);
  },
  socialSignin: async (user: User) => {
    await get().currentUser(user)

    if(!user) {
      await get().currentUser()
      return false
    }

    return true
  },
  signup: async (signupFormData: SignupFormData) => {
    console.log({signupFormData});
    
    return true
  },
  logout: async () => {
    set({ status: 'unauthenticated', user: null })

    localStorage.removeItem('user');
  },
  checkStatus: async () => {
    const userStringified = localStorage.getItem('user');

    const user = userStringified ? JSON.parse(userStringified) : null;

    await get().currentUser(user)
  },
  changeStatus: async (user?: User | null) => {
    if(!user) {
      set({ status: 'unauthenticated', user: null });
      localStorage.removeItem('user');
      return false;
    }

    localStorage.setItem('user', JSON.stringify(user));
    
    set({ status: 'authenticated', user });

    return true;
  },
  currentUser: async (user?: User | null) => {
    if(!user) {
      set({ user: null, status: 'unauthenticated' });
      localStorage.removeItem('user');
      return false;
    }

    localStorage.setItem('user', JSON.stringify(user));
    set({ user, status: 'authenticated' });
    return true;
  }
}))