import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAuthClient } from "./auth-client";
import {
	SignInMutation,
	SignInMutationVariables,
	SignInDocument,
} from "@/graphql/generated/graphql";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const client = createAuthClient();
					const { data } = await client.mutate<
						SignInMutation,
						SignInMutationVariables
					>({
						mutation: SignInDocument,
						variables: {
							input: {
								email: credentials.email,
								password: credentials.password,
							},
						},
					});

					if (!data?.signIn) {
						return null;
					}

					return {
						id: data.signIn.user.id,
						email: data.signIn.user.email,
						name: data.signIn.user.name,
						accessToken: data.signIn.token,
					};
				} catch (error) {
					console.error("Authentication error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.sub = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.sub as string;
				session.accessToken = token.accessToken;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60, // 7 days
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
