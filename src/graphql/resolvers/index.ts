import type { Resolvers } from "../generated/graphql";
import { resolvers as ProductResolvers } from "./product-resolvers";
import { resolvers as AuthResolvers } from "./auth-resolvers";
import { resolvers as CategoryResolvers } from "./category-resolvers";
import { resolvers as SubcategoryResolvers } from "./subcategory-resolvers";

export const resolvers: Resolvers = {
	Query: {
		...AuthResolvers?.Query,
		...ProductResolvers?.Query,
		...CategoryResolvers?.Query,
		...SubcategoryResolvers?.Query,
	},
	Mutation: {
		...AuthResolvers?.Mutation,
		...ProductResolvers?.Mutation,
		...CategoryResolvers?.Mutation,
		...SubcategoryResolvers?.Mutation,
	},
};
