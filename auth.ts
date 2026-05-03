import type { Role } from "@/types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://localhost:3000/api/v1";

interface BackendUser {
  id: number | string;
  name: string;
  email: string;
  avatar: string | null;
  role: Role;
  isActive: boolean;
  phone: string | null;
  bio: string | null;
  lastActiveAt: string | null;
  createdAt: string;
}

interface BackendLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: BackendUser;
}

interface BackendRefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

async function refreshAccessToken(refreshToken: string) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("RefreshAccessTokenError");
  }
  return (await res.json()) as BackendRefreshResponse;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "");
        const password = String(credentials?.password ?? "");
        const rememberMe = credentials?.rememberMe === "true";
        if (!email || !password) return null;

        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
          cache: "no-store",
        });
        if (!res.ok) return null;

        const data = (await res.json()) as BackendLoginResponse;
        return {
          id: String(data.user.id),
          name: data.user.name,
          email: data.user.email,
          image: data.user.avatar ?? undefined,
          role: data.user.role,
          isActive: data.user.isActive,
          lastActiveAt: data.user.lastActiveAt,
          createdAt: data.user.createdAt,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpires: Date.now() + data.expiresIn * 1000,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image ?? undefined;
        token.role = (user as { role: Role }).role;
        token.isActive = (user as { isActive: boolean }).isActive;
        token.lastActiveAt = (user as { lastActiveAt: string }).lastActiveAt;
        token.createdAt = (user as { createdAt: string }).createdAt;
        token.accessToken = (user as { accessToken: string }).accessToken;
        token.refreshToken = (user as { refreshToken: string }).refreshToken;
        token.accessTokenExpires = (
          user as { accessTokenExpires: number }
        ).accessTokenExpires;
        return token;
      }

      if (
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires - 30_000
      ) {
        return token;
      }

      if (!token.refreshToken) {
        token.error = "RefreshAccessTokenError";
        return token;
      }

      try {
        const refreshed = await refreshAccessToken(
          token.refreshToken as string,
        );
        token.accessToken = refreshed.accessToken;
        token.refreshToken = refreshed.refreshToken;
        token.accessTokenExpires = Date.now() + refreshed.expiresIn * 1000;
        delete token.error;
        return token;
      } catch {
        token.error = "RefreshAccessTokenError";
        return token;
      }
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (typeof token.role === "string")
        session.user.role = token.role as Role;
      if (typeof token.isActive === "boolean")
        session.user.isActive = token.isActive;
      if (typeof token.lastActiveAt === "string")
        session.user.lastActiveAt = token.lastActiveAt;
      if (typeof token.createdAt === "string")
        session.user.createdAt = token.createdAt;
      if (typeof token.accessToken === "string")
        session.accessToken = token.accessToken;
      if (typeof token.error === "string") session.error = token.error;
      return session;
    },
  },
});
