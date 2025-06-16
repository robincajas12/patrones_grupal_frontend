import { AuthLayout } from "../layout/AuthLayout"

export const SigninPage = () => {
  return (
    <AuthLayout title="Signin">
      <div className="auth-container">
        <form className="auth-form">
          <input type="email" id="email" name="email" placeholder="email" required />
          <input type="password" id="password" name="password" placeholder="password" required />
          
          <div className="auth-buttons">
            <button type="submit">Sign In</button>
            <button type="button" className="auth-button auth-button--google">Google</button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
