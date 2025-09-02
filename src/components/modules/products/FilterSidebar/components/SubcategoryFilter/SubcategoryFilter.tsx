"use client";

import { useSubcategoriesWithStatsQuery } from "@/graphql/generated/graphql";
import { SubcategoryFilterProps } from "./types";
import { RadioFilter } from "../shared/RadioFilter";
import { AsyncStateWrapper } from "../shared/AsyncStateWrapper";
import { useFilterMode } from "../../hooks/useFilterMode";

export const SubcategoryFilter = ({
	mode = "instant",
	"data-testid": testId = "subcategory-filter",
}: SubcategoryFilterProps) => {
	const { filters, updateFilter } = useFilterMode(mode);

	const { data, loading, error } = useSubcategoriesWithStatsQuery({
		variables: { categoryType: filters.category! },
		skip: !filters.category,
		fetchPolicy: "cache-and-network",
	});

	const handleSubcategoryChange = (value?: string) => {
		updateFilter("subcategory", value);
	};

	if (!filters.category) {
		return (
			<div
				className="text-sm text-muted-foreground"
				data-testid={`${testId}-no-category`}
			>
				Select a category first
			</div>
		);
	}

	return (
		<AsyncStateWrapper
			loading={loading}
			error={error}
			data={data?.subcategoriesWithStats}
			loadingMessage="Loading subcategories..."
			errorMessage="Failed to load subcategories"
			data-testid={testId}
		>
			{data?.subcategoriesWithStats &&
				(data.subcategoriesWithStats.length === 0 ? (
					<div
						className="text-sm text-muted-foreground"
						data-testid={`${testId}-no-subcategories`}
					>
						No subcategories available
					</div>
				) : (
					<RadioFilter
						name="subcategory"
						options={data.subcategoriesWithStats.map(
							(subcategory) => ({
								value: subcategory.slug,
								label: subcategory.name,
								count: subcategory.productCount,
							}),
						)}
						value={filters.subcategory}
						onChange={handleSubcategoryChange}
						defaultLabel="All Subcategories"
						data-testid={`${testId}-radio-filter`}
					/>
				))}
		</AsyncStateWrapper>
	);
};
