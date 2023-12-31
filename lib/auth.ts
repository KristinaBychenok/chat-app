import { compare, hash } from "bcryptjs";

export async function hashpassword(password: string) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isEqual = await compare(password, hashedPassword);

  return isEqual;
}
