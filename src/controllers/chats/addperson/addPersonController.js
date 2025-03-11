import userLoginDecryption from "../../../functions/decryptions/userLoginDecryption/userLoginDecryption.js";
import userModel from "../../../models/user/userModel.js";
const addPersonController = async (req, res) => {
  const { email } = req.body;
  const findData = await userModel.findOne({ userEmail: email });
  if (findData) {
    res.status(200).json({
      status: "success",
      message: "user found",
      data: {
        userEmail: findData.userEmail,
        userName: findData.userName,
        userProfilePic: findData.userProfilePic,
        userPublicKey: userLoginDecryption(findData.userPublicKey),
        userMongoId: findData._id,
      },
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
};
export default addPersonController;
