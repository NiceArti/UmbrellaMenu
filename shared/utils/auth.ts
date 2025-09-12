import { ADMIN_LOGIN, ADMIN_PASSWORD } from "@/shared/constants/constants";
import crypto from "crypto";

export function sha256Hex(input: string): string {
  return crypto.createHash("sha256").update(input, "utf8").digest("hex");
}

export function isValidLogin(login: string): boolean {
  const expected = ADMIN_LOGIN;
  if (login !== expected) return false;
  return true;
}

export function isValidPassword(password: string): boolean {
  const expected = sha256Hex(ADMIN_PASSWORD as string);
  if (!expected) return false;
  const actual = password;
  if (expected !== actual) return false;
  return true;
}
