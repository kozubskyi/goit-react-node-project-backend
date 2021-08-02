const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const logger = require("morgan")

const { authController } = require("./controllers/auth/auth.controller")
const { balancesController } = require("./controllers/balances/balances.controller")
const { transactionsController } = require("./controllers/transactions/transactions.controller")

const app = express()

dotenv.config({ path: path.join(__dirname, ".env") })

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authController)
app.use("/api/v1/balances", balancesController)
app.use("/api/v1/transaction", transactionsController)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server's running. Woooohoooo!! It's chilling on ${PORT} port`)
})
