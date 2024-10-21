import { ProductResolvers } from "./types/Product";
import { SetupResolvers } from "./types/Setup";
import { ArticleResolvers } from "./types/Article";

export const resolvers = {
	Query: {
		...ProductResolvers.Query,
		...SetupResolvers.Query,
		...ArticleResolvers.Query,
	},
	Mutation: {
		...ProductResolvers.Mutation,
		...SetupResolvers.Mutation,
		...ArticleResolvers.Mutation,
	},
};
