import { useAuth0 } from "@auth0/auth0-react"

export const useSocialConnections = () => {

  const { loginWithPopup, user, isLoading, isAuthenticated } = useAuth0()

  const startGoogleConnection = async () => {
    try {
      await loginWithPopup({
        authorizationParams: {
          connection: "google-oauth2",
          prompt: "select_account",
          scope: "openid profile email",
        }
      })

      console.log({ user, isLoading, isAuthenticated });
    } catch (error) {
      console.error("Error starting Google connection:", error)
    }
  }

  return {
    startGoogleConnection
  }
}