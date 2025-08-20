"use client";

import {
	CategoryType,
	useCategoriesWithStatsQuery,
} from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { SearchParamsKeys } from "../../../types";
import { useFilterParams } from "../../hooks/useFilterParams";
import { CategoryFilterProps } from "./types";
import { RadioFilter } from "../shared/RadioFilter";
import { RadioFilterOption } from "../shared/RadioFilter/types";

export const CategoryFilter = ({
	"data-testid": testId = "category-filter",
}: CategoryFilterProps) => {
	const { filters, updateFilter } = useFilterParams();

	const { data, loading, error } = useCategoriesWithStatsQuery({
		fetchPolicy: "cache-and-network",
	});

	const handleCategoryChange = (categoryType?: string) => {
		updateFilter({
			[SearchParamsKeys.CATEGORY]: categoryType as
				| CategoryType
				| undefined,
			[SearchParamsKeys.SUBCATEGORY]: undefined,
		});
	};

	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={`${testId}-loading`}
			>
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="ml-2 text-sm text-muted-foreground">
					Loading categories...
				</span>
			</div>
		);
	}

	if (error || !data?.categoriesWithStats) {
		return (
			<div
				className="text-sm text-muted-foreground"
				data-testid={`${testId}-error`}
			>
				Failed to load categories
			</div>
		);
	}

	const categories = data.categoriesWithStats;

	const options: RadioFilterOption[] = categories.map((category) => ({
		value: category.type,
		label: category.name,
		count: category.productCount,
	}));

	return (
		<RadioFilter
			name="category"
			options={options}
			value={filters.category}
			onChange={handleCategoryChange}
			defaultLabel="All Categories"
			data-testid={`${testId}-radio-filter`}
		/>
	);
};
