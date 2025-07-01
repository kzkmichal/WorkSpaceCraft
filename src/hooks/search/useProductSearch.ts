import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
	useSearchProductsQuery,
	type Product,
	type CategoryType,
} from "@/graphql/generated/graphql";
import { useDebounce } from "../utils/useDebounce";

export const useProductSearch = () => {
	const router = useRouter();
	const [searchParams, setSearchParams] = useState({
		query: "",
		category: undefined as CategoryType | undefined,
		subcategory: undefined as CategoryType | undefined,
		limit: 10,
		offset: 0,
	});

	const debouncedQuery = useDebounce(searchParams.query, 300);

	const finalSearchParams = {
		...searchParams,
		query: debouncedQuery,
	};

	const {
		data: productsData,
		loading: productsLoading,
		error: productsError,
		refetch: refetchProducts,
	} = useSearchProductsQuery({
		variables: finalSearchParams,
		skip: !finalSearchParams.query && !finalSearchParams.category,
		fetchPolicy: "cache-and-network",
		errorPolicy: "all",
	});

	const updateSearch = useCallback(
		(params: Partial<typeof searchParams>) => {
			const newParams = {
				...searchParams,
				...params,
				offset: 0,
			};
			setSearchParams(newParams);

			const urlParams = new URLSearchParams();
			if (newParams.query) urlParams.set("search", newParams.query);
			if (newParams.category)
				urlParams.set("category", newParams.category);
			if (newParams.subcategory)
				urlParams.set("subcategory", newParams.subcategory);

			router.push(`/products?${urlParams.toString()}`, {
				scroll: false,
			});
		},

		[searchParams, router],
	);

	const loadMore = useCallback(() => {
		setSearchParams((prev) => ({
			...prev,
			offset: prev.offset + prev.limit,
		}));
		refetchProducts();
	}, [refetchProducts]);

	const clearFilters = useCallback(() => {
		setSearchParams({
			query: "",
			category: undefined,
			subcategory: undefined,
			limit: 10,
			offset: 0,
		});
		router.push("/products", { scroll: false });
	}, [router]);

	return {
		//State
		searchParams,
		products: productsData?.searchProducts || [],
		isLoading: productsLoading,
		hasError: !!productsError,
		error: productsError,
		//Actions
		updateSearch,
		loadMore,
		clearFilters,
		//Utils
		hasResults: (productsData?.searchProducts?.length || 0) > 0,
		canLoadMore:
			(productsData?.searchProducts?.length || 0) >=
			searchParams.limit,
	};
};
