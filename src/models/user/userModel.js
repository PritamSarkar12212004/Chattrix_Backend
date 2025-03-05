import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userProfilePic: String,
  //kye
  userPrivateKey: {
    type: String,
  },
  userPublicKey: {
    type: String,
  },

  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }], // Reference to Chat model
});

const User = mongoose.model("User", userSchema);
export default User;
