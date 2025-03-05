import express from "express";
import async_handler from "express-async-handler";
import userAuthController from "../../../controllers/authentication/user/userAuthController.js";
const router = express.Router();

router.post("/user-api", async_handler(userAuthController));
export default router;
