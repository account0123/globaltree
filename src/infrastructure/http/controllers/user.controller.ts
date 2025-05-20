import { Request, Response } from "express";
import { User } from "../../../domain/user.entity.js";
import UserRepository from "../../db/mongoose/user.repository.js";
import { SlugService } from "../../services/slug.service.js";
import { JWTService } from "../../security/jwt.config.js";
import { JsonWebTokenError } from "jsonwebtoken";

export async function createUser(data: User) {
  const slug = SlugService.generate(data.slug || data.name, "_");
  if (!await UserRepository.findBySlug(slug)) {
    data.slug = slug;
  }
  const user = await UserRepository.save(data);
  return user;
}

export async function getSelfUser(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.status(403).send({ type: "UnknownUser", message: "Unknown user" });
    return;
  }

  res.send(user);
  
}