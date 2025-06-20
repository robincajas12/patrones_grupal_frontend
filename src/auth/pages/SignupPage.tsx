import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../hooks/useForm"

export const SignupPage = () => {

  const { initialState, onFormChange } = useForm({ name: '', email: '', password: '' })

  return (
    <AuthLayout title="Crear cuenta">
      <div className="auth-container">
        <form className="auth-form">
          <input type="text" onChange={ onFormChange } value={ initialState.name } id="name" name="name" placeholder="Nombre" required />
          <input type="email" onChange={ onFormChange } value={ initialState.email } id="email" name="email" placeholder="Correo Electronico" required />
          <input type="password" onChange={ onFormChange } value={ initialState.password } id="password" name="password" placeholder="Contraseña" required />

          <div className="auth-buttons">
            <button type="submit">REGISTRAR</button>
          </div>
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signin">¿Ya tienes una cuenta? Iniciar sesión</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
