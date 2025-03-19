import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";


// import database
import connectDB from "./src/database/dataBase.js";
// import routes
import optSenderRoute from "./src/routes/optSenderRoutes/optSenderRoute.js";
import userAuthRoute from "./src/routes/user/auth/userAuthRoute.js";
import profileRoute from "./src/routes/user/profile/profileRoute.js";
import chatDetchDataRoute from "./src/routes/chat/FetchRoute/chatDetchDataRoute.js";
import socketManager from "./src/sockets/manager/socketManager.js";

// create server
const app = express();
const server = createServer(app);

// middleware
app.use(
  cors({
    origin: "*", // allow to all request
  })
);
app.use(morgan("dev"));
app.use(express.json()); // Middleware to handle JSON data

// pass server to the socekt manager
socketManager(server);

// routes
app.use("/utl", optSenderRoute);
app.use("/user-auth", userAuthRoute);
app.use("/user-profile", profileRoute);
app.use("/chat-fetch", chatDetchDataRoute);

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
