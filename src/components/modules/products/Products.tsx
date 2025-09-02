"use client";
import { ProductsProps } from "./types";
import { useFilterStore } from "@/stores";
import { useProducts } from "@/hooks/useProducts";
import { Container } from "@/components/common/molecules";
import {
	ProductsSearch,
	SearchEmpty,
	SearchError,
	SearchLoading,
} from "../Search";
import { FilterSidebar } from "./FilterSidebar";
import { useEffect } from "react";
import { ProductList } from "./ProductList";
import { usePopularTags } from "@/hooks/tags/useTags";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { useFilterStoreWithRouter } from "./FilterSidebar/hooks/useFilterStoreWithRouter";

export const Products = ({
	initialParams,
	initialPopularTags,
	"data-testid": testId = "products",
}: ProductsProps) => {
	const { urlFilters, clearAllFilters } = useFilterStoreWithRouter();

	const searchQuery = urlFilters.search || "";
	const tagSlugs = urlFilters.tags;
	const category = urlFilters.category;
	const subcategory = urlFilters.subcategory;
	const page = urlFilters.page || 1;
	const sortBy = urlFilters.sortBy;
	const limit = 12;
	const minPrice = urlFilters.minPrice
		? parseFloat(urlFilters.minPrice)
		: undefined;
	const maxPrice = urlFilters.maxPrice
		? parseFloat(urlFilters.maxPrice)
		: undefined;

	const offset = (page - 1) * limit;

	const {
		products: browseProducts,
		loading: browseLoading,
		error: browseError,
		refetch,
	} = useProducts(
		limit,
		// offset,
		category,
		tagSlugs,
		searchQuery,
		subcategory,
		sortBy,
		minPrice,
		maxPrice,
	);

	const { popularTags, loading: tagsLoading } = usePopularTags(20);
	const finalPopularTags =
		popularTags.length > 0 ? popularTags : initialPopularTags;

	const products = browseProducts;
	const loading = browseLoading;
	const error = browseError;

	const hasResults = products.length > 0;
	const hasFilters =
		searchQuery ||
		category ||
		subcategory ||
		(tagSlugs && tagSlugs.length > 0);

	const loadMoreProducts = () => {
		useFilterStore.getState().updateFilterInstant("page", page + 1);
	};

	useEffect(() => {
		refetch();
	}, [
		searchQuery,
		category,
		subcategory,
		page,
		JSON.stringify(tagSlugs || []),
	]);

	return (
		<Container
			wrapperClassName="flex flex-col lg:flex-row gap-6"
			as="section"
			paddingX="none"
			paddingY="none"
			data-testid={testId}
		>
			<div className="flex flex-col gap-3 rounded-lg border bg-white p-6">
				<div className="flex items-center justify-between gap-3">
					<ProductsSearch
						className="w-full"
						placeholder="Search products..."
						data-testid={`${testId}-search`}
					/>
					{finalPopularTags && (
						<MobileFilterSheet
							popularTags={finalPopularTags}
							data-testid={`${testId}-mobile-filters`}
							mode="staged"
						/>
					)}
				</div>
				{!loading && finalPopularTags && (
					<aside className="hidden w-64 flex-shrink-0 lg:block">
						<FilterSidebar
							popularTags={finalPopularTags}
							data-testid={`${testId}-desktop-sidebar`}
							mode="instant"
						/>
					</aside>
				)}
			</div>
			<div className="flex-1 rounded-lg border bg-white p-6">
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
						// onRetry={() =>
						// 	shouldUseSearch
						// 		? refetchSearch()
						// 		: window.location.reload()
						// }
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
					<ProductList
						products={products}
						data-testid={`${testId}-list`}
					/>
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
			</div>
		</Container>
	);
};
