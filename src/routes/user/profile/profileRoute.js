import express from "express";
import async_handler from "express-async-handler";
import profileInfoUpdate from "../../../controller/user/update/profile/profileInfoUpdate.js";
const router = express.Router();
router.post("/profile-info-update", async_handler(profileInfoUpdate));
export default router;
