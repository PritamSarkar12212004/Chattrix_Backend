import twilio from "twilio";

const otpController = async (req, res) => {
  try {
    const fixedNumber = "+917620876689"; // Only send to this number

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    // Generate 6-digit OTP
    const generateOTP = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOTP();

    // Send OTP via SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+12097783130", // Twilio verified number
      to: fixedNumber,
    });

    res.json({ success: true, message: "OTP sent successfully!", otp }); // Return OTP for testing
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

export default otpController;
