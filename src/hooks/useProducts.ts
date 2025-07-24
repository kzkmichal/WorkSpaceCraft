"use client";

import { useCallback } from "react";
import { ApolloError } from "@apollo/client";
import { useGraphQLError } from "./useGraphQLError";
import { useLoadingState } from "./useLoadingState";
import {
	useProductsQuery,
	CategoryType,
	ProductSortOption,
} from "@/graphql/generated/graphql";

export function useProducts(
	initialLimit = 10,
	categoryType?: CategoryType,
	tagSlugs?: string[],
	searchQuery?: string,
	subcategory?: string,
	sortBy?: string,
	minPrice?: number,
	maxPrice?: number,
) {
	const { withLoading } = useLoadingState();

	const { data, loading, error, fetchMore, refetch } =
		useProductsQuery({
			variables: {
				input: {
					limit: initialLimit,
					offset: 0,
					categoryType,
					tagSlugs:
						tagSlugs && tagSlugs.length > 0 ? tagSlugs : undefined,
					search: searchQuery,
					subcategorySlug: subcategory,
					minPrice,
					maxPrice,
					sortBy: sortBy as ProductSortOption,
				},
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
						input: {
							offset: data.products.length,
							limit: initialLimit,
							categoryType,
							tagSlugs,
						},
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
		error: error || undefined,
		refetch,
	};
}
