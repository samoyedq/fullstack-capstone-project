import { useNavigate } from "react-router-dom"
import "./PublicLanding.css"

export default function PublicLanding() {
  const navigate = useNavigate()

  return (
    <main className="landing-shell">
      <nav className="landing-nav">
        <div className="nav-logo">GiftLink</div>
        <div className="nav-links">
          <button className="nav-btn login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn register-btn" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">GiftLink</h1>
          <p className="hero-tagline">Share Gift Ideas with Friends & Family</p>
          <p className="hero-description">
            Discover the perfect gifts for everyone on your list. Create wishlists, 
            search for inspiration, and share your gift ideas with loved ones.
          </p>
          
          <button className="cta-button" onClick={() => navigate("/register")}>
            Get Started
          </button>

          <p className="hero-subtext">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate("/login") }}>Sign in</a>
          </p>
        </div>

        <div className="hero-image">
          <div className="image-placeholder">
            <span>🎁</span>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose GiftLink?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create Lists</h3>
            <p>Build personalized gift wishlists</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search</h3>
            <p>Find gifts by category or keyword</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Share</h3>
            <p>Share ideas with friends & family</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Discover</h3>
            <p>Get gift recommendations</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 GiftLink. All rights reserved.</p>
        <p className="deployment-info">Deployment URL: http://localhost:5173</p>
      </footer>
    </main>
  )
}