import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../hooks/useForm"
import { useState } from "react"
import { validateEmail, validatePassword } from "../utils/validate-form-fields"
import { useSignup } from "../hooks/useSignup"

export const SignupPage = () => {

  const { onSignup } = useSignup()

  const { initialState, onFormChange } = useForm({ name: '', email: '', password: '' })

  const [errors, setErrors] = useState({
    isEmailValid: true,
    isPasswordValid: true,
    emailAlreadyExists: false,
  })

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isEmailValid = validateEmail(initialState.email)
    const isPasswordValid = validatePassword(initialState.password)

    setErrors({
      isEmailValid,
      isPasswordValid,
      emailAlreadyExists: false
    })

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    const wasSuccessful = await onSignup(initialState)

    if( !wasSuccessful ) {
      setErrors({
        ...errors,
        emailAlreadyExists: true
      })
      
      return
    }
  }

  return (
    <AuthLayout title="Crear cuenta">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onFormSubmit}>
          <input type="text" onChange={ onFormChange } value={ initialState.name } id="name" name="name" placeholder="Nombre" required />

          <input style={{ borderColor: errors.isEmailValid ? 'black' : 'red' }} type="text" autoComplete="email" onChange={ onFormChange } value={ initialState.email } id="email" name="email" placeholder="Correo Electronico" required />
          {!errors.isEmailValid && <p className="error-field">El correo electrónico no es válido</p>}

          <input style={{ borderColor: errors.isPasswordValid ? 'black' : 'red' }} type="password" autoComplete="current-password" onChange={ onFormChange } value={ initialState.password } id="password" name="password" placeholder="Contraseña" required />
          {!errors.isPasswordValid && <p className="error-field">La contraseña debe tener al menos 6 caracteres</p>}

          <div className="auth-buttons">
            <button type="submit">REGISTRAR</button>
          </div>
        </form>

        {errors.emailAlreadyExists && <p className="error-message">El correo electrónico ya está en uso</p>}
        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signin">¿Ya tienes una cuenta? Iniciar sesión</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
