import { Request, Response } from "express";
import { DataEditUser, User } from "../../../domain/user.entity.js";
import UserRepository from "../../db/mongoose/user.repository.js";
import { SlugService } from "../../services/slug.service.js";

export async function createUser(data: User) {
  const slug = SlugService.generate(data.slug || data.name, "_");
  if (!await UserRepository.findBySlug(slug)) {
    data.slug = slug;
  }
  const user = await UserRepository.save(data);
  return user;
}

export async function editUser(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(403).send({ type: "UnknownUser", message: "Unknown user" });
    return;
  }

  const body = req.body;

  // body.x === undefined -> x is not updated
  // body.x === null -> x is updated to null
  // body.x === "" -> x is updated to ""
  const data: DataEditUser = {
    avatar: body.avatar,
    description: body.description,
    name: body.name,
    slug: body.slug,
  };

  const updatedUser = await UserRepository.update(user._id, data);
  res.send(updatedUser);
}

export async function getSelfUser(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.status(403).send({ type: "UnknownUser", message: "Unknown user" });
    return;
  }

  res.send(user);
  
}