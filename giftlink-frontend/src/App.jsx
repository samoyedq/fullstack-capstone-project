import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./components/LoginPage/LoginPage"
import RegisterPage from "./components/RegisterPage/RegisterPage"
import MainPage from "./components/MainPage/MainPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}