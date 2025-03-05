import userLoginEncryption from "../../../functions/encryptions/userLoginEncrypt/userLoginEncryption.js";
import userModel from "../../../models/user/userModel.js";
const userAuthController = async (req, res) => {
  const { email, name, image } = req.body;
  const userData = await userModel.findOne({ userEmail: email });
  if (userData) {
    res.status(400).json({
      message: "User already exists",
      user: user,
    });
  } else {
    const user = await userModel.create({
      userName: name,
      userEmail: email,
      userImage: image,
      userPublicKey: userLoginEncryption().publicKey,
      userPrivateKey: userLoginEncryption().privateKey,
    });
    res.status(200).json({
      message: "User created successfully",
      user: user,
    });
  }
};
export default userAuthController;
