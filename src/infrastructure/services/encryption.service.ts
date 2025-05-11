import bcrypt from "bcrypt";

export class BcryptEncryptionService {
  constructor(public saltRounds = 1) {}

  async compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
  
  async hash(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }
}

export const BcryptEncryption = new BcryptEncryptionService(10);


