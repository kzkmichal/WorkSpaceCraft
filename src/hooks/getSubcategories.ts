import {
	SubcategoriesQuery,
	Subcategory,
	CategoryType,
	SubcategoriesDocument,
} from "@/graphql/generated/graphql";
import { getClient } from "@/lib/apollo-server";

export async function getSubcategories(
	categoryType: CategoryType,
): Promise<Subcategory[] | null> {
	try {
		const client = await getClient();
		const { data } = await client.query<SubcategoriesQuery>({
			query: SubcategoriesDocument,
			variables: { categoryType },
		});

		return data.subcategories;
	} catch (error) {
		console.error("Failed to fetch subcategories:", error);
		return [];
	}
}
