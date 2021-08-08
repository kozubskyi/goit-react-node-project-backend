const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");

const { authController } = require("./controllers/auth.controller");
const { userController } = require("./controllers/user.controller");
const { transactionsController } = require("./controllers/transactions.controller");

const app = express();

dotenv.config({ path: path.join(__dirname, ".env") });

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  },
  function(err) {
    if (err) {
      console.log("Something went wrong. Database is not connected.");
      process.exit(1);
    }
    console.log("Successfully connected to MongoDB🔥🔥🔥");
  }
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Kapu$ta Finance",
//       // version: "1.0.0",
//       description: "This is an API to a Kapu$ta Finance Project"
//     },
//     servers: [
//       {
//         url: `http://localhost:${process.env.PORT || 4000}`
//       }
//     ]
//   },
//   apis: ["./controllers/*.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authController);
app.use("/api/v1/user", userController);
app.use("/api/v1/transactions", transactionsController);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server's running. Woooohoooo!! It's chilling on ${PORT} port 😎`);
});
