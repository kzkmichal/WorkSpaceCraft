import { GraphQLError } from "graphql";
// import { UserRole } from "@prisma/client";
import type { Resolvers } from "../generated/graphql";
import { formatUser } from "./utils";
import { comparePasswords, hashPassword } from "@/lib/password";

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
				...formatUser(dbUser),
			};
		},
		// allUsers: async (
		// 	_,
		// 	{ limit = 10, offset = 0 },
		// 	{ user, prisma },
		// ) => {
		// 	console.log("allUsers resolver called, user:", user);

		// 	if (!user || user.role !== UserRole.ADMIN) {
		// 		throw new GraphQLError("Not authorized", {
		// 			extensions: { code: "FORBIDDEN" },
		// 		});
		// 	}

		// 	const users = await prisma.user.findMany({
		// 		take: limit,
		// 		skip: offset,
		// 		orderBy: { createdAt: "desc" },
		// 	});

		// 	return users.map(formatUser);
		// },
	},
	Mutation: {
		updateUserProfile: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError("You must be logged in", {
					extensions: { code: "UNAUTHENTICATED" },
				});
			}

			const updatedUser = await prisma.user.update({
				where: { id: user.id },
				data: {
					...(input.name && { name: input.name }),
					...(input.image && { image: input.image }),
				},
			});

			return {
				...formatUser(updatedUser),
			};
		},

		// updateUserRole: async (_, { userId, role }, { user, prisma }) => {
		// 	if (!user || user.role !== "ADMIN") {
		// 		throw new GraphQLError("Not authorized", {
		// 			extensions: { code: "FORBIDDEN" },
		// 		});
		// 	}

		// 	if (role !== "ADMIN" && role !== "USER") {
		// 		throw new GraphQLError("Invalid role", {
		// 			extensions: { code: "BAD_USER_INPUT" },
		// 		});
		// 	}

		// 	const updatedUser = await prisma.user.update({
		// 		where: { id: userId },
		// 		data: { role: role },
		// 	});

		// 	return formatUser(updatedUser);
		// },

		changePassword: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError("You must be logged in", {
					extensions: { code: "UNAUTHENTICATED" },
				});
			}

			const dbUser = await prisma.user.findUnique({
				where: { id: user.id },
			});

			if (!dbUser || !dbUser.password) {
				throw new GraphQLError("User not found or has no password", {
					extensions: { code: "NOT_FOUND" },
				});
			}

			const isValid = await comparePasswords(
				input.currentPassword,
				dbUser.password,
			);

			if (!isValid) {
				return {
					success: false,
					message: "Current password is incorrect",
					user: undefined,
				};
			}

			const hashedPassword = await hashPassword(input.newPassword);

			await prisma.user.update({
				where: { id: user.id },
				data: { password: hashedPassword },
			});

			return {
				success: true,
				message: "Password changed successfully",
				user: {
					...formatUser(dbUser),
				},
			};
		},
	},
};
