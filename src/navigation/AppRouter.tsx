import { Route, Routes } from "react-router-dom"
import { useAuthStore } from "../store/auth/hooks/useAuthStore"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useEffect } from "react"

export const AppRouter = () => {

  const status = useAuthStore(( state ) => state.status)
  const checkStatus = useAuthStore(( state ) => state.changeStatus)

  useEffect(() => {
    checkStatus()
  }, [])
  
  
  if(status === 'checking') {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {
        status === 'authenticated'
        ? <Route path="/*" element={ <div>Authenticated Content</div> } />
        : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }
    </Routes>
  )
}
