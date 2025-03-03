import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { Product } from "@prisma/client";

const httpLink = createHttpLink({
	uri: "/api/graphql",
	credentials: "same-origin",
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				products: {
					keyArgs: false,
					merge(
						existing: Product[] = [],
						incoming: Product[],
					): Product[] {
						return [...existing, ...incoming];
					},
				},
			},
		},
	},
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
