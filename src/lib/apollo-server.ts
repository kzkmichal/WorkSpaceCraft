import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	from,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { headers } from "next/headers";
import { createServerAuthLink } from "./apollo-auth-link";

export const { getClient } = registerApolloClient(async () => {
	const httpLink = new HttpLink({
		uri:
			process.env.NEXT_PUBLIC_GRAPHQL_URL ||
			"http://localhost:3000/api/graphql",
		headers: Object.fromEntries(headers()),
		fetchOptions: { cache: "no-store" },
	});

	const authLink = await createServerAuthLink();

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: from([authLink, httpLink]),
		defaultOptions: {
			query: {
				fetchPolicy: "no-cache",
				errorPolicy: "all",
			},
		},
	});
});
