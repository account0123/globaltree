import slug from "slug";

export class SlugService {
  static generate(text: string, replacement = "-") {
    return slug(text, replacement);
  }
}