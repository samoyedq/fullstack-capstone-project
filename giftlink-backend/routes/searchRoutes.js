const express = require("express")
const router = express.Router()
const { connectToDatabase } = require("../models/db")

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const { category } = req.query

    const results = await db.collection("gifts")
      .find(category ? { category } : {})
      .toArray()

    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const { query } = req.body

    if (!query || !query.trim()) {
      return res.json([])
    }

    const searchResults = await db.collection("gifts").find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ]
    }).toArray()

    res.json(searchResults)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router