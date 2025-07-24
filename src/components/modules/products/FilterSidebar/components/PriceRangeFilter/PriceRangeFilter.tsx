"use client";

import { SearchParamsKeys } from "@/components/modules/products/Products";
import { useState, useEffect } from "react";
import { usePriceRangeForFiltersQuery } from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { PriceRangeFilterProps } from "./types";
import { useFilterParams } from "../../hooks/useFilterParams";

export const PriceRangeFilter = ({
	"data-testid": testId = "price-range-filter",
}: PriceRangeFilterProps) => {
	const { filters, updateFilter } = useFilterParams();

	const {
		minPrice: urlMinPrice,
		maxPrice: urlMaxPrice,
		category: currentCategory,
		subcategory: currentSubcategory,
	} = filters;

	const [minPrice, setMinPrice] = useState(urlMinPrice || "");
	const [maxPrice, setMaxPrice] = useState(urlMaxPrice || "");

	const hasActivePriceFilter = urlMinPrice || urlMaxPrice;

	useEffect(() => {
		setMinPrice(urlMinPrice || "");
		setMaxPrice(urlMaxPrice || "");
	}, [urlMinPrice, urlMaxPrice]);

	const { data, loading } = usePriceRangeForFiltersQuery({
		variables: {
			categoryType: currentCategory,
			subcategorySlug: currentSubcategory,
		},
		fetchPolicy: "cache-and-network",
	});

	const priceRange = data?.priceRangeForFilters;

	const handleApplyPriceFilter = () => {
		const minValue = minPrice ? parseFloat(minPrice) : undefined;
		const maxValue = maxPrice ? parseFloat(maxPrice) : undefined;

		if (minValue && minValue < 0) return;
		if (maxValue && maxValue < 0) return;
		if (minValue && maxValue && minValue > maxValue) return;

		updateFilter({
			[SearchParamsKeys.MIN_PRICE]:
				minValue && minValue > 0 ? minValue.toString() : undefined,
			[SearchParamsKeys.MAX_PRICE]:
				maxValue && maxValue > 0 ? maxValue.toString() : undefined,
		});
	};

	const clearPriceFilter = () => {
		setMinPrice("");
		setMaxPrice("");

		updateFilter({
			[SearchParamsKeys.MIN_PRICE]: undefined,
			[SearchParamsKeys.MAX_PRICE]: undefined,
		});
	};

	const canApply =
		minPrice !== (urlMinPrice || "") ||
		maxPrice !== (urlMaxPrice || "");

	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={testId}
			>
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="ml-2 text-sm text-muted-foreground">
					Loading price range...
				</span>
			</div>
		);
	}

	return (
		<div className="space-y-4" data-testid={testId}>
			<div className="grid grid-cols-2 gap-2">
				<div>
					<label className="text-xs font-medium text-muted-foreground">
						Min Price
					</label>
					<input
						type="number"
						placeholder={priceRange?.min?.toString() || "0"}
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
						className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
						min="0"
						step="1"
					/>
				</div>

				<div>
					<label className="text-xs font-medium text-muted-foreground">
						Max Price
					</label>
					<input
						type="number"
						placeholder={priceRange?.max?.toString() || "1000"}
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
						className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
						min="0"
						step="1"
					/>
				</div>
			</div>
			{canApply && (
				<button
					onClick={handleApplyPriceFilter}
					className="w-full rounded-md bg-primary py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
				>
					Apply Price Range
				</button>
			)}
			{hasActivePriceFilter && (
				<button
					onClick={clearPriceFilter}
					className="w-full rounded-md border border-border py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
				>
					Clear Price Filter
				</button>
			)}
		</div>
	);
};
