interface AuthLayoutProps {
  children: React.ReactNode
  title: string
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <section className="auth-layout-container">
      <h1>{title}</h1>
      { children }
    </section>
  )
}
