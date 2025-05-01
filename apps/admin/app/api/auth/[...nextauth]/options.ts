import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@workspace/config/server";
import { clientEnv } from "@workspace/config/client";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 30000,
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const email = user.email;
          if (!email) {
            throw new Error("Email not found");
          }
          const { data } = await axios.get(
            `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/admin/${email}`
          );
          if (data.id && data.email && data.name) {
            user.id = data.id;
            user.email = data.email;
            user.name = data.name;
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    maxAge: 20 * 60, // 20 minutes
  },
};
