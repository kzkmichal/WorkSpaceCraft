import { getClient } from "@/lib/apollo-server";
import {
	CategoriesDocument,
	CategoriesQuery,
	CategoryFieldsFragment,
} from "@/graphql/generated/graphql";
import { getCategoriesData } from "@/hooks/helpers/category-helpers";

export async function getCategories(): Promise<
	CategoryFieldsFragment[]
> {
	return getCategoriesData(async () => {
		const client = await getClient();
		const { data } = await client.query<CategoriesQuery>({
			query: CategoriesDocument,
		});
		return data.categories;
	});
}
