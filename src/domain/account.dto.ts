import { Account } from "./account.entity.js";

export class AccountDTO {
  name: string;
  email: string;
  user_id: string;
  constructor(data: Account) {
    this.name = data.name;
    this.email = data.email;
    this.user_id = data.user_id;
  }
}
