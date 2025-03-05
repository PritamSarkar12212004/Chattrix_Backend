import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import morgan from "morgan";
import cors from "cors";

// import database
import connectDB from "./src/database/dataBase.js";

// import routes
import userRoutes from "./src/routes/authentication/user/userRoutes.js";
import ChatsRoute from "./src/routes/Chats/ChatsRoute.js";

// create server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Expo ke IP ya domain bhi laga sakte ho
    methods: ["GET", "POST"],
  },
});

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // Middleware to handle JSON data

app.use("/login", userRoutes);
app.use("/chat", ChatsRoute);
// express error routes
app.post("*", (req, res) => {
  res.send("page not found");
});
app.get("*", (req, res) => {
  res.send("page not found");
});
connectDB()
  .then(() => {
    // listen server
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
