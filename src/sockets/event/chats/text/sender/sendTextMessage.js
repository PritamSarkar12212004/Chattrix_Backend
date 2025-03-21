import TextMessage from "../../../../../models/message/textMessageModel.js";
import user_key_map from "../../../map/keyMap.js";

const sendTextMessage = (io, socket) => {
  socket.on("send-message", async (data) => {
    try {
      const { message, receiverMongoId, senderMongoId } = data;
      console.log(message, receiverMongoId, senderMongoId);

      // Get sender & receiver socket IDs
      const senderId = user_key_map.get(senderMongoId);
      const receiverId = user_key_map.get(receiverMongoId);

      if (!senderId && !receiverId) {
        console.error("Invalid sender or receiver ID");
        return;
      }

      // Create message object in database
      const createMess = await TextMessage.create({
        message: message?.text
          ? message.text
          : typeof message === "string"
          ? message
          : "",
        messageImage: message?.image ? message.image : null,
        textSender: senderMongoId, // Store MongoDB user ID, not socket ID
        textReceiver: receiverMongoId,
      });

      // Fetch the newly created message with user details
      const messageData = await TextMessage.findById(createMess._id)
        .populate("textSender", "id userName  userProfilePic")
        .populate("textReceiver", "id userName  userProfilePic");

      // Emit the message to both sender & receiver
      io.to(senderId).emit("receive-message", messageData);
      io.to(receiverId).emit("receive-message", messageData);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
};

export default sendTextMessage;
