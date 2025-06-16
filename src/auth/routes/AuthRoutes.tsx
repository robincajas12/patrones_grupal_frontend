import { Navigate, Route, Routes } from "react-router-dom"
import { SigninPage } from "../pages/SigninPage"
import { SignupPage } from "../pages/SignupPage"

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="signin" element={ <SigninPage /> } />

      <Route path="signup" element={ <SignupPage /> } />

      <Route path="/*" element={ <Navigate to={"/auth/login"} /> } />
    </Routes>
  )
}
