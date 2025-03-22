import express from "express";
import { getCommunityMessages, addMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/:community", getCommunityMessages);
router.post("/", addMessage);

export default router;
