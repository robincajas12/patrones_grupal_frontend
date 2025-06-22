import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../hooks/useForm"
import { useSocialConnections } from "../hooks/useSocialConnections"
import { useAuthStore } from "../../store/auth/hooks/useAuthStore"
import type { User } from "../../store/auth/interfaces/User"

export const SigninPage = () => {

  const { initialState, onFormChange } = useForm({ email: '', password: '' })

  const { socialSignin } = useAuthStore()
  
  const { startGoogleConnection, user, isAuthenticated, isLoading } = useSocialConnections()

  console.log({ user, isAuthenticated, isLoading });

  const onGoogleSignin = async () => {
    await startGoogleConnection()

    if(!user) {
      console.error("No user found after Google sign-in")
      return
    }

    await socialSignin({ email: user.email, name: user.given_name, id: user.sub } as User)

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
            <button onClick={ () => {}} type="submit">INICIAR SESION</button>
            <button onClick={ () => startGoogleConnection()} type="button">GOOGLE</button>
          </div>
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signup">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
