const express = require("express")
const router = express.Router()
const { connectToDatabase } = require("../models/db")
const { ObjectId } = require("mongodb")

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const gifts = await db.collection("gifts").find().toArray()
    res.json(gifts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const gift = await db.collection("gifts").findOne({
      _id: new ObjectId(req.params.id)
    })
    if (!gift) {
      return res.status(404).json({ error: "Gift not found" })
    }
    res.json(gift)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const db = await connectToDatabase()
    const { title, description, category, price, link } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const newGift = {
      title,
      description: description || "",
      category: category || "General",
      price: price || null,
      link: link || "",
      createdAt: new Date()
    }

    const result = await db.collection("gifts").insertOne(newGift)
    res.json({ _id: result.insertedId, ...newGift })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router