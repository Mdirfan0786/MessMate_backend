require("dotenv").config();

const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");

const messRoutes = require("./routes/messRoutes");
const authRoute = require("./routes/auth.routes.js");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/messes", messRoutes);
app.use("/api/auth", authRoute);

// Database Connection

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL Connected");

    return sequelize.sync();
  })
  .then(() => {
    console.log("Models Synced");

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Error:", err.message);
  });
