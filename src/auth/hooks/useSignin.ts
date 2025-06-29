import { useAuthStore } from "../../store/auth/hooks/useAuthStore";

export const useSignin = () => {
  const { signin } = useAuthStore();

  const onSignin = async (email: string, password: string) => {
    if (!email || !password) {
      return false;
    }

    return await signin(email, password);
  };

  return {
    onSignin,
  };  
}