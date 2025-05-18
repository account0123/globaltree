import {
  Algorithm,
  PrivateKey,
  PublicKey,
  Secret,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from "jsonwebtoken";

export class JwtSecretService {
  algorithm: Algorithm;
  secret: Secret;
  constructor({
    secret,
    algorithm = "HS256",
  }: {
    secret: string;
    algorithm: Algorithm;
  }) {
    if (!secret) {
      throw new TypeError("secret must be defined");
    }
    this.secret = secret;
    this.algorithm = algorithm;
  }

  generate(payload: string | object, options?: SignOptions) {
    if (options?.algorithm && options.algorithm != this.algorithm) {
      console.warn(
        `Algorithm mismatch: options.algorithm=${options.algorithm} vs this.algorithm=${this.algorithm}. Using ${options.algorithm}`
      );
    }
    return sign(payload, this.secret, {
      algorithm: this.algorithm,
      ...options,
    });
  }

  verify(token: string, options?: VerifyOptions) {
    return verify(token, this.secret, options);
  }
}

export class JwtPublicKeyService {
  algorithm: Algorithm;
  privateKey: PrivateKey;
  publicKey: PublicKey;

  constructor({
    privateKey,
    publicKey,
    algorithm = "RS256",
  }: {
    privateKey: PrivateKey;
    publicKey: PublicKey;
    algorithm?: Algorithm;
  }) {
    if (!privateKey) {
      throw new TypeError("privateKey must be defined");
    }
    if (!publicKey) {
      throw new TypeError("publicKey must be defined");
    }
    this.privateKey = privateKey;
    this.publicKey = publicKey;
    this.algorithm = algorithm;
  }

  generate(payload: string | object, options?: SignOptions) {
    if (options?.algorithm && options.algorithm != this.algorithm) {
      console.warn(
        `Algorithm mismatch: options.algorithm=${options.algorithm} vs this.algorithm=${this.algorithm}. Using ${options.algorithm}`
      );
    }

    return sign(payload, this.privateKey, {
      algorithm: this.algorithm,
      ...options,
    });
  }

  verify(token: string, options?: VerifyOptions) {
    return verify(token, this.publicKey, options);
  }
}
