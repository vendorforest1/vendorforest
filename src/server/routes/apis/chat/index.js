import express from "express";

import getChatCtr from "@Controllers/chatController";
import { isAuthenticatedForApi } from "@Utils/middleware";

const chatCtr = getChatCtr();
const router = express.Router();

router.use(isAuthenticatedForApi);
router.get("/get_connected_users", chatCtr.getConnectedUser);
export default router;
