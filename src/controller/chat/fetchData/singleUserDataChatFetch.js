import User from "../../../models/user/userModel.js";

const singleUserDataChatFetch = async (req, res) => {
  let { number } = req.body; // number is string
  if (number) {
    console.log(number);
    number = number.replace(/\D/g, "").slice(-10);
    const user = await User.findOne({ userPhone: number });
    if (user) {
      res.status(200).json({
        status: "success",
        user: user,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  }
};

export default singleUserDataChatFetch;
