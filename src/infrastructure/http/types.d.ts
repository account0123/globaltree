import { User } from "../../domain/user.entity.js";

declare module "express" {
  interface Request {
    user?: User;
  }
}