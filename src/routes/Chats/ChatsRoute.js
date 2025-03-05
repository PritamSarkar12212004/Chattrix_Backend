import express from "express";
import async_handler from "express-async-handler";
import addPersonController from "../../controllers/chats/addperson/addPersonController.js";

const router = express.Router();
router.post("/add-person-api", async_handler(addPersonController));

export default router;
