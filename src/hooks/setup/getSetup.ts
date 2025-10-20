import { getClient } from "@/lib/apollo-server";
import {
	SetupByIdDocument,
	SetupByIdQuery,
	SetupByIdQueryVariables,
	SetupWithProductsFieldsFragment,
} from "@/graphql/generated/graphql";

export async function getSetup(
	id: string,
): Promise<SetupWithProductsFieldsFragment | null> {
	try {
		const client = await getClient();
		const { data } = await client.query<
			SetupByIdQuery,
			SetupByIdQueryVariables
		>({
			query: SetupByIdDocument,
			variables: { id },
			fetchPolicy: "no-cache",
		});

		return data?.setupById || null;
	} catch (error) {
		console.error("Error fetching setup:", error);
		return null;
	}
}
