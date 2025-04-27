import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@workspace/config";

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
				if (account?.provider === "github") {
					const email = user.email;
					if (!email) {
						throw new Error("Email not found");
					}
					const domain = email.split("@")[1];
					if (domain !== "gmail.com") {
						throw new Error("Invalid email domain");
					}
				}
				return true;
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
