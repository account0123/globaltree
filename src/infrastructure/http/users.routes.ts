import { Router } from "express";
import { editUser, getSelfUser, setSelfUserAvatar } from "./controllers/user.controller.js";
import { authorization } from "./middlewares/auth.middleware.js";
import { logRequest } from "./middlewares/log.middleware.js";

const router = Router();

router.get("/@me", authorization, getSelfUser);
router.patch("/@me", logRequest, authorization, editUser);
router.put("/@me/avatar", authorization, setSelfUserAvatar);

export default router;