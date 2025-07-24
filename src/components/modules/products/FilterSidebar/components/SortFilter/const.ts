import { ProductSortOption } from "@/graphql/generated/graphql";

export const SORT_OPTIONS = [
	{ value: "NEWEST" as ProductSortOption, label: "Newest First" },
	{ value: "OLDEST" as ProductSortOption, label: "Oldest First" },
	{
		value: "PRICE_LOW_TO_HIGH" as ProductSortOption,
		label: "Price: Low to High",
	},
	{
		value: "PRICE_HIGH_TO_LOW" as ProductSortOption,
		label: "Price: High to Low",
	},
	{
		value: "MOST_POPULAR" as ProductSortOption,
		label: "Most Popular",
	},
	{
		value: "HIGHEST_RATED" as ProductSortOption,
		label: "Highest Rated",
	},
	{
		value: "MOST_REVIEWED" as ProductSortOption,
		label: "Most Reviewed",
	},
] as const;
