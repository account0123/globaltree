import { Request, Response } from "express";
import { MongooseError } from "mongoose";

import AccountRepository from "../../db/mongoose/account.repository.js";
import { BcryptEncryption } from "../../services/bcrypt.service.js";
import { makeCreateUserUseCase } from "../../../application/create_user.use_case.js";
import UserRepository from "../../db/mongoose/user.repository.js";
import { UlidService } from "../../services/ulid.service.js";
import { AccountDTO } from "../../../domain/account.dto.js";
import { JWTService } from "../../security/jwt.config.js";

export async function createAccount(req: Request, res: Response) {
  try {
    const { email, password, name, slug } = req.body;
    const existing = await AccountRepository.findByEmail(email);
    if (existing) {
      res.status(409).json({type: "EmailConflict", message: "Email already exists"});
      return;
    }
    const hashedPassword = await BcryptEncryption.hash(password);
    const createUser = makeCreateUserUseCase(UserRepository);
    const user = await createUser({ _id: UlidService.generate(), avatar: null, description: null, name, slug, links: null });
    
    const account = await AccountRepository.save({ email, password: hashedPassword, name, user_id: user._id });
    const response = new AccountDTO(account);
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    if (error instanceof MongooseError) {
      res.status(400).send({type: "DatabaseError", message: error.message});
    } else {
      res.status(422).send({type: "UnhandledError", reason: "Unprocessable Entity"});
    }
  }
}

export async function authenticate(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const account = await AccountRepository.findByEmail(email);
    if (!account) {
      res.status(404).send({type: "AccountNotFound", message: "Account not found"});
      return;
    }
    const validPassword = await BcryptEncryption.compare(password, account.password);
    if (!validPassword) {
      res.status(401).send({type: "InvalidCredentials", message: "Invalid credentials"});
      return;
    }
    const token = JWTService.generate({ user_id: account.user_id }, { expiresIn: "7d" });
    res.status(200).send({session: { token }});
  } catch (error) {
    console.error(error);
    if (error instanceof MongooseError) {
      res.status(400).send({type: "DatabaseError", message: error.message});
    } else {
      res.status(422).send({type: "UnhandledError", reason: "Unprocessable Entity"});
    }
  }
}