import User from "../../../../models/user/userModel.js";

const profileInfoUpdate = async (req, res) => {
  const { userProfilePic, userName, userId } = req.body.data;
  try {
    const updateData = await User.findByIdAndUpdate(
      userId,
      {
        userProfilePic: userProfilePic,
        userName: userName,
      },
      { new: true }
    );
    res.status(200).json({
      message: "profile updated",
      user: updateData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "error",
      error: error,
    });
  }
};
export default profileInfoUpdate;
