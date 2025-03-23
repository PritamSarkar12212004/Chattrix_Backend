import PendingMessageModal from "../../../../../models/pending/pendingMessageModel.js";
import user_key_map from "../../../map/keyMap.js";

const pendingMessageSender = (io, socket) => {
  socket.on("pending-status-cheker", async (data) => {
    const mongoId = data.userId; // Correctly extract userId from payload

    console.log(`User connected: ${mongoId} - SocketID: ${socket.id}`);

    // Map userId to socketId
    user_key_map.set(mongoId, socket.id);

    // Fetch pending messages
    const pendingMessages = await PendingMessageModal.find({
      receiverId: mongoId,
    }).populate({
      path: "messageId",
      populate: [
        { path: "textSender", select: "id userName userProfilePic" },
        { path: "textReceiver", select: "id userName userProfilePic" },
      ],
    });

    // Send all pending messages
    for (const pending of pendingMessages) {
      io.to(socket.id).emit("receive-message", pending.messageId); // Correct way

      // Delete after sending
      await PendingMessageModal.findByIdAndDelete(pending._id);
    }
  });
};
export default pendingMessageSender;
