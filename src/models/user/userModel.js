import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: String,
  userPhone: String,
  userProfilePic: String,
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // Reference to Chat model
});

const User = mongoose.model("User", userSchema);
export default User;
