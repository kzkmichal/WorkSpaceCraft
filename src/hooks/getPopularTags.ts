import { getClient } from "@/lib/apollo-server";
import {
	PopularTagsDocument,
	PopularTagsQuery,
	PopularTagsQueryVariables,
	TagFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getPopularTags(
	limit = 20,
): Promise<TagFieldsFragment[]> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			PopularTagsQuery,
			PopularTagsQueryVariables
		>({
			query: PopularTagsDocument,
			variables: { limit },
		});

		return data.popularTags || [];
	} catch (error) {
		console.error("Error fetching popular tags:", error);
		return [];
	}
}
