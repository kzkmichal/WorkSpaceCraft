"use client";

import { useSubcategoriesWithStatsQuery } from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { SearchParamsKeys } from "@/components/modules/Products";
import { SubcategoryFilterProps } from "./types";
import { useFilterParams } from "../../hooks/useFilterParams";
import { RadioFilter } from "../shared/RadioFilter";
import { RadioFilterOption } from "../shared/RadioFilter/types";

export const SubcategoryFilter = ({
	"data-testid": testId = "subcategory-filter",
}: SubcategoryFilterProps) => {
	const { filters, updateFilter } = useFilterParams();

	const { data, loading, error } = useSubcategoriesWithStatsQuery({
		variables: { categoryType: filters.category! },
		skip: !filters.category,
		fetchPolicy: "cache-and-network",
	});

	const handleSubcategoryChange = (subcategorySlug?: string) => {
		updateFilter({
			[SearchParamsKeys.SUBCATEGORY]: subcategorySlug,
		});
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

	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={`${testId}-loading`}
			>
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="ml-2 text-sm text-muted-foreground">
					Loading subcategories...
				</span>
			</div>
		);
	}

	if (error || !data?.subcategoriesWithStats) {
		return (
			<div
				className="text-sm text-muted-foreground"
				data-testid={`${testId}-error`}
			>
				Failed to load subcategories
			</div>
		);
	}

	const subcategories = data.subcategoriesWithStats;

	if (subcategories.length === 0) {
		return (
			<div
				className="text-sm text-muted-foreground"
				data-testid={`${testId}-no-subcategories`}
			>
				No subcategories available
			</div>
		);
	}

	const options: RadioFilterOption[] = subcategories.map(
		(subcategory) => ({
			value: subcategory.slug,
			label: subcategory.name,
			count: subcategory.productCount,
		}),
	);

	return (
		<RadioFilter
			name="subcategory"
			options={options}
			value={filters.subcategory}
			onChange={handleSubcategoryChange}
			defaultLabel="All Subcategories"
			data-testid={`${testId}-radio-filter`}
		/>
	);
};
