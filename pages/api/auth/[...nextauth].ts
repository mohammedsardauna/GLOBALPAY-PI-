import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import type { NextAuthOptions } from "next-auth"

const PiProvider = {
  id: "pi",
  name: "Pi Network",
  type: "oauth",
  version: "2.0",
  // Either set PI_WELL_KNOWN to an OpenID Connect discovery URL, or set the endpoints below
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
    // Map Pi provider profile to NextAuth user
    return {
      id: profile.id || profile.sub || profile.user_id,
      name: profile.name || profile.username || profile.displayName,
      email: profile.email || null,
      image: profile.picture || profile.avatar || null,
    }
  },
}

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    // custom Pi provider
    PiProvider as any,
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        (session.user as any).id = token.sub
      }
      return session
    },
  },
}

export default NextAuth(options)
