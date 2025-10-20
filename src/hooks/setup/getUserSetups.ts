import { getClient } from "@/lib/apollo-server";
import {
	UserSetupsDocument,
	UserSetupsQuery,
	UserSetupsQueryVariables,
	SetupFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getUserSetups(
	userId: string,
): Promise<SetupFieldsFragment[]> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			UserSetupsQuery,
			UserSetupsQueryVariables
		>({
			query: UserSetupsDocument,
			variables: { userId },
			fetchPolicy: "no-cache",
		});

		return data?.userSetups || [];
	} catch (error) {
		console.error("Error fetching user setups:", error);
		return [];
	}
}
