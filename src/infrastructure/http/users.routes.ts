import { Router } from "express";
import { editUser, getSelfUser, getUserAvailability, getUserBySlug, setSelfUserAvatar } from "./controllers/user.controller.js";
import { authorization } from "./middlewares/auth.middleware.js";
import { logRequest } from "./middlewares/log.middleware.js";
import { body } from "express-validator";
import validation from "./middlewares/validation.middleware.js";

const router = Router();

router.get("/@me", authorization, getSelfUser);
router.patch("/@me", logRequest, authorization, editUser);
router.put("/@me/avatar", authorization, setSelfUserAvatar);
router.post("/available", logRequest, body("slug").notEmpty(), validation, getUserAvailability);
router.get("/:slug", logRequest, getUserBySlug);

export default router;