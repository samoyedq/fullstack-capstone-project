const express = require("express")
const router = express.Router()
const { connectToDatabase } = require("../models/db")

router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" })
    }

    await db.collection("users").insertOne({ username, password })
    res.json({ message: "registered" })
  } catch (err) {
    console.error("Register error:", err)
    res.status(500).json({ error: err.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const { username, password } = req.body

    const user = await db.collection("users").findOne({ username })

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "invalid" })
    }

    res.json({ token: "fake-jwt-token", username })
  } catch (err) {
    console.error("Login error:", err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router