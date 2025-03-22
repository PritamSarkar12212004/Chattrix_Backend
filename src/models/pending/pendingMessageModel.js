import mongoose from "mongoose";
const pendingMessageSchema = new mongoose.Schema({
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: "TextMessage" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PendingMessageModal = mongoose.model("PendingMessage", pendingMessageSchema);
export default PendingMessageModal;
