"use client";

import { useSubcategoriesWithStatsQuery } from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { SearchParamsKeys } from "@/components/modules/products/Products";
import { SubcategoryFilterProps } from "./types";
import { useFilterParams } from "../../hooks/useFilterParams";

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
				data-testid={testId}
			>
				Select a category first
			</div>
		);
	}

	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={testId}
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
				data-testid={testId}
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
				data-testid={testId}
			>
				No subcategories available
			</div>
		);
	}

	return (
		<div className="space-y-2" data-testid={testId}>
			<label className="flex cursor-pointer items-center space-x-2 rounded p-2 transition-colors hover:bg-muted/50">
				<input
					type="radio"
					name="subcategory"
					checked={!filters.subcategory}
					onChange={() => handleSubcategoryChange(undefined)}
					className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
				/>
				<span className="text-sm font-medium">All Subcategories</span>
			</label>
			{subcategories.map((subcategory) => (
				<label
					key={subcategory.id}
					className="flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-muted/50"
				>
					<div className="flex items-center space-x-2">
						<input
							type="radio"
							name="subcategory"
							checked={filters.subcategory === subcategory.slug}
							onChange={() =>
								handleSubcategoryChange(subcategory.slug)
							}
							className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
						/>
						<span className="text-sm">{subcategory.name}</span>
					</div>
					<div className="flex flex-col items-end">
						<span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
							{subcategory.productCount}
						</span>
					</div>
				</label>
			))}
		</div>
	);
};
