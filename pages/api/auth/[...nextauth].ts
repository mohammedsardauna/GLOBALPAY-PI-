import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import { prisma } from "../../../lib/prisma"

const PiProvider = {
  id: "pi",
  name: "Pi Network",
  type: "oauth",
  version: "2.0",
  wellKnown: process.env.PI_WELL_KNOWN || undefined,
  authorization: {
    url: process.env.PI_AUTHORIZATION_URL || "https://minepi.com/oauth/authorize",
    params: { scope: process.env.PI_SCOPE || "profile email" },
  },
  token: process.env.PI_TOKEN_URL || "https://minepi.com/oauth/token",
  userinfo: process.env.PI_USERINFO_URL || "https://api.minepi.com/userinfo",
  clientId: process.env.PI_CLIENT_ID || "",
  clientSecret: process.env.PI_CLIENT_SECRET || "",
  profile(profile: any) {
    return {
      id: profile.id || profile.sub || profile.user_id,
      name: profile.name || profile.username || profile.displayName,
      email: profile.email || null,
      image: profile.picture || profile.avatar || null,
    }
  },
}

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    PiProvider as any,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, token, user }) {
      // attach user.id to session
      (session.user as any).id = user?.id || token?.sub
      return session
    },
  },
}

export default NextAuth(options)
