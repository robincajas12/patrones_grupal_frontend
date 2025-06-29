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

export const authSocialSignin = async (user: User): Promise<User | null> => {
  const { id, ...restUser } = user

  if(!user || !user.email || !id) {
    return null
  }

  try {
    const response = await api.post<User>('/auth/social/signin', restUser)

    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }
} 

export const authSignup = async (signupFormData: any): Promise<User | null> => {
  try {
    const response = await api.post<User>('/auth/signup', signupFormData)

    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }
}