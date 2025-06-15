import type { User } from "../interfaces/User"

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthState {
  status: AuthStatus
  user: User | null

  signin: (email: string, password: string) => Promise<boolean>
  socialSignin: (provider: string) => Promise<boolean>

  signup: (email: string, password: string) => Promise<boolean>

  logout: () => Promise<void>
  
}

