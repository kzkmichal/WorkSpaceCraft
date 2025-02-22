import type { Resolvers } from "../generated/graphql";
import { resolvers as ProductResolvers } from "./product-resolvers";
import { resolvers as authResolvers } from "./auth-resolvers";
import { resolvers as CategoryResolvers } from "./category-resolvers";
import { resolvers as SubcategoryResolvers } from "./subcategory-resolvers";

export const resolvers: Resolvers = {
	Query: {
		...ProductResolvers?.Query,
		...authResolvers?.Query,
		...CategoryResolvers?.Query,
		...SubcategoryResolvers?.Query,
	},
	Mutation: {
		...authResolvers?.Mutation,
		...ProductResolvers?.Mutation,
		...CategoryResolvers?.Mutation,
		...SubcategoryResolvers?.Mutation,
	},
};
