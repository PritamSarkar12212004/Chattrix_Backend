import TextMessage from "../../../../../models/message/textMessageModel.js";
import user_key_map from "../../../map/keyMap.js";

const sendTextMessage = (io, socket) => {
  user_key_map;
  socket.on("send-message", async (data) => {
    const {
      encryptMessage,
      enonce,
      senderKey,
      receiverMongoId,
      senderMongoId,
    } = data;
    const keysIterator = user_key_map.keys();

    // compare the sender key with the receiver key
    const senderId = user_key_map.get(senderMongoId);
    const receiverId = user_key_map.get(receiverMongoId);

    // create massage object
    const createMess = await TextMessage.create({
      message: encryptMessage,
      textSender: keysIterator.next().value,
      textReceiver: keysIterator.next().value,
      senderPublicKey: senderKey,
      nonce: enonce,
    });

    // find the message and get user Data
    const messageData = await TextMessage.findById(createMess._id)
      .populate(
        "textSender",
        "id userName userEmail userProfilePic userPublicKey "
      )
      .populate(
        "textReceiver",
        "id userName userEmail userProfilePic userPublicKey "
      );

    if (receiverId) {
      io.to(receiverId).emit("receive-message", messageData);
    }
    if (senderId) {
      io.to(senderId).emit("receive-message", messageData);
    }
  });
};
export default sendTextMessage;
