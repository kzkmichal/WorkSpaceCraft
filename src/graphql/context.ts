import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma/prisma";
import { auth } from "@/lib/auth";

export interface ApolloContext {
	prisma: PrismaClient;
	user?: {
		id: string;
		email: string;
		name: string;
	};
}

export async function createContext(): Promise<ApolloContext> {
	const session = await auth();

	if (
		!session ||
		!session.user?.id ||
		!session.user?.email ||
		!session.user.name
	) {
		return { prisma };
	}

	return {
		prisma,
		user: session?.user
			? {
					id: session.user.id,
					email: session.user.email,
					name: session.user.name,
				}
			: undefined,
	};
}
