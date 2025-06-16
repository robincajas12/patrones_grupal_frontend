import { Routes } from "react-router-dom"
import { useAuthStore } from "../store/auth/hooks/useAuthStore"

export const AppRouter = () => {

  const status = useAuthStore(( state ) => state.status)

  if(status === 'checking') {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {/* {
        status === 'authenticated' ? 
      } */}
    </Routes>
  )
}
