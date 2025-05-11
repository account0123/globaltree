import { ulid } from "ulid";

export class UlidService {
  static generate() {
    return ulid();
  }
}