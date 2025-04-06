import { getClient } from "@/lib/apollo-server";
import {
	MyProductsDocument,
	MyProductsQuery,
	ProductFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getMyProducts(): Promise<
	ProductFieldsFragment[]
> {
	try {
		const client = await getClient();
		const { data } = await client.query<MyProductsQuery>({
			query: MyProductsDocument,
		});

		return data.myProducts;
	} catch (error) {
		console.error("Error fetching my products:", error);
		return [];
	}
}
