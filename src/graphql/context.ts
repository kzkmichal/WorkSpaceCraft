import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export interface ApolloContext {
	prisma: PrismaClient;
	user?: {
		id: string;
		email: string;
	} | null;
}

export async function createContext(): Promise<ApolloContext> {
	return {
		prisma,
		user: null,
	};
}
