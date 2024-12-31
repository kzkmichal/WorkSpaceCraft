import { useState, useCallback } from "react";

export function useLoadingState(initialState = false) {
	const [isLoading, setIsLoading] = useState(initialState);
	const [error, setError] = useState<Error | null>(null);

	const withLoading = useCallback(
		async <T>(operation: () => Promise<T>): Promise<T | null> => {
			try {
				setIsLoading(true);
				setError(null);
				return await operation();
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error("Unknown error"),
				);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	return {
		isLoading,
		error,
		withLoading,
	};
}
