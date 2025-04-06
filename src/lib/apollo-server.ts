import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(async () => {
	const httpLink = new HttpLink({
		uri:
			process.env.NEXT_PUBLIC_GRAPHQL_URL ||
			"http://localhost:3000/api/graphql",
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
		defaultOptions: {
			query: {
				fetchPolicy: "network-only",
			},
		},
	});
});
