import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../hooks/useForm"
import { useSocialConnections } from "../hooks/useSocialConnections"
import { useAuthStore } from "../../store/auth/hooks/useAuthStore"
import type { User } from "../../store/auth/interfaces/user.interface"
import { validateEmail, validatePassword } from "../utils/validate-form-fields"
import { useSignin } from "../hooks/useSignin"

export const SigninPage = () => {

  const { initialState, onFormChange } = useForm({ email: '', password: '' })

  const [isEmailValid, setIsEmailValid] = useState( true )

  const [isPasswordValid, setIsPasswordValid] = useState( true )

  const [areCredentialsValid, setAreCredentialsValid] = useState( true )

  const { socialSignin } = useAuthStore()

  const { onSignin } = useSignin()
  
  const { startGoogleConnection, user: auth0User, isAuthenticated, isLoading } = useSocialConnections()

  useEffect(() => {

    onGoogleSignin({ email: auth0User?.email || '', name: auth0User?.name || '', id: auth0User?.sub || '' })

  }, [isAuthenticated])

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAreCredentialsValid(true)

    const emailValidated = validateEmail(initialState.email)
    const passwordValidated = validatePassword(initialState.password)

    setIsEmailValid(emailValidated)

    setIsPasswordValid(passwordValidated)

    if(!emailValidated || !passwordValidated) {
      console.log(initialState.email, initialState.password);
      
      return
    }

    const wasSuccessful = await onSignin(initialState.email, initialState.password)

    if(!wasSuccessful) {
      console.log('error signing in');
      
      setAreCredentialsValid(false)
      return
    }
  }

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
        <form className="auth-form" onSubmit={ onFormSubmit }>
          <input style={{ borderColor: isEmailValid ? 'black' : 'red' }} autoComplete="email" type="text" onChange={ onFormChange } value={ initialState.email } id="email" name="email" placeholder="Correo Electronico" required />
          {!isEmailValid && <p className="error-field">El correo electrónico no es válido</p>}
          <input style={{ borderColor: isPasswordValid ? 'black' : 'red' }} autoComplete="current-password" type="password" onChange={ onFormChange } value={ initialState.password } id="password" name="password" placeholder="Contraseña" required />
          {!isPasswordValid && <p className="error-field">La contraseña debe tener al menos 6 caracteres</p>}

          <div className="auth-buttons">
            <button type="submit">INICIAR SESION</button>
            <button onClick={startGoogleConnection} type="button">GOOGLE</button>
          </div>
          {!areCredentialsValid && <p className="error-message">Credenciales incorrectas</p>}
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signup">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
