import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "/api/graphql",
	credentials: "same-origin",
});

const cache = new InMemoryCache({
	// Konfiguracja typePolicies zostanie dodana później
});

export const client = new ApolloClient({
	link: httpLink,
	cache: cache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-first",
			returnPartialData: false,
		},
		mutate: {
			errorPolicy: "all",
		},
	},
});
