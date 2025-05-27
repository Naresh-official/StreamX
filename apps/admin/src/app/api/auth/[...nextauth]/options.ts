import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAdminEnv } from "@workspace/config/server";
import axios from "axios";

const adminEnv = getAdminEnv();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: adminEnv.GOOGLE_CLIENT_ID as string,
      clientSecret: adminEnv.GOOGLE_CLIENT_SECRET as string,
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
            `${adminEnv.BACKEND_URL}/admin/${email}`
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
  secret: adminEnv.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // 20 minutes
  },
};
