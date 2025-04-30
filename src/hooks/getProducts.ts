import { getClient } from "@/lib/apollo-server";
import {
	ProductFieldsFragment,
	ProductsDocument,
	ProductsQuery,
	ProductsQueryVariables,
} from "@/graphql/generated/graphql";

export async function getProducts(
	limit = 12,
	offset = 0,
	tagSlugs?: string[],
): Promise<ProductFieldsFragment[]> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			ProductsQuery,
			ProductsQueryVariables
		>({
			query: ProductsDocument,
			variables: {
				limit,
				offset,
				tagSlugs:
					tagSlugs && tagSlugs.length > 0 ? tagSlugs : undefined,
			},
		});

		return data.products;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}
