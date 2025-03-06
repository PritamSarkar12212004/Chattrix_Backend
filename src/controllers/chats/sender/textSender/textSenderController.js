const textSenderController = async (req, res) => {
  const { data, senderPrivateKey, reciverKey } = req.body;
  console.log(senderPrivateKey);
};
export default textSenderController;