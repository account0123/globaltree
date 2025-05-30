import { Request, Response, NextFunction } from "express";
import { JWTService } from "../../security/jwt.config.js";
import jwt from "jsonwebtoken";
import UserRepository from "../../db/mongoose/user.repository.js";

export async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    res
      .status(401)
      .send({ type: "Unauthorized", message: "Authorization expected" });
    return;
  }

  try {
    const result = JWTService.verify(token);
    if (typeof result == "string" || !result.user_id) {
      throw new jwt.JsonWebTokenError("Invalid token");
    }

    const user = await UserRepository.findById(result.user_id);
    if (!user) {
      res.status(403).send({ type: "UnknownUser", message: "Unknown user" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send({ type: "Unauthorized", message: error.message });
      return;
    }
    res
      .status(422)
      .send({ type: "UnhandledError", reason: "Unprocessable Entity" });
  }
}
