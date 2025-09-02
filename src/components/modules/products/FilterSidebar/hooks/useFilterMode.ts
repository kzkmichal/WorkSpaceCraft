import { useMemo } from "react";
import { useFilterStore } from "@/stores";
import type { FilterState } from "@/stores/types";

export type FilterMode = "instant" | "staged";

export type UseFilterModeReturn = {
	filters: FilterState;
	updateFilter: (
		key: keyof FilterState,
		value: string | string[] | number | undefined,
	) => void;
	updateMultipleFilters: (
		updates: Record<string, string | string[] | number | undefined>,
	) => void;
};

export const useFilterMode = (
	mode: FilterMode = "instant",
): UseFilterModeReturn => {
	const urlFilters = useFilterStore((state) => state.filters);
	const stagedFilters = useFilterStore(
		(state) => state.stagedFilters,
	);
	const updateFilterInstant = useFilterStore(
		(state) => state.updateFilterInstant,
	);
	const updateFilterStaged = useFilterStore(
		(state) => state.updateFilterStaged,
	);
	const updateMultipleFiltersInstant = useFilterStore(
		(state) => state.updateMultipleFiltersInstant,
	);

	const filters = useMemo(() => {
		return mode === "instant"
			? urlFilters
			: { ...urlFilters, ...stagedFilters };
	}, [mode, urlFilters, stagedFilters]);

	const updateFilter = useMemo(() => {
		return mode === "instant"
			? updateFilterInstant
			: updateFilterStaged;
	}, [mode, updateFilterInstant, updateFilterStaged]);

	const updateMultipleFilters = useMemo(() => {
		if (mode === "instant") {
			return updateMultipleFiltersInstant;
		}

		return (
			updates: Record<string, string | string[] | number | undefined>,
		) => {
			Object.entries(updates).forEach(([key, value]) => {
				updateFilterStaged(key as keyof FilterState, value);
			});
		};
	}, [mode, updateMultipleFiltersInstant, updateFilterStaged]);

	return {
		filters,
		updateFilter,
		updateMultipleFilters,
	};
};
