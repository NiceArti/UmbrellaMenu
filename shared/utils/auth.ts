import { ADMIN_LOGIN, ADMIN_PASSWORD } from "@/shared/constants/constants";
import crypto from "crypto";

export const sha256Hex = (input: string): string =>
  crypto.createHash("sha256").update(input, "utf8").digest("hex");

export const isValidLogin = (login: string) => login === ADMIN_LOGIN;

export const isValidPassword = (password: string) =>
  password === ADMIN_PASSWORD;
