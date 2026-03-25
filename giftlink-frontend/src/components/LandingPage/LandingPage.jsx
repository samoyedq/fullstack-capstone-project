import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LandingPage.css"

export default function LandingPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (!user) return null

  return (
    <main className="landing-shell">
      <div className="landing-header">
        <h1>GiftLink</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <section className="landing-content">
        <div className="welcome-card">
          <h2>Welcome, {user.username}! 🎉</h2>
          <p>You're successfully logged in to GiftLink</p>
        </div>

        <div className="deployment-card">
          <h3>Deployment URLs</h3>
          <div className="url-box">
            <p className="label">Frontend</p>
            <code>http://localhost:5173</code>
          </div>
          <div className="url-box">
            <p className="label">Backend API</p>
            <code>http://localhost:5000</code>
          </div>
        </div>

        <div className="features-card">
          <h3>Available Endpoints</h3>
          <ul>
            <li><strong>POST</strong> /api/auth/register - Create account</li>
            <li><strong>POST</strong> /api/auth/login - Login user</li>
            <li><strong>GET</strong> /api/gifts - Get all gifts</li>
            <li><strong>POST</strong> /api/gifts/search - Search gifts</li>
          </ul>
        </div>

        <div className="token-card">
          <h3>Your Token</h3>
          <code className="token">{user.token || user.username}</code>
        </div>
      </section>
    </main>
  )
}