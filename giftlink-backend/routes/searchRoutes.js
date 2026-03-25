const express = require("express")
const router = express.Router()
const { connectToDatabase } = require("../models/db")

router.get("/", async (req, res) => {
  const db = await connectToDatabase()
  const { category } = req.query

  const results = await db.collection("gifts")
    .find(category ? { category } : {})
    .toArray()

  res.json(results)
})

module.exports = router