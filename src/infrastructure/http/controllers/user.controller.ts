import { User } from "../../../domain/user.entity.js";
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