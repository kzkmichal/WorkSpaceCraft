import { getSearchService } from "@/lib/search-service-factory";
import { Resolvers } from "../generated/graphql";
import { GraphQLError } from "graphql";
import { formatProduct, formatUser } from "./utils";

export const resolvers: Resolvers = {
	Query: {
		searchSuggestions: async (_, { query, limit }) => {
			const trimmedQuery = query?.trim();
			try {
				if (!query || trimmedQuery.length < 2) {
					return [];
				}

				const searchService = getSearchService();

				const suggestions = await searchService.getSearchSuggestions(
					trimmedQuery,
					{ limit: limit || 10 },
				);

				return suggestions;
			} catch (error) {
				console.log(
					"Error fetching search suggestions in resolver:",
					error,
				);
				throw new GraphQLError("Failed to fetch search suggestions", {
					extensions: { code: "SEARCH_ERROR" },
				});
			}
		},

		searchProducts: async (
			_,
			{ query, limit, offset, category, subcategory, tags },
		) => {
			try {
				const searchService = getSearchService();

				const products = await searchService.searchProducts({
					query,
					limit,
					offset,
					category,
					subcategory,
					tags,
				});

				return products.map((product) => ({
					...formatProduct(product),
					createdBy: formatUser(product.createdBy),
					categories: product.categories.map((pc) => pc.categoryType),
					subcategories: product.subcategories.map((ps) => ({
						...ps.subcategory,
						description: ps.subcategory.description || undefined,
						createdAt: ps.subcategory.createdAt.toISOString(),
						updatedAt: ps.subcategory.updatedAt.toISOString(),
					})),
					images: product.images.map((image) => ({
						...image,
						fileName: image.fileName || undefined,
						createdAt: image.createdAt.toISOString(),
						updatedAt: image.updatedAt.toISOString(),
					})),
					tags: product.tags.map((pt) => ({
						...pt.tag,
						createdAt: pt.tag.createdAt.toISOString(),
						updatedAt: pt.tag.updatedAt.toISOString(),
					})),
				}));
			} catch (error) {
				console.error("Error in searchProducts resolver:", error);
				throw new GraphQLError("Failed to search products", {
					extensions: { code: "SEARCH_ERROR" },
				});
			}
		},
	},
};
