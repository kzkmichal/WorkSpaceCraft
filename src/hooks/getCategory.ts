import {
	CategoryByTypeDocument,
	CategoryByTypeQuery,
	CategoryByTypeQueryVariables,
	CategoryFieldsFragment,
	// CategoryInfo,
	CategoryType,
} from "@/graphql/generated/graphql";
import { getClient } from "@/lib/apollo-server";

export async function getCategory(
	type: string,
): Promise<CategoryFieldsFragment | null> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			CategoryByTypeQuery,
			CategoryByTypeQueryVariables
		>({
			query: CategoryByTypeDocument,
			variables: { type: type.toUpperCase() as CategoryType },
		});

		return data.categoryByType;
	} catch (error) {
		console.error("Failed to fetch categories:", error);
		return null;
	}
}
