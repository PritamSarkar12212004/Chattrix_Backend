import user_key_map from "../../../map/keyMap.js";

const userSattusChaker = (io, socket) => {
  socket.on("user-status-chaker", async (payload) => {
    const { chekerRequestid, payloadId } = payload;
    // Get sender & receiver socket IDs
    const senderId = await user_key_map.get(chekerRequestid);

    if (payload && user_key_map.has(payloadId)) {
      io.to(senderId).emit("get-user-status", "online");
    } else {
      io.to(senderId).emit("get-user-status", "offline");
    }
  });
};
export default userSattusChaker;
