import { InMemoryCache, FieldFunctionOptions } from "@apollo/client";
import type { Product, Tag } from "@/graphql/generated/graphql";

interface ProductQueryArgs {
	offset?: number;
	limit?: number;
	categoryType?: string;
	tagSlug?: string;
}

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				products: {
					keyArgs: ["categoryType", "tagSlugs"],
					merge(
						existing: readonly Product[] | undefined,
						incoming: readonly Product[],
						options: FieldFunctionOptions<ProductQueryArgs>,
					) {
						const merged = [...(existing || [])];
						const offset = (options.args?.offset as number) || 0;

						for (let i = 0; i < incoming.length; i++) {
							merged[offset + i] = incoming[i];
						}

						return merged;
					},
				},
				popularTags: {
					keyArgs: ["limit"],
				},
			},
		},
		Product: {
			keyFields: ["id"],
			fields: {
				tags: {
					merge(_existing = [], incoming) {
						return incoming as Tag[];
					},
				},
				formattedPrice: {
					read(price: number | null) {
						return price ? `$${price.toFixed(2)}` : null;
					},
				},
			},
		},
		Tag: {
			keyFields: ["id"],
		},
	},
});
