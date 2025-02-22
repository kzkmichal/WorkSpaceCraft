import { getClient } from "@/lib/apollo-server";
import {
	CategoriesDocument,
	CategoriesQuery,
	CategoryFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getCategories(): Promise<
	CategoryFieldsFragment[] | null
> {
	try {
		const client = await getClient();

		const { data } = await client.query<CategoriesQuery>({
			query: CategoriesDocument,
		});

		return data.categories;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return [];
	}
}
