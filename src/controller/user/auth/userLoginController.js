import User from "../../../models/user/userModel.js";

const userLoginController = async (req, res) => {
  const { phone } = req.body;
  const findUser = await User.findOne({ userPhone: phone });
  if (findUser) {
    res.status(200).json({
      message: "user already exist",
      user: findUser,
    });
  } else {
    const createUser = await User.create({
      userPhone: phone,
      userName: null,
      userProfilePic: null,
    });
    res.status(200).json({
      message: "user created",
      user: createUser,
    });
  }
};
export default userLoginController;
