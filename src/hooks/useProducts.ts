"use client";

import { useCallback } from "react";
import { ApolloError, gql, Reference } from "@apollo/client";
import { useGraphQLError } from "./useGraphQLError";
import { useLoadingState } from "./useLoadingState";
import {
	useProductsQuery,
	useCreateProductMutation,
	CreateProductInput,
} from "@/graphql/generated/graphql";

export function useProducts(initialLimit = 10) {
	const { withLoading } = useLoadingState();

	const { data, loading, error, fetchMore } = useProductsQuery({
		variables: {
			limit: initialLimit,
			offset: 0,
		},
		notifyOnNetworkStatusChange: true,
	});

	const [createProduct] = useCreateProductMutation();

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
	}, [data?.products, fetchMore, initialLimit, withLoading]);

	const addProduct = useCallback(
		async (input: CreateProductInput) => {
			return withLoading(async () => {
				try {
					const result = await createProduct({
						variables: { input },
						update: (cache, { data }) => {
							if (!data?.createProduct) return;

							cache.modify({
								fields: {
									products(existingProducts = [] as Reference[]) {
										const newProductRef = cache.writeFragment({
											data: data.createProduct,
											fragment: gql`
												fragment NewProduct on Product {
													id
													title
													description
													subcategory
													price
												}
											`,
										});
										//eslint-disable-next-line
										return [...existingProducts, newProductRef];
									},
								},
							});
						},
					});
					return result.data?.createProduct;
				} catch (error) {
					if (error instanceof ApolloError) {
						handleError(error);
					} else if (error instanceof Error) {
						console.error("Unexpected error:", error.message);
					}
					return null;
				}
			});
		},
		[createProduct, withLoading],
	);

	return {
		products: data?.products || [],
		loading,
		loadMore,
		addProduct,
		hasMore: data?.products.length === initialLimit,
	};
}
