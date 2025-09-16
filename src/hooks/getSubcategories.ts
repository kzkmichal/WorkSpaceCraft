import {
	SubcategoriesQuery,
	SubcategoryFieldsFragment,
	CategoryType,
	SubcategoriesDocument,
} from "@/graphql/generated/graphql";
import { client } from "@/lib/apollo-client";

export async function getSubcategories(
	categoryType: CategoryType,
	limit: number = 6,
): Promise<SubcategoryFieldsFragment[] | null> {
	try {
		const { data } = await client.query<SubcategoriesQuery>({
			query: SubcategoriesDocument,
			variables: { categoryType, limit },
		});

		return data.subcategories;
	} catch (error) {
		console.error("Failed to fetch subcategories:", error);
		return [];
	}
}
