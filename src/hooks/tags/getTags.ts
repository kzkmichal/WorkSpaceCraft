import { getClient } from "@/lib/apollo-server";
import {
	TagsDocument,
	TagsQuery,
	TagFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getTags(): Promise<TagFieldsFragment[]> {
	try {
		const client = await getClient();
		const { data } = await client.query<TagsQuery>({
			query: TagsDocument,
		});

		return data.tags || [];
	} catch (error) {
		console.error("Error fetching tags:", error);
		return [];
	}
}
