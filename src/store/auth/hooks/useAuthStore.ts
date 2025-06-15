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

