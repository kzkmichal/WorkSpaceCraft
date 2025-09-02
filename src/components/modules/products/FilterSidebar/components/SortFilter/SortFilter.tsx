"use client";

import { ProductSortOption } from "@/graphql/generated/graphql";
import { SortFilterProps } from "./types";
import { SORT_OPTIONS } from "./const";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/components/utils/helpers";
import { useFilterMode } from "../../hooks/useFilterMode";

export const SortFilter = ({
	mode = "instant",
	"data-testid": testId = "sort-filter",
}: SortFilterProps) => {
	const { filters, updateFilter } = useFilterMode(mode);

	const currentSort = filters.sortBy as ProductSortOption | undefined;

	const currentSortLabel =
		SORT_OPTIONS.find((option) => option.value === currentSort)
			?.label || "Newest First";

	const handleSortChange = (value: string) => {
		const sortOption = value as ProductSortOption;
		updateFilter("sortBy", sortOption);
	};

	return (
		<Select
			value={currentSort || "NEWEST"}
			onValueChange={handleSortChange}
		>
			<SelectTrigger
				className={cn(
					"h-auto w-full rounded-lg border border-border bg-accent text-sm text-accent-foreground shadow-sm transition-all placeholder:text-muted-foreground",
					"hover:border-primary/60",
					"focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-0",
					"[&[data-state=open]]:border-primary [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-primary/20",
				)}
				data-testid={`${testId}-trigger`}
			>
				<SelectValue
					placeholder={currentSortLabel}
					data-testid={`${testId}-value`}
				/>
			</SelectTrigger>
			<SelectContent data-testid={`${testId}-dropdown-content`}>
				{SORT_OPTIONS.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						data-testid={`${testId}-dropdown-item-${option.value}`}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
