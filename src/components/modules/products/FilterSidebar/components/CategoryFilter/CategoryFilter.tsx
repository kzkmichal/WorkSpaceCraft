"use client";

import {
	CategoryType,
	useCategoriesWithStatsQuery,
} from "@/graphql/generated/graphql";
import { CategoryFilterProps } from "./types";
import { RadioFilter } from "../shared/RadioFilter";
import { AsyncStateWrapper } from "../shared/AsyncStateWrapper";
import { useRadioFilterMode } from "../../hooks/useRadioFilterMode";

export const CategoryFilter = ({
	mode = "instant",
	"data-testid": testId = "category-filter",
}: CategoryFilterProps) => {
	const { filters, updateWithDependencies } =
		useRadioFilterMode(mode);

	const { data, loading, error } = useCategoriesWithStatsQuery({
		fetchPolicy: "cache-and-network",
	});

	const handleCategoryChange = (categoryType?: string) => {
		updateWithDependencies(
			"category",
			categoryType as CategoryType | undefined,
			["subcategory"],
		);
	};

	return (
		<AsyncStateWrapper
			loading={loading}
			error={error}
			data={data?.categoriesWithStats}
			loadingMessage="Loading categories..."
			errorMessage="Failed to load categories"
			data-testid={testId}
		>
			{data?.categoriesWithStats && (
				<RadioFilter
					name="category"
					options={data.categoriesWithStats.map((category) => ({
						value: category.type,
						label: category.name,
						count: category.productCount,
					}))}
					value={filters.category}
					onChange={handleCategoryChange}
					defaultLabel="All Categories"
					data-testid={`${testId}-radio-filter`}
				/>
			)}
		</AsyncStateWrapper>
	);
};
