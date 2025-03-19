import express from "express";
import async_handler from "express-async-handler";
import otpController from "../../controller/otp/optSender.js";
const router = express.Router();

router.post("/send-otp", async_handler(otpController));
export default router;
