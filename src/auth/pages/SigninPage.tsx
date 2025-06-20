import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"

export const SigninPage = () => {
  return (
    <AuthLayout title="Iniciar Sesion">
      <div className="auth-container">
        <form className="auth-form">
          <input type="email" id="email" name="email" placeholder="Correo Electronico" required />
          <input type="password" id="password" name="password" placeholder="Contraseña" required />

          <div className="auth-buttons">
            <button type="submit">INICIAR SESION</button>
            <button type="button">GOOGLE</button>
          </div>
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signup">¿No tienes una cuenta? Regístrate</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
