import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
} from "@apollo/client";
import { clientAuthLink } from "./apollo-auth-link";

const httpLink = createHttpLink({
	uri: "/api/graphql",
	credentials: "same-origin",
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				me: {
					merge: true,
				},
			},
		},
	},
});

export const client = new ApolloClient({
	link: from([clientAuthLink, httpLink]),
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
