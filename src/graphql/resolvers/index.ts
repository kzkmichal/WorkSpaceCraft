import type { Resolvers } from "../generated/graphql";
import { resolvers as ProductResolvers } from "./product-resolvers";
import { resolvers as authResolvers } from "./auth-resolvers";

export const resolvers: Resolvers = {
	Query: {
		...ProductResolvers?.Query,
		...authResolvers?.Query,
	},
	Mutation: {
		...authResolvers?.Mutation,
		...ProductResolvers?.Mutation,
	},
};
