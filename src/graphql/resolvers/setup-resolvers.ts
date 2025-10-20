import { GraphQLError } from "graphql";
import type {
	Resolvers,
	SetupCategory,
	SetupStatus,
} from "../generated/graphql";
import { getSetupService } from "@/lib/services/setupService/setup-service-factory";

async function getUserSetups(id: string) {
	try {
		const setupService = getSetupService();

		const setups = await setupService.getUserSetups(id);

		if (!setups || setups.length === 0) {
			return [];
		}

		return setups;
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch setups:", error);
		throw new GraphQLError("Failed to fetch setups", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getSetup(id: string) {
	try {
		const setupService = getSetupService();

		const setup = await setupService.getSetupById(id);

		if (!setup) {
			throw new GraphQLError("Setup not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return setup;
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch setup:", error);
		throw new GraphQLError("Failed to fetch setup", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getAllSetups(
	category?: SetupCategory,
	status?: SetupStatus,
	limit?: number,
	offset?: number,
) {
	try {
		const setupService = getSetupService();

		const setups = await setupService.getAllSetups(
			category,
			status,
			limit,
			offset,
		);

		if (!setups) {
			throw new GraphQLError("Setups not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return setups;
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch setups:", error);
		throw new GraphQLError("Failed to fetch setups", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getSetupByCategory(
	category: SetupCategory,
	userId?: string,
) {
	try {
		const setupService = getSetupService();

		const setup = await setupService.getSetupByCategory(
			category,
			userId,
		);

		if (!setup) {
			throw new GraphQLError("Setup not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return setup;
	} catch (error) {
		console.error("Failed to fetch setups by category:", error);
		throw new GraphQLError("Failed to fetch setups by category", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

export const resolvers: Resolvers = {
	Query: {
		userSetups: (_, { userId }) => getUserSetups(userId),
		setupById: (_, { id }) => getSetup(id),
		setupByCategory: (_, { category, userId }) =>
			getSetupByCategory(category, userId),
		allSetups: (_, { category, status, limit, offset }) =>
			getAllSetups(category, status, limit, offset),
	},
};
