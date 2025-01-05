import { GraphQLError } from "graphql";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import type { Resolvers } from "../generated/graphql";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "your-secret-key";

export const resolvers: Resolvers = {
	Query: {
		me: async (_, __, { user, prisma }) => {
			if (!user) return undefined;

			const dbUser = await prisma.user.findUnique({
				where: { id: user.id },
			});

			if (!dbUser) {
				throw new GraphQLError("User not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			return {
				...dbUser,
				createdAt: dbUser.createdAt.toISOString(),
				updatedAt: dbUser.updatedAt.toISOString(),
			};
		},
	},

	Mutation: {
		signUp: async (_, { input }, { prisma }) => {
			const user = await prisma.user.findUnique({
				where: { email: input.email },
			});

			if (user) {
				throw new GraphQLError("User already exists", {
					extensions: { code: "BAD_USER_INPUT" },
				});
			}

			const hashedPassword = await hash(input.password, 10);

			const newUser = await prisma.user.create({
				data: {
					name: input.name,
					email: input.email,
					password: hashedPassword,
				},
			});

			const token = sign(
				{ userId: newUser.id, email: newUser.email },
				JWT_SECRET,
				{ expiresIn: "7d" },
			);

			return {
				user: {
					...newUser,
					createdAt: newUser.createdAt.toISOString(),
					updatedAt: newUser.updatedAt.toISOString(),
				},
				token,
			};
		},

		signIn: async (_, { input }, { prisma }) => {
			const user = await prisma.user.findUnique({
				where: { email: input.email },
			});

			if (!user) {
				throw new GraphQLError("Invalid credentials", {
					extensions: { code: "UNAUTHORIZED" },
				});
			}

			const isValid = await compare(input.password, user.password);

			if (!isValid) {
				throw new GraphQLError("Invalid credentials", {
					extensions: { code: "UNAUTHORIZED" },
				});
			}

			const token = sign(
				{ userId: user.id, email: user.email },
				JWT_SECRET,
				{ expiresIn: "7d" },
			);

			return {
				user: {
					...user,
					createdAt: user.createdAt.toISOString(),
					updatedAt: user.updatedAt.toISOString(),
				},
				token,
			};
		},
	},
};
