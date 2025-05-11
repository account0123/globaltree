import { User } from "../domain/user.entity.js";
import { SlugService } from "../infrastructure/services/slug.service.js";
import UserRepository from "../infrastructure/db/mongoose/user.repository.js";

export function makeCreateUserUseCase(repository: typeof UserRepository) {
  return async function createUser(data: User) {
    const slug = SlugService.generate(data.slug || data.name, "_");
    if (!await repository.findBySlug(slug)) {
      data.slug = slug;
    }
    const user = await repository.save(data);
    return user;
  }
}