import type { Resolvers } from "../generated/graphql";
import { resolvers as AuthResolvers } from "./auth-resolvers";
import { resolvers as CategoryResolvers } from "./category-resolvers";
import { resolvers as ProductResolvers } from "./product-resolvers";
import { resolvers as SearchResolvers } from "./search-resolvers";
import { resolvers as SubcategoryResolvers } from "./subcategory-resolvers";
import { resolvers as Tag } from "./tag-resolves";
import { resolvers as SetupResolvers } from "./setup-resolvers";

export const resolvers: Resolvers = {
	Query: {
		...AuthResolvers?.Query,
		...CategoryResolvers?.Query,
		...ProductResolvers?.Query,
		...SearchResolvers?.Query,
		...SubcategoryResolvers?.Query,
		...SetupResolvers?.Query,
		...Tag?.Query,
	},
	Mutation: {
		...AuthResolvers?.Mutation,
		...CategoryResolvers?.Mutation,
		...SubcategoryResolvers?.Mutation,
		...Tag?.Mutation,
	},
};
