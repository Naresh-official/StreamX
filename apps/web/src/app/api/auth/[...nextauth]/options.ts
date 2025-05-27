import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getWebEnv } from "@workspace/config/server";
import axios from "axios";

const webEnv = getWebEnv();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: webEnv.GOOGLE_CLIENT_ID as string,
      clientSecret: webEnv.GOOGLE_CLIENT_SECRET as string,
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
          let existingUser = null;
          try {
            const response = await axios.get(
              `${webEnv.BACKEND_URL}/user/${encodeURIComponent(email)}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            existingUser = response.data;
          } catch (error) {
            if (
              axios.isAxiosError(error) &&
              error.response?.status === 404 &&
              error.response?.data.error === "User not found"
            ) {
              existingUser = null;
            } else {
              console.error("Error fetching user by email:", error);
              throw error;
            }
          }
          if (existingUser) {
            user.id = existingUser.id;
            user.email = existingUser.email;
            user.name = existingUser.name;
            return true;
          } else {
            try {
              const response = await axios.post(
                `${webEnv.BACKEND_URL}/user`,
                {
                  name: user.name || "",
                  email: user.email || "",
                  profilePicture: user.image || "",
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const newUser = response.data;
              user.id = newUser.id;
              user.email = newUser.email;
              user.name = newUser.name;
              return true;
            } catch (error) {
              console.error("Error creating user:", error);
              throw error;
            }
          }
        }
        return false;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: webEnv.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
  },
  pages: {
    signIn: "/login",
  },
};
