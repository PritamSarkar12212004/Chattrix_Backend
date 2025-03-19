import express from "express";
import async_handler from "express-async-handler";
import singleUserDataChatFetch from "../../../controller/chat/fetchData/singleUserDataChatFetch.js";
const router = express.Router();
router.post("/single-chat-userData-Fetch",async_handler(singleUserDataChatFetch));
export default router;
