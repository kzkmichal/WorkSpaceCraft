import { getClient } from "@/lib/apollo-server";
import {
	Product,
	ProductsDocument,
	ProductsQuery,
	ProductsQueryVariables,
} from "@/graphql/generated/graphql";

export async function getProducts(
	limit = 12,
	offset = 0,
): Promise<Product[]> {
	try {
		const { data } = await getClient().query<
			ProductsQuery,
			ProductsQueryVariables
		>({
			query: ProductsDocument,
			variables: { limit, offset },
		});

		return data.products;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}
