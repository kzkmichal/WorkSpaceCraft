import { getClient } from "@/lib/apollo-server";
import {
	TagDocument,
	TagFieldsFragment,
	TagQuery,
	TagQueryVariables,
} from "@/graphql/generated/graphql";

export async function getTag(
	slug: string,
): Promise<TagFieldsFragment | null> {
	try {
		const client = await getClient();
		const { data } = await client.query<TagQuery, TagQueryVariables>({
			query: TagDocument,
			variables: { slug },
		});
		return data.tag || null;
	} catch (error) {
		console.error("Error fetching tag:", error);
		return null;
	}
}
