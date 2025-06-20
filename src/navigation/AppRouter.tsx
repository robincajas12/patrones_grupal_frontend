import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthStore } from "../store/auth/hooks/useAuthStore"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useEffect } from "react"
import App from "../App"

export const AppRouter = () => {

  const status = useAuthStore(( state ) => state.status)
  const changeStatus = useAuthStore(( state ) => state.changeStatus)

  useEffect(() => {
    changeStatus()
  }, [])
  
  
  if(status === 'checking') {
    return <div>Loading.....</div>
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path="/*" element={ <App/> } />
        : <Route path="/auth/*" element={ <AuthRoutes /> } />
      }

      <Route path="/*" element={ <Navigate to={"/auth/signin"} /> } />
    </Routes>
  )
}
