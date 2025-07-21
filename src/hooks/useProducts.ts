"use client";

import { useCallback } from "react";
import { ApolloError } from "@apollo/client";
import { useGraphQLError } from "./useGraphQLError";
import { useLoadingState } from "./useLoadingState";
import {
	useProductsQuery,
	CategoryType,
} from "@/graphql/generated/graphql";

export function useProducts(
	initialLimit = 10,
	categoryType?: CategoryType,
	tagSlugs?: string[],
) {
	const { withLoading } = useLoadingState();

	const { data, loading, error, fetchMore } = useProductsQuery({
		variables: {
			limit: initialLimit,
			offset: 0,
			// categoryType,
			tagSlugs:
				tagSlugs && tagSlugs.length > 0 ? tagSlugs : undefined,
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "no-cache",
	});

	const handleError = useGraphQLError({
		onUnauthorized: () => {
			console.error("Unauthorized access");
		},
		onNetworkError: (error) => {
			console.error("Network error:", error);
		},
	});

	handleError(error);

	const loadMore = useCallback(async () => {
		if (!data?.products) return;

		return withLoading(async () => {
			try {
				await fetchMore({
					variables: {
						offset: data.products.length,
						limit: initialLimit,
						categoryType,
						tagSlugs,
					},
				});
			} catch (error) {
				if (error instanceof ApolloError) {
					handleError(error);
				} else if (error instanceof Error) {
					console.error("Unexpected error:", error.message);
				}
			}
		});
	}, [
		data?.products,
		fetchMore,
		initialLimit,
		withLoading,
		categoryType,
		tagSlugs,
	]);

	return {
		products: data?.products || [],
		loading,
		loadMore,
		hasMore: data?.products.length === initialLimit,
	};
}
