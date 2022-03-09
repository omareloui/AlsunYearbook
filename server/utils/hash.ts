import bcrypt from "bcrypt";

export function hash(password: string) {
  const HASH_ROUNDS = 14;

  return new Promise<string>((res, rej) => {
    bcrypt.hash(password, HASH_ROUNDS, (error, hash: string) => {
      if (error) rej(error.message);
      else res(hash);
    });
  });
}

export function compareHash(plainPassword: string, hashedPassword: string) {
  return new Promise<boolean>((res, rej) => {
    bcrypt.compare(plainPassword, hashedPassword, (error, result: boolean) => {
      if (error) rej(error.message);
      else res(result);
    });
  });
}
