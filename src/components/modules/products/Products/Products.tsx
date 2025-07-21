"use client";
import { useSearchParams } from "next/navigation";
import { ProductsProps, SearchParamsKeys } from "./types";
import { CategoryType } from "@/constant/categories";
import { useSearchProductsQuery } from "@/graphql/generated/graphql";
import { useProducts } from "@/hooks/useProducts";
import {
	Container,
	FilterOptions,
} from "@/components/common/molecules";
import {
	ProductsSearch,
	SearchEmpty,
	SearchError,
	SearchLoading,
} from "../../Search";
import { FilterSidebar } from "../FilterSidebar";
import { useEffect } from "react";
import { ProductList } from "../ProductList";
import { usePopularTags } from "@/hooks/tags/useTags";

export const Products = ({
	initialParams,
	initialPopularTags,
}: ProductsProps) => {
	const searchParams = useSearchParams();

	const searchQuery = searchParams.get(SearchParamsKeys.SEARCH) || "";
	const tagSlugs =
		searchParams.get(SearchParamsKeys.TAGS)?.split(",") || undefined;
	const category = searchParams.get(SearchParamsKeys.CATEGORY) as
		| CategoryType
		| undefined;
	const subcategory =
		searchParams.get(SearchParamsKeys.SUBCATEGORY) || undefined;
	const page = Number(searchParams.get(SearchParamsKeys.PAGE)) || 1;
	const limit = 12;
	const offset = (page - 1) * limit;

	const shouldUseSearch = !!(
		searchQuery ||
		category ||
		subcategory ||
		(tagSlugs && tagSlugs.length > 0)
	);

	const {
		data: searchData,
		loading: searchLoading,
		error: searchError,
		refetch: refetchSearch,
	} = useSearchProductsQuery({
		variables: {
			query: searchQuery || "",
			category,
			subcategory,
			limit,
			tags: tagSlugs,
			offset,
		},
		skip: !shouldUseSearch,
		fetchPolicy: "cache-and-network",
		errorPolicy: "all",
	});

	const { products: browseProducts, loading: browseLoading } =
		useProducts(limit, category, tagSlugs);

	const { popularTags, loading: tagsLoading } = usePopularTags(20);
	const finalPopularTags =
		popularTags.length > 0 ? popularTags : initialPopularTags;

	const products = shouldUseSearch
		? searchData?.searchProducts || []
		: browseProducts;
	const loading = shouldUseSearch ? searchLoading : browseLoading;
	const error = shouldUseSearch ? searchError : undefined;

	const hasResults = products.length > 0;
	const hasFilters =
		searchQuery ||
		category ||
		subcategory ||
		(tagSlugs && tagSlugs.length > 0);

	const removeFilter = (filterType: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(filterType);
		if (filterType === "category") {
			params.delete("subcategory");
		}
		window.history.replaceState(
			{},
			"",
			`/products?${params.toString()}`,
		);
	};

	const removeTagFilter = (tagToRemove: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const currentTags = params.get("tags")?.split(",") || [];
		const newTags = currentTags.filter((tag) => tag !== tagToRemove);

		if (newTags.length > 0) {
			params.set("tags", newTags.join(","));
		} else {
			params.delete("tags");
		}

		window.history.replaceState(
			{},
			"",
			`/products?${params.toString()}`,
		);
	};

	const clearAllFilters = () => {
		window.history.replaceState({}, "", "/products");
	};

	const loadMoreProducts = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", String(page + 1));
		window.history.pushState(
			{},
			"",
			`/products?${params.toString()}`,
		);
	};

	useEffect(() => {
		if (shouldUseSearch) {
			refetchSearch();
		}
	}, [
		searchQuery,
		category,
		subcategory,
		page,
		JSON.stringify(tagSlugs || []),
		shouldUseSearch,
	]);

	return (
		<Container className="space-y-6">
			<ProductsSearch
				className="max-w-lg"
				placeholder="Search products..."
			/>
			<FilterOptions />
			<Container className="flex gap-6" paddingX="none">
				{!loading && finalPopularTags && (
					<aside className="w-64 flex-shrink-0">
						<FilterSidebar popularTags={finalPopularTags} />
					</aside>
				)}
			</Container>
			<main className="flex-1">
				{hasFilters && (
					<div className="mb-6 flex flex-wrap gap-2">
						{searchQuery && (
							<FilterChip
								label={`Search: "${searchQuery}"`}
								onRemove={() => removeFilter("search")}
							/>
						)}
						{category && (
							<FilterChip
								label={`Category: ${category}`}
								onRemove={() => removeFilter("category")}
							/>
						)}
						{subcategory && (
							<FilterChip
								label={`Subcategory: ${subcategory}`}
								onRemove={() => removeFilter("subcategory")}
							/>
						)}
						{tagSlugs &&
							tagSlugs.map((tag) => (
								<FilterChip
									key={tag}
									label={`Tag: ${tag}`}
									onRemove={() => removeTagFilter(tag)}
								/>
							))}
					</div>
				)}
				{!loading && (
					<div className="mb-4 text-sm text-muted-foreground">
						{hasResults ? (
							<span>
								{products.length} product
								{products.length !== 1 ? "s" : ""} found
								{hasFilters && " for your filters"}
							</span>
						) : hasFilters ? (
							<span>No products found for your filters</span>
						) : (
							<span>Browse all products</span>
						)}
					</div>
				)}
				{loading && <SearchLoading message="Loading products..." />}
				{error && !loading && (
					<SearchError
						title="Failed to load products"
						description={error.message}
						onRetry={() =>
							shouldUseSearch
								? refetchSearch()
								: window.location.reload()
						}
					/>
				)}
				{!loading && !error && !hasResults && (
					<SearchEmpty
						query={searchQuery}
						title={
							hasFilters
								? `No results found`
								: "No products available"
						}
						description={
							hasFilters
								? "Try adjusting your filters or browse our categories"
								: "Check back later for new products"
						}
						action={
							hasFilters ? (
								<button
									onClick={clearAllFilters}
									className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
								>
									Clear all filters
								</button>
							) : undefined
						}
					/>
				)}
				{!loading && hasResults && (
					<ProductList products={products} />
				)}
				{!loading && hasResults && products.length >= limit && (
					<div className="mt-8 flex justify-center">
						<button
							onClick={loadMoreProducts}
							className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
						>
							Load more products
						</button>
					</div>
				)}
			</main>
		</Container>
	);
};

const FilterChip = ({
	label,
	onRemove,
}: {
	label: string;
	onRemove: () => void;
}) => {
	return (
		<div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
			<span>{label}</span>
			<button
				onClick={onRemove}
				className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
				aria-label={`Remove ${label} filter`}
			>
				<svg
					className="h-3 w-3"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
};
