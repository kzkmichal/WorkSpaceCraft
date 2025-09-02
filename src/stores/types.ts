import { CategoryType } from "@/constant/categories";

export type UpdateType = Record<string, string | undefined>;

export type FilterState = {
	category?: CategoryType;
	subcategory?: string;
	search?: string;
	tags?: string[];
	minPrice?: string;
	maxPrice?: string;
	sortBy?: string;
	page?: number;
};

export type StagedFilterState = Partial<FilterState>;

export type FilterStoreState = {
	filters: FilterState;
	stagedFilters: StagedFilterState;
	isCommitting: boolean;
};

export type FilterStoreActions = {
	updateURL: (updates: UpdateType) => void;

	updateFilterInstant: (
		key: keyof FilterState,
		value: string | string[] | number | undefined,
	) => void;

	updateMultipleFiltersInstant: (
		updates: Record<string, string | string[] | number | undefined>,
	) => void;

	updateFilterStaged: (
		key: keyof FilterState,
		value: string | string[] | number | undefined,
	) => void;

	commitStagedFilters: () => Promise<void>;
	resetStagedFilters: () => void;
	clearStagedFilter: (key: keyof FilterState) => void;

	setFiltersFromURL: (urlFilters: FilterState) => void;
	clearAllFilters: () => void;

	hasUncommittedChanges: () => boolean;
	getActiveFiltersCount: () => number;
	getCombinedFilters: () => FilterState;
};

export type FilterStore = FilterStoreState & FilterStoreActions;
