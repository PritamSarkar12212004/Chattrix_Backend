import user_key_map from "../../map/keyMap.js";

// register the key map for the user
user_key_map;

// init the socket connection
const registerSocket = (io, socket) => {
  socket.on("register", ({ userId }) => {
    if (userId) {
      user_key_map.set(userId, socket.id);
      console.log(`user connected  ${userId} with id socket.Id  ${socket.id}`);
    } else {
      console.log(" user id  not provided ");
    }
  });

  // disconnect the socket
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [key, value] of user_key_map.entries()) {
      if (value === socket.id) {
        user_key_map.delete(key);
        break;
      }
    }
  });
};
export default registerSocket;
