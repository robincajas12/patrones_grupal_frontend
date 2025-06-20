import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"

export const SignupPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <div className="auth-container">
        <form className="auth-form">
          <input type="text" id="name" name="name" placeholder="Nombre" required />
          <input type="email" id="email" name="email" placeholder="Correo Electronico" required />
          <input type="password" id="password" name="password" placeholder="Contraseña" required />

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
