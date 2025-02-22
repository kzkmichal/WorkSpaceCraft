import {
	SubcategoryDocument,
	SubcategoryFieldsFragment,
	SubcategoryQuery,
	SubcategoryQueryVariables,
} from "@/graphql/generated/graphql";
import { getClient } from "@/lib/apollo-server";

export async function getSubcategory(
	fullSlug: string,
): Promise<SubcategoryFieldsFragment | null> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			SubcategoryQuery,
			SubcategoryQueryVariables
		>({
			query: SubcategoryDocument,
			variables: { fullSlug: fullSlug },
		});

		return data.subcategory || null;
	} catch (error) {
		console.error("Failed to fetch subcategory:", {
			fullSlug,
			error,
			errorMessage:
				error instanceof Error ? error.message : "Unknown error",
		});
		return null;
	}
}
