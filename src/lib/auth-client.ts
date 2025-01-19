import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";

export function createAuthClient() {
	const baseUrl = process.env.VERCEL_URL
		? `https://${process.env.VERCEL_URL}`
		: process.env.NEXTAUTH_URL || "http://localhost:3000";

	return new ApolloClient({
		link: createHttpLink({
			uri: `${baseUrl}/api/graphql`,
			credentials: "same-origin",
		}),
		cache: new InMemoryCache(),
		defaultOptions: {
			query: {
				fetchPolicy: "no-cache",
			},
			mutate: {
				fetchPolicy: "no-cache",
			},
		},
	});
}
