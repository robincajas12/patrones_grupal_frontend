import { Link } from "react-router-dom"

import { AuthLayout } from "../layout/AuthLayout"

export const SignupPage = () => {
  return (
    <AuthLayout title="Signup">
      <div className="auth-container">
        <form className="auth-form">
          <input type="text" id="name" name="name" placeholder="name" required />
          <input type="email" id="email" name="email" placeholder="email" required />
          <input type="password" id="password" name="password" placeholder="password" required />
          
          <div className="auth-buttons">
            <button type="submit">Create Account</button>
          </div>
        </form>

        <div className="auth-footer">
          <Link className="auth-footer-link" to="/auth/signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
