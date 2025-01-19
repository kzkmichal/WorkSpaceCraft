import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { headers } from "next/headers";

export const { getClient } = registerApolloClient(() => {
	const httpLink = new HttpLink({
		uri:
			process.env.NEXT_PUBLIC_GRAPHQL_URL ||
			"http://localhost:3000/api/graphql",
		headers: Object.fromEntries(headers()),
		fetchOptions: { cache: "no-store" },
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
		defaultOptions: {
			query: {
				fetchPolicy: "no-cache",
				errorPolicy: "all",
			},
		},
	});
});
