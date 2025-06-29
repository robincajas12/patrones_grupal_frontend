import { useEffect } from "react"
import { AppRouter } from "./navigation/AppRouter"
import './styles.css'
import { useAuthStore } from "./store/auth/hooks/useAuthStore"

export const PianoApp = () => {

  const { logout } = useAuthStore()
  
  useEffect(() => {
    // logout()
  }, [])

  return (
    <>
      <AppRouter/>
    </>
  )
}
