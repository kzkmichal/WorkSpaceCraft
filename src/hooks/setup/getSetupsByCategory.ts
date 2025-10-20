import { getClient } from "@/lib/apollo-server";
import {
	AllSetupsDocument,
	AllSetupsQuery,
	AllSetupsQueryVariables,
	SetupFieldsFragment,
	SetupCategory,
	SetupStatus,
} from "@/graphql/generated/graphql";

export async function getSetupsByCategory(
	category?: SetupCategory,
	status: SetupStatus = "PUBLISHED" as SetupStatus,
	page: number = 1,
	limit: number = 20,
): Promise<SetupFieldsFragment[]> {
	try {
		const offset = (page - 1) * limit;

		const client = await getClient();
		const { data } = await client.query<
			AllSetupsQuery,
			AllSetupsQueryVariables
		>({
			query: AllSetupsDocument,
			variables: {
				category: category || undefined,
				status,
				limit,
				offset,
			},
			fetchPolicy: "no-cache", // For SSR
		});

		return data?.allSetups || [];
	} catch (error) {
		console.error("Error fetching setups by category:", error);
		return [];
	}
}
