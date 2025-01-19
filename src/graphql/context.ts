import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export interface ApolloContext {
	prisma: PrismaClient;
	user?: {
		id: string;
		email: string;
	} | null;
}

export async function createContext(): Promise<ApolloContext> {
	const session = await getServerSession(authOptions);

	if (!session || !session.user?.id) {
		return { prisma };
	}

	return {
		prisma,
		user: {
			id: session.user.id,
			email: session.user.email,
		},
	};
}
