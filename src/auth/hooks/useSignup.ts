import { useAuthStore } from "../../store/auth/hooks/useAuthStore"
import type { SignupFormData } from "../../store/auth/interfaces/signup-form-data.interface"

export const useSignup = () => {

  const { signup } = useAuthStore()

  const onSignup = async (signupFormData: SignupFormData) => {
    if (!signupFormData.email || !signupFormData.password || !signupFormData.name) {
      return false
    }

    return await signup(signupFormData)
  }

  return {
    onSignup
  }
}