import { api } from "../../../core/api/app-axios"

import type { User } from "../interfaces/user.interface";

export const authSignin = async (email: string, password: string): Promise<User | null> => {
  email = email.trim().toLowerCase()

  password = password.trim()

  try {
    const response = await api.post<User>('/auth/signin', { email, password })
    
    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }

}