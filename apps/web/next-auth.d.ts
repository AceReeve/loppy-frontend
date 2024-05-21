import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  status: string;
  access_token: string;
  role: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    jwt: string;
  }

  interface User {
    access_token: string;
  }
}
