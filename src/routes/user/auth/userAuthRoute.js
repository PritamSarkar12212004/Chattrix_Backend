import express from "express";
const router = express.Router();
import async_handler from "express-async-handler";
import userLoginController from "../../../controller/user/auth/userLoginController.js";

router.post("/login", async_handler(userLoginController));

export default router;
