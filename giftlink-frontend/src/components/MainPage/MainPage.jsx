import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MainPage.css"

export default function MainPage() {
  const navigate = useNavigate()
  const [gifts, setGifts] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    price: "",
    link: ""
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
    } else {
      setUser(JSON.parse(userData))
    }
    fetchGifts()
  }, [navigate])

  const fetchGifts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gifts")
      const data = await res.json()
      setGifts(Array.isArray(data) ? data : data.gifts || [])
      setSearchResults(null)
      setSearchQuery("")
    } catch (err) {
      setError("Failed to load gifts")
      console.error("Fetch gifts error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setSearching(true)

    try {
      const res = await fetch("http://localhost:5000/api/gifts/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      })

      const data = await res.json()
      setSearchResults(Array.isArray(data) ? data : data.results || [])
    } catch (err) {
      console.error("Search error:", err)
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults(null)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddGift = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("http://localhost:5000/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Failed to add gift")
      }

      setGifts([...gifts, data])
      setFormData({ title: "", description: "", category: "General", price: "", link: "" })
      setShowForm(false)
      alert("Gift added successfully!")
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (!user) return null

  const displayGifts = searchResults !== null ? searchResults : gifts

  return (
    <main className="main-shell">
      <header className="main-header">
        <div className="header-left">
          <h1 className="logo">GiftLink</h1>
          <p className="tagline">Share gift ideas with friends</p>
        </div>
        <div className="header-right">
          <span className="user-badge">{user.username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="search-section">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gifts by title, category..."
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={searching}>
            {searching ? "Searching..." : "Search"}
          </button>
          {searchResults !== null && (
            <button type="button" className="clear-search-btn" onClick={clearSearch}>
              Clear
            </button>
          )}
        </form>
      </section>

      <section className="gifts-section">
        <div className="section-header">
          <div>
            <h2>
              {searchResults !== null 
                ? `Search Results (${searchResults.length})`
                : "All Gifts"}
            </h2>
            {searchResults !== null && searchQuery && (
              <p className="search-subtitle">Results for "{searchQuery}"</p>
            )}
          </div>
          <button className="add-gift-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "+ Add Gift"}
          </button>
        </div>
        
        {loading && !searchResults && (
          <div className="loading">
            <p>Loading gifts...</p>
          </div>
        )}

        {error && !searchResults && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchGifts}>Retry</button>
          </div>
        )}

        {!loading && displayGifts.length === 0 && !error && (
          <div className="empty-state">
            <p>
              {searchResults !== null 
                ? "No gifts found matching your search."
                : "No gifts added yet."}
            </p>
            <p className="hint">
              {searchResults !== null 
                ? "Try a different search term"
                : "Start by adding your first gift idea!"}
            </p>
          </div>
        )}

        {!loading && displayGifts.length > 0 && (
          <div className="gifts-grid">
            {displayGifts.map((gift, idx) => (
              <div key={gift._id || idx} className="gift-card">
                <div className="gift-header">
                  <h3>{gift.title || "Untitled Gift"}</h3>
                  {gift.category && <span className="category">{gift.category}</span>}
                </div>
                <p className="gift-desc">{gift.description || "No description"}</p>
                {gift.link && (
                  <a href={gift.link} target="_blank" rel="noopener noreferrer" className="gift-link">
                    View →
                  </a>
                )}
                {gift.price && <p className="gift-price">${gift.price}</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Gift</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            <form className="add-gift-form" onSubmit={handleAddGift}>
              <div className="form-group">
                <label htmlFor="title">Gift Title *</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Wireless Headphones"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Tell us about this gift..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    placeholder="e.g. Electronics"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="link">Link</label>
                <input
                  id="link"
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleFormChange}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "Adding..." : "Add Gift"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}