import userLoginDecryption from "../../../functions/decryptions/userLoginDecryption/userLoginDecryption.js";
import userLoginEncryption from "../../../functions/encryptions/userLoginEncrypt/userLoginEncryption.js";
import userModel from "../../../models/user/userModel.js";

const userAuthController = async (req, res) => {
  try {
    const { email, name, image } = req.body;

    const existingUser = await userModel.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: {
          userEmail: existingUser.userEmail || null,
          userName: existingUser.userName || null,
          userProfilePic: existingUser.userProfilePic || null,
          userPublicKey:
            userLoginDecryption(existingUser.userPublicKey) || null,
          userPrivateKey:
            userLoginDecryption(existingUser.userPrivateKey) || null,
        },
      });
    }

    await userModel.create({
      userName: name,
      userEmail: email,
      userProfilePic: image,
      userPublicKey: userLoginEncryption().publicKey,
      userPrivateKey: userLoginEncryption().privateKey,
    });

    const newUser = await userModel.findOne({ userEmail: email });
    return res.status(200).json({
      message: "User created successfully",
      user: {
        userEmail: newUser.userEmail || null,
        userName: newUser.userName || null,
        userProfilePic: newUser.userProfilePic || null,
        userPublicKey: userLoginDecryption(newUser.userPublicKey) || null,
        userPrivateKey: userLoginDecryption(newUser.userPrivateKey) || null,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export default userAuthController;
