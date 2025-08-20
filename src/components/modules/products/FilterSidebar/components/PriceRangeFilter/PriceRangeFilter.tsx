"use client";

import { SearchParamsKeys } from "@/components/modules/Products";
import { useState, useEffect } from "react";
import { usePriceRangeForFiltersQuery } from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { PriceRangeFilterProps } from "./types";
import { useFilterParams } from "../../hooks/useFilterParams";
import { Button } from "@/components/ui/button";

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

	const inputCx =
		"mt-1 w-full rounded-lg border border-border bg-accent px-3 py-2 text-sm text-accent-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/60 shadow-sm transition-all";

	return (
		<div className="space-y-4" data-testid={testId}>
			<div className="grid grid-cols-2 gap-2">
				<div data-testid={`${testId}-min-price`}>
					<label
						className="text-xs font-medium text-muted-foreground"
						data-testid={`${testId}-min-price-label`}
					>
						Min Price
					</label>
					<input
						type="number"
						placeholder={priceRange?.min?.toString() || "0"}
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
						className={inputCx}
						min="0"
						step="1"
						data-testid={`${testId}-min-price-input`}
					/>
				</div>

				<div data-testid={`${testId}-max-price`}>
					<label
						className="text-xs font-medium text-muted-foreground"
						data-testid={`${testId}-max-price-label`}
					>
						Max Price
					</label>
					<input
						type="number"
						placeholder={priceRange?.max?.toString() || "1000"}
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
						className={inputCx}
						min="0"
						step="1"
						data-testid={`${testId}-max-price-input`}
					/>
				</div>
			</div>
			{canApply && (
				<Button
					variant="primary"
					onClick={handleApplyPriceFilter}
					className="w-full"
					size="sm"
					data-testid={`${testId}-apply-button`}
				>
					Apply Price Range
				</Button>
			)}
			{hasActivePriceFilter && (
				<Button
					variant="outline"
					onClick={clearPriceFilter}
					className="w-full"
					size="sm"
					data-testid={`${testId}-clear-button`}
				>
					Clear Price Filter
				</Button>
			)}
		</div>
	);
};
