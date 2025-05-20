import { body } from "express-validator";
import {
  authenticate,
  createAccount,
} from "./controllers/account.controller.js";
import router from "./root.routes.js";
import validation from "./middlewares/validation.middleware.js";
import { logRequest } from "./middlewares/log.middleware.js";

router.post(
  "/auth/create",
  body("name").notEmpty().withMessage("Required field"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Required at least 8 characters"),
  validation,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Required field"),
  validation,
  authenticate
);

export default router;
