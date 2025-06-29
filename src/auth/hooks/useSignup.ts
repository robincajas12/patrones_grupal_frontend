import { useAuthStore } from "../../store/auth/hooks/useAuthStore"

export const useSignup = () => {

  const { signup } = useAuthStore()

  const onSignup = async (signupFormData: any) => {
    
  }

  return {

  }
}