import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/database/dataBase.js";

// import routes
import userRoutes from "./src/routes/authentication/user/userRoutes.js";

// create server
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Middleware to handle JSON data

// routes
app.use("/login", userRoutes);

// express error routes routes
app.get("*", (req, res) => {
  res.send("page not found");
});
app.post("*", (req, res) => {
  res.send("page not found");
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
