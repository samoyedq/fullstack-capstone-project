import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage/LoginPage"
import RegisterPage from "./components/RegisterPage/RegisterPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}