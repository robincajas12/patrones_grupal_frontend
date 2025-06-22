import { useAuth0 } from "@auth0/auth0-react"

export const useSocialConnections = () => {

  const { loginWithRedirect, user, isLoading, isAuthenticated } = useAuth0()

  const startGoogleConnection = async () => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: "google-oauth2",
          prompt: "select_account",
          scope: "openid profile email",
        }
      })
    } catch (error) {
      console.error("Error starting Google connection:", error)
    }
  }

  return {
    startGoogleConnection,
    user,
    isLoading,
    isAuthenticated,
  }
}