"use client";

import {
	CategoryType,
	useCategoriesWithStatsQuery,
} from "@/graphql/generated/graphql";
import { Loader2 } from "lucide-react";
import { SearchParamsKeys } from "../../../Products/types";
import { CategoryFilterProps } from "./types";
import { useFilterParams } from "../../hooks/useFilterParams";

export const CategoryFilter = ({
	"data-testid": testId = "category-filter",
}: CategoryFilterProps) => {
	const { filters, updateFilter } = useFilterParams();

	const { data, loading, error } = useCategoriesWithStatsQuery({
		fetchPolicy: "cache-and-network",
	});

	const handleCategoryChange = (categoryType?: CategoryType) => {
		updateFilter({
			[SearchParamsKeys.CATEGORY]: categoryType,
			[SearchParamsKeys.SUBCATEGORY]: undefined,
		});
	};

	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={testId}
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
				data-testid={testId}
			>
				Failed to load categories
			</div>
		);
	}

	const categories = data.categoriesWithStats;

	return (
		<div className="space-y-2" data-testid={testId}>
			<label className="flex cursor-pointer items-center space-x-2 rounded p-2 transition-colors hover:bg-muted/50">
				<input
					type="radio"
					name="category"
					checked={!filters.category}
					onChange={() => handleCategoryChange(undefined)}
					className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
				/>
				<span className="text-sm font-medium">All Categories</span>
			</label>
			{categories.map((category) => (
				<label
					key={category.type}
					className="flex cursor-pointer items-center justify-between rounded p-2 transition-colors hover:bg-muted/50"
				>
					<div className="flex items-center space-x-2">
						<input
							type="radio"
							name="category"
							checked={filters.category === category.type}
							onChange={() => handleCategoryChange(category.type)}
							className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
						/>
						<span className="text-sm">{category.name}</span>
					</div>
					<span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
						{category.productCount}
					</span>
				</label>
			))}
		</div>
	);
};
