import mongoose from "mongoose";
const textMessageModel = new mongoose.Schema({
  message: {
    type: String,
  },
  textSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  textReceiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TextMessage = mongoose.model("textMessage", textMessageModel);
export default TextMessage;
