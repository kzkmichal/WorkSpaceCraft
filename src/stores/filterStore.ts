import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
	FilterStore,
	FilterState,
	StagedFilterState,
	UpdateType,
} from "./types";

export const useFilterStore = create<FilterStore>()(
	devtools(
		(set, get) => ({
			// ===== INITIAL STATE =====
			filters: {},
			stagedFilters: {},
			isCommitting: false,

			// ===== NEW: Direct URL management actions =====
			updateURL: (updates: UpdateType) => {},

			// ===== INSTANT ACTIONS (Desktop) - Now direct =====
			updateFilterInstant: (key, value) => {
				const { updateURL } = get();

				const updates: UpdateType = {};

				if (Array.isArray(value)) {
					updates[key] =
						value.length > 0 ? value.join(",") : undefined;
				} else if (
					value !== undefined &&
					value !== null &&
					value !== ""
				) {
					updates[key] = String(value);
				} else {
					updates[key] = undefined;
				}

				if (key === "category") {
					updates.subcategory = undefined;
				}

				updateURL(updates);
			},

			updateMultipleFiltersInstant: (
				updates: Record<
					string,
					string | string[] | number | undefined
				>,
			) => {
				const { updateURL } = get();

				const urlUpdates: UpdateType = {};

				Object.entries(updates).forEach(([key, value]) => {
					if (Array.isArray(value)) {
						urlUpdates[key] =
							value.length > 0 ? value.join(",") : undefined;
					} else if (
						value !== undefined &&
						value !== null &&
						value !== ""
					) {
						urlUpdates[key] = String(value);
					} else {
						urlUpdates[key] = undefined;
					}
				});

				updateURL(urlUpdates);
			},

			updateFilterStaged: (key, value) => {
				set((state) => {
					const newStagedFilters = {
						...state.stagedFilters,
					} as Record<string, string | string[]>;

					if (value === undefined || value === null || value === "") {
						delete newStagedFilters[key];
					} else {
						newStagedFilters[key] = value as string | string[];
					}

					if (key === "category") {
						delete newStagedFilters.subcategory;
					}

					return { stagedFilters: newStagedFilters };
				});
			},

			commitStagedFilters: async () => {
				const { stagedFilters, updateURL } = get();

				if (Object.keys(stagedFilters).length === 0) {
					return;
				}

				set({ isCommitting: true });

				try {
					const updates: Record<string, string | undefined> = {};
					Object.entries(stagedFilters).forEach(([key, value]) => {
						if (Array.isArray(value)) {
							updates[key] =
								value.length > 0 ? value.join(",") : undefined;
						} else if (value !== undefined && value !== null) {
							updates[key] = String(value);
						} else {
							updates[key] = undefined;
						}
					});

					updateURL(updates);

					set({ stagedFilters: {} });
				} catch (error) {
					console.error("Error committing filters:", error);
					throw error;
				} finally {
					set({ isCommitting: false });
				}
			},

			resetStagedFilters: () => {
				set({ stagedFilters: {} });
			},

			clearStagedFilter: (key) => {
				set((state) => {
					const newStagedFilters = { ...state.stagedFilters };
					delete newStagedFilters[key];
					return { stagedFilters: newStagedFilters };
				});
			},

			// ===== SYNC ACTIONS =====
			setFiltersFromURL: (urlFilters) => {
				const cleanedFilters: FilterState = {};

				Object.entries(urlFilters).forEach(([key, value]) => {
					if (value !== undefined && value !== "" && value !== null) {
						if (key === "page" && value === 1) {
							return;
						}
						(cleanedFilters as any)[key] = value;
					}
				});

				set({ filters: cleanedFilters });
			},

			clearAllFilters: () => {
				set({ filters: {}, stagedFilters: {} });

				const { updateURL } = get();

				updateURL({
					category: undefined,
					subcategory: undefined,
					search: undefined,
					tags: undefined,
					minPrice: undefined,
					maxPrice: undefined,
					sortBy: undefined,
					page: undefined,
				});
			},

			// ===== COMPUTED GETTERS =====
			hasUncommittedChanges: () => {
				const { stagedFilters } = get();
				return Object.keys(stagedFilters).length > 0;
			},

			getActiveFiltersCount: () => {
				const { filters } = get();
				return [
					filters.search,
					filters.category,
					filters.subcategory,
					filters.tags?.length ? filters.tags : undefined,
					filters.minPrice,
					filters.maxPrice,
					filters.sortBy && filters.sortBy !== "NEWEST"
						? filters.sortBy
						: undefined,
				].filter(Boolean).length;
			},

			getCombinedFilters: () => {
				const { filters, stagedFilters } = get();

				const cleanedUrlFilters: FilterState = {};
				Object.entries(filters).forEach(([key, value]) => {
					if (
						value !== undefined &&
						value !== "" &&
						value !== null &&
						!(key === "page" && value === 1)
					) {
						(cleanedUrlFilters as any)[key] = value;
					}
				});

				return { ...cleanedUrlFilters, ...stagedFilters };
			},
		}),
		{
			name: "filter-store",
		},
	),
);
