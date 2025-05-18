import { existsSync, readFileSync, writeFileSync } from "fs";
import { JwtPublicKeyService } from "../services/jwt.service.js";
import { join } from "path";
import { generateKeyPairSync } from "crypto";

function createKeyPair() {
  return generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
}

const publicKeyPath = join(__dirname, "public.pem");
const privateKeyPath = join(__dirname, "private.pem");
let privateKey: string | Buffer = "";
let publicKey: string | Buffer = "";

const algorithm = "RS256";

try {
  if (existsSync(publicKeyPath) && existsSync(privateKeyPath)) {
    privateKey = readFileSync(privateKeyPath, "binary");
    publicKey = readFileSync(publicKeyPath, "binary");
  } else {
    console.debug("Generating new key pair");
    const result = createKeyPair();
    privateKey = result.privateKey.export({ type: "pkcs8", format: "pem" });
    publicKey = result.publicKey.export({ type: "spki", format: "pem" });
    writeFileSync(publicKeyPath, publicKey);
    console.debug("Public key saved in disk");
    writeFileSync(privateKeyPath, privateKey);
    console.debug("Private key saved in disk");
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}

export const JWTService = new JwtPublicKeyService({
  privateKey,
  publicKey,
  algorithm,
});
