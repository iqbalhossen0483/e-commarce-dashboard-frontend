import type { DefaultSession } from "next-auth";
import type { Role } from "@/types";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      id: string;
      role: Role;
      isActive: boolean;
      lastActiveAt: string | null;
      createdAt: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
    isActive: boolean;
    lastActiveAt: string | null;
    createdAt: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    isActive?: boolean;
    lastActiveAt?: string | null;
    createdAt?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
