import {
	isBuildPhase,
	staticCategoryToGraphQL,
} from "./helpers/category-helpers";
import {
	CategoryByTypeDocument,
	CategoryByTypeQuery,
	CategoryByTypeQueryVariables,
	CategoryFieldsFragment,
	CategoryType,
} from "@/graphql/generated/graphql";
import { getClient } from "@/lib/apollo-server";
import { getCategoryBySlug } from "@/constant/categories";

const KNOWN_CATEGORIES = ["home", "remote", "office"];

export async function getCategory(
	slug: string,
): Promise<CategoryFieldsFragment | null> {
	if (!KNOWN_CATEGORIES.includes(slug.toLowerCase())) {
		return null;
	}

	if (isBuildPhase()) {
		return (
			staticCategoryToGraphQL(
				getCategoryBySlug(slug.toLowerCase()),
			) || null
		);
	}

	try {
		const client = await getClient();
		const { data } = await client.query<
			CategoryByTypeQuery,
			CategoryByTypeQueryVariables
		>({
			query: CategoryByTypeDocument,
			variables: { type: slug.toUpperCase() as CategoryType },
		});

		if (data?.categoryByType) {
			return data.categoryByType;
		}
	} catch (error) {
		console.log("Error fetching category data:", error);
	}

	return (
		staticCategoryToGraphQL(getCategoryBySlug(slug.toLowerCase())) ||
		null
	);
}
