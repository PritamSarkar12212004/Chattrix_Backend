import mongoose from "mongoose";
const textMessageModel = new mongoose.Schema({
  message: {
    type: String,
  },
  messageImage: {
    type: String,
  },
  messageVideo: {
    type: String,
  },
  messageAudio: {
    type: String,
  },
  messageFile: {
    type: String,
  },
  messageLocation: {
    type: {},
  },
  messageContact: {
    type: {},
  },
  messageLink: {
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

const TextMessage = mongoose.model("TextMessage", textMessageModel);

export default TextMessage;
