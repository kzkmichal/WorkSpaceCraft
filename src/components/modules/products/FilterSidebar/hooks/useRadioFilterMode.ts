import { useFilterMode } from "./useFilterMode";

export const useRadioFilterMode = (
	mode: "instant" | "staged" = "instant",
) => {
	const { filters, updateFilter, updateMultipleFilters } =
		useFilterMode(mode);

	const updateWithDependencies = (
		key: string,
		value: string | undefined,
		clearKeys: string[] = [],
	) => {
		const updates: Record<string, string | undefined> = {
			[key]: value,
		};

		clearKeys.forEach((clearKey) => {
			updates[clearKey] = undefined;
		});

		updateMultipleFilters(updates);
	};

	return {
		filters,
		updateFilter,
		updateMultipleFilters,
		updateWithDependencies,
	};
};
