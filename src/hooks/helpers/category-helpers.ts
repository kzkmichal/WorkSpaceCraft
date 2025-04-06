import {
	CategoryType,
	CategoryFieldsFragment,
} from "@/graphql/generated/graphql";
import {
	getAllCategories,
	getCategoryBySlug,
} from "@/constant/categories";

export function staticCategoryToGraphQL(
	category: ReturnType<typeof getCategoryBySlug>,
): CategoryFieldsFragment | null {
	if (!category) return null;

	return {
		name: category.name,
		slug: category.slug,
		description: category.description || null,
		imageUrl: category.imageUrl || null,
		type: category.type as CategoryType,
		products: [],
		subcategories: [],
	};
}

export function isBuildPhase(): boolean {
	return process.env.NEXT_PHASE === "phase-production-build";
}

const filterAllCategories = () =>
	getAllCategories()
		.map(staticCategoryToGraphQL)
		.filter((category) => category !== null);

export async function getCategoriesData(
	graphqlFetcher: () => Promise<CategoryFieldsFragment[]>,
): Promise<CategoryFieldsFragment[]> {
	if (isBuildPhase()) {
		return filterAllCategories();
	}

	try {
		const data = await graphqlFetcher();
		if (data && data.length > 0) {
			return data;
		}
	} catch (error) {
		console.log("GraphQL fetch error:", error);
	}

	return filterAllCategories();
}
