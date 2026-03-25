import { Link, useLocation } from "react-router-dom"

export default function NavigateBar() {
  const { pathname } = useLocation()

  return (
    <nav style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
      <Link
        to="/login"
        style={{ fontWeight: pathname === "/login" ? "700" : "400" }}
      >
        Login
      </Link>
      <Link
        to="/register"
        style={{ fontWeight: pathname === "/register" ? "700" : "400" }}
      >
        Register
      </Link>
    </nav>
  )
}