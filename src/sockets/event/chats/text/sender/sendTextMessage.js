import user_key_map from "../../../map/keyMap.js";
import pendingMessageModel from "../../../../../models/pending/pendingMessageModel.js";
import textMessageModel from "../../../../../models/message/textMessageModel.js";

const sendTextMessage = (io, socket) => {
  socket.on("send-message", async (data) => {
    try {
      const { message, receiverMongoId, senderMongoId } = data;
      const userlocation = {
        latitude: message?.latitude || null,
        longitude: message?.longitude || null,
      };

      const senderId = user_key_map.get(senderMongoId);
      const receiverId = user_key_map.get(receiverMongoId);

      // 1. Create message in DB
      const createdMessage = await textMessageModel.create({
        message: message?.text
          ? message.text
          : typeof message === "string"
          ? message
          : "",
        messageImage: message?.image || null,
        messageAudio: message?.uploadedUrl || null,
        messageLocation:
          userlocation.latitude && userlocation.longitude ? userlocation : null,
        messageContact: message?.phoneNumbers ? message : null,
        textSender: senderMongoId,
        textReceiver: receiverMongoId,
      });

      // 2. Populate sender & receiver details
      const populatedMessage = await textMessageModel
        .findById(createdMessage._id)
        .populate("textSender", "id userName userProfilePic")
        .populate("textReceiver", "id userName userProfilePic");

      if (receiverId) {
        // Receiver online -> emit to both
        io.to(senderId).emit("receive-message", populatedMessage);
        io.to(receiverId).emit("receive-message", populatedMessage);
      } else {
        // Receiver offline -> store pending message
        await pendingMessageModel.create({
          messageId: createdMessage._id,
          receiverId: receiverMongoId,
        });

        // Inform sender that message sent & will deliver when receiver online
        io.to(senderId).emit("receive-message", populatedMessage);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });
};

export default sendTextMessage;
