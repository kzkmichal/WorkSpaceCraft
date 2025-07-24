"use client";

import { ProductSortOption } from "@/graphql/generated/graphql";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SearchParamsKeys } from "@/components/modules/Products";
import { SortFilterProps } from "./types";
import { Button } from "@/components/common/atoms";
import { useFilterParams } from "../../hooks/useFilterParams";
import { SORT_OPTIONS } from "./const";

export const SortFilter = ({
	"data-testid": testId = "sort-filter",
}: SortFilterProps) => {
	const { filters, updateFilter } = useFilterParams();
	const [isOpen, setIsOpen] = useState(false);

	const currentSort = filters.sortBy as ProductSortOption | undefined;

	const currentSortLabel =
		SORT_OPTIONS.find((option) => option.value === currentSort)
			?.label || "Newest First";

	const handleSortChange = (sortOption: ProductSortOption) => {
		updateFilter({
			[SearchParamsKeys.SORT_BY]:
				sortOption === "NEWEST" ? undefined : sortOption,
		});

		setIsOpen(false);
	};

	const clearSortFilter = () => {
		updateFilter({
			[SearchParamsKeys.SORT_BY]: undefined,
		});
	};

	return (
		<div className="space-y-4" data-testid={testId}>
			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex w-full items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				>
					<span>{currentSortLabel}</span>
					<ChevronDown
						className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-white shadow-lg">
						<div className="py-1">
							{SORT_OPTIONS.map((option) => (
								<button
									key={option.value}
									onClick={() => handleSortChange(option.value)}
									className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
										currentSort === option.value ||
										(!currentSort && option.value === "NEWEST")
											? "bg-primary/10 font-medium text-primary"
											: "text-foreground"
									}`}
								>
									{option.label}
								</button>
							))}
						</div>
					</div>
				)}

				{isOpen && (
					<div
						className="z-5 fixed inset-0"
						onClick={() => setIsOpen(false)}
					/>
				)}
			</div>

			{currentSort && currentSort !== "NEWEST" && (
				<Button
					onClick={clearSortFilter}
					variant="outline"
					size="sm"
					className="w-full text-xs"
					data-testid={`${testId}-clear-button`}
				>
					Reset to Default Sort
				</Button>
			)}
		</div>
	);
};
