const express = require("express")
const router = express.Router()
const { connectToDatabase } = require("../models/db")
const { ObjectId } = require("mongodb")

router.get("/", async (req, res) => {
  const db = await connectToDatabase()
  const gifts = await db.collection("gifts").find().toArray()
  res.json(gifts)
})

router.get("/:id", async (req, res) => {
  const db = await connectToDatabase()
  const gift = await db.collection("gifts").findOne({
    _id: new ObjectId(req.params.id)
  })
  res.json(gift)
})

module.exports = router