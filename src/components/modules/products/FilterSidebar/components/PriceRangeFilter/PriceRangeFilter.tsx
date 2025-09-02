"use client";

import { useState, useEffect } from "react";
import { usePriceRangeForFiltersQuery } from "@/graphql/generated/graphql";
import { PriceRangeFilterProps } from "./types";
import { Button } from "@/components/ui/button";
import { AsyncStateWrapper } from "../shared/AsyncStateWrapper";
import { useFilterMode } from "../../hooks/useFilterMode";

export const PriceRangeFilter = ({
	mode = "instant",
	"data-testid": testId = "price-range-filter",
}: PriceRangeFilterProps) => {
	const { filters, updateFilter } = useFilterMode(mode);

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

	const handleApplyPriceFilter = () => {
		const minValue = minPrice ? parseFloat(minPrice) : undefined;
		const maxValue = maxPrice ? parseFloat(maxPrice) : undefined;

		if (minValue && minValue < 0) return;
		if (maxValue && maxValue < 0) return;
		if (minValue && maxValue && minValue > maxValue) return;

		updateFilter("minPrice", minValue);
		updateFilter("maxPrice", maxValue);
	};

	const clearPriceFilter = () => {
		setMinPrice("");
		setMaxPrice("");
		updateFilter("minPrice", undefined);
		updateFilter("maxPrice", undefined);
	};

	const canApply =
		minPrice !== (urlMinPrice || "") ||
		maxPrice !== (urlMaxPrice || "");

	const inputCx =
		"mt-1 w-full rounded-lg border border-border bg-accent px-3 py-2 text-sm text-accent-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/60 shadow-sm transition-all";

	return (
		<AsyncStateWrapper
			loading={loading}
			error={null}
			data={true} // Price filter always works
			loadingMessage="Loading price range..."
			data-testid={testId}
		>
			<div className="space-y-4">
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
							placeholder={
								data?.priceRangeForFilters?.min?.toString() || "0"
							}
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
							placeholder={
								data?.priceRangeForFilters?.max?.toString() || "1000"
							}
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
		</AsyncStateWrapper>
	);
};
