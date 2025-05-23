import { Request, Response } from "express";
import { DataEditUser, User } from "../../../domain/user.entity.js";
import UserRepository from "../../db/mongoose/user.repository.js";
import { SlugService } from "../../services/slug.service.js";
import { CDNService } from "../../services/cloudinary.service.js";
import FileRepository from "../../db/mongoose/file.repository.js";
import { MongooseError } from "mongoose";

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
  let { slug, name, links } = body;

  if (slug === null) {
    res.status(400).send({ type: "BadRequest", message: "Slug cannot be null" });
    return;
  }

  if (name === null) {
    res.status(400).send({ type: "BadRequest", message: "Name cannot be null" });
    return;
  }

  if (typeof links == "object" && !Array.isArray(links)) {
    res.status(400).send({ type: "BadRequest", message: "Links must be a Link array" });
    return;
  }

  if (slug) {
    slug = SlugService.generate(slug, "_");
  }


  const existing = await UserRepository.findBySlug(slug);
  if (existing && (existing._id != user._id)) {
    res.status(409).send({ type: "SlugTaken", message: "Slug already taken", slug });
    return;
  }

  // body.x === undefined -> x is not updated
  // body.x === null -> x is updated to null
  // body.x === "" -> x is updated to ""
  const data: DataEditUser = {
    description: body.description,
    name: name,
    slug: slug,
    links: body.links,
  };

  try {
    const updatedUser = await UserRepository.update(user._id, data);
    res.send(updatedUser);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).send({ type: "DatabaseError", message: error.message });
      return;
    } else if (error instanceof Error) {
      res.status(400).send({ type: "BadRequest", message: error.message });
      return;
    }
    console.error(error);
    res.status(500).send({ type: "UnhandledError", message: "Something went wrong" });
  }
  
}

export async function getSelfUser(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.status(403).send({ type: "UnknownUser", message: "Unknown user" });
    return;
  }

  res.send(user);
  
}

export async function setSelfUserAvatar(req: Request, res: Response) {
  const user = req.user!;
  try {
      const result = await CDNService.uploadOne(req, "avatars");
      await UserRepository.update(user._id, { avatar: result });
      res.status(204).send();
  } catch (error) {
      console.error(error);
      if (error instanceof Error) {
          res.status(400).send({ type: "BadRequest", message: error.message });
      }
      res.status(500).send({ type: "UnhandledError", message: "Something went wrong" });
  }
}