import { ApolloError } from "@apollo/client";

export type ErrorHandler = {
	onNotFound?: () => void;
	onUnauthorized?: () => void;
	onForbidden?: () => void;
	onNetworkError?: (error: Error) => void;
	onOther?: (error: ApolloError) => void;
};

export function useGraphQLError(handlers: ErrorHandler = {}) {
	return (error: ApolloError | undefined) => {
		if (!error) return;

		// Obsługa błędów GraphQL
		if (error.graphQLErrors) {
			error.graphQLErrors.forEach((graphQLError) => {
				const code = graphQLError.extensions?.code as string;

				switch (code) {
					case "NOT_FOUND":
						handlers.onNotFound?.();
						break;
					case "UNAUTHORIZED":
						handlers.onUnauthorized?.();
						break;
					case "FORBIDDEN":
						handlers.onForbidden?.();
						break;
					default:
						handlers.onOther?.(error);
				}
			});
		}

		// Obsługa błędów sieciowych
		if (error.networkError) {
			handlers.onNetworkError?.(error.networkError);
		}
	};
}
