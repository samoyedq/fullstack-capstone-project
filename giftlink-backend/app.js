const express = require("express")
const cors = require("cors")

const giftRoutes = require("./routes/giftRoutes")
const searchRoutes = require("./routes/searchRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/gifts", giftRoutes)
app.use("/api/gifts/search", searchRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("GiftLink API running")
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))