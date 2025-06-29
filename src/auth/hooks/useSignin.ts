import { useAuthStore } from "../../store/auth/hooks/useAuthStore";

export const useSignin = () => {
  const { signin, socialSignin } = useAuthStore();

  const onSignin = async (email: string, password: string) => {
    if (!email || !password) {
      return false;
    }

    return await signin(email, password);
  };

  // const onSocialSignin = async (email: string, name: string) => {
  //   if (!email || !name) {
  //     return false;
  //   }

  //   return await socialSignin({ email, name });
  // }

  return {
    onSignin,
    // onSocialSignin,
  };  
}