import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../hooks/useForm"
import { useSocialConnections } from "../hooks/useSocialConnections"
import { useAuthStore } from "../../store/auth/hooks/useAuthStore"
import type { User } from "../../store/auth/interfaces/user.interface"
import { useEffect } from "react"

export const SigninPage = () => {

  const { initialState, onFormChange } = useForm({ email: '', password: '' })

  const { socialSignin } = useAuthStore()
  
  const { startGoogleConnection, user: auth0User, isAuthenticated, isLoading } = useSocialConnections()

  useEffect(() => {

    onGoogleSignin({ email: auth0User?.email || '', name: auth0User?.name || '', id: auth0User?.sub || '' })

  }, [isAuthenticated])

  const onGoogleSignin = async (user?: User) => {
    if(!user || user?.email === '') {
      return
    }

    const isSignedIn = await socialSignin(user)

    if(!isSignedIn) {
      console.error("Error signing in with Google")
      return
    }
  }
  
  if( isLoading ) {
    return (
      <AuthLayout title="Cargando...">
        <div className="auth-container">
          <p>Cargando...</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Iniciar Sesion">
      <div className="auth-container">
        <form className="auth-form">
          <input autoComplete="email" type="email" onChange={ onFormChange } value={ initialState.email } id="email" name="email" placeholder="Correo Electronico" required />
          <input autoComplete="current-password" type="password" onChange={ onFormChange } value={ initialState.password } id="password" name="password" placeholder="Contraseña" required />

          <div className="auth-buttons">
            <button onClick={ () => console.log(auth0User)} type="submit">INICIAR SESION</button>
            <button onClick={startGoogleConnection} type="button">GOOGLE</button>
          </div>
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signup">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
