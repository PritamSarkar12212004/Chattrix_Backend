import express from "express";
import async_handler from "express-async-handler";
import addPersonController from "../../controllers/chats/addperson/addPersonController.js";
import textSenderController from "../../controllers/chats/sender/textSender/textSenderController.js";

const router = express.Router();
router.post("/add-person-api", async_handler(addPersonController));
router.post("/send-text-api", async_handler(textSenderController));

export default router;
