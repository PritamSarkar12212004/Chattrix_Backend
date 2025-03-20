import { Server } from "socket.io";
import registerSocket from "../event/chats/auth/registerSocket.js";
import sendTextMessage from "../event/chats/text/sender/sendTextMessage.js";
import userSattusChaker from "../event/chats/status/userStatusChaker/userSattusChaker.js";
const socketManager = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // register the socket
    registerSocket(io, socket);
    // user status checker
    userSattusChaker(io, socket);

    // text sending
    sendTextMessage(io, socket);
  });
};
export default socketManager;
