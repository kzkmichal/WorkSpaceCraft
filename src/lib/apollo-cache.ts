import { InMemoryCache, FieldFunctionOptions } from "@apollo/client";
import type { Product } from "@/graphql/generated/graphql";

interface ProductQueryArgs {
	offset?: number;
	limit?: number;
}

export const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				products: {
					keyArgs: false,
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
			},
		},
		Product: {
			keyFields: ["id"],
			fields: {
				formattedPrice: {
					read(price: number | null) {
						return price ? `$${price.toFixed(2)}` : null;
					},
				},
			},
		},
	},
});
