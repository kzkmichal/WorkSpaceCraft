import { getClient } from "@/lib/apollo-server";
import {
	Product,
	ProductDocument,
	ProductQuery,
	ProductQueryVariables,
} from "@/graphql/generated/graphql";

export async function getProduct(
	id: string,
): Promise<Product | null> {
	try {
		const { data } = await getClient().query<
			ProductQuery,
			ProductQueryVariables
		>({
			query: ProductDocument,
			variables: { id },
		});

		return data.product || null;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}
