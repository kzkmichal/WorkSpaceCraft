import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	useSearchSuggestionsQuery,
	type SearchSuggestion,
} from "@/graphql/generated/graphql";
import { useDebounce } from "../utils/useDebounce";

/**
 * Configuration for search hook
 */
type UseSearchConfig = {
	debounceMs?: number; // Debounce delay for suggestions (default: 300ms)
	minQueryLength?: number; // Minimum query length for search (default: 2)
	suggestionsLimit?: number; // Max suggestions to fetch (default: 10)
	enabled?: boolean; // Whether search is enabled (default: true)
};

export const useSearch = (config: UseSearchConfig = {}) => {
	const {
		debounceMs = 300,
		minQueryLength = 2,
		suggestionsLimit = 10,
		enabled = true,
	} = config;

	const router = useRouter();
	const [query, setQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const debouncedQuery = useDebounce(query, debounceMs);

	const {
		data: suggestionsData,
		loading: suggestionsLoading,
		error: suggestionsError,
		refetch: refetchSuggestions,
	} = useSearchSuggestionsQuery({
		variables: {
			query: debouncedQuery,
			limit: suggestionsLimit,
		},
		skip: !enabled || debouncedQuery.length < minQueryLength,
		fetchPolicy: "cache-first",
		errorPolicy: "all",
	});

	/**
	 * Update search query
	 */
	const updateQuery = useCallback(
		(newQuery: string) => {
			setQuery(newQuery);

			// Set loading immediately for UX (if query is long enough)
			if (newQuery.trim().length >= minQueryLength) {
				setIsLoading(true);
			} else {
				setIsLoading(false);
			}
		},
		[minQueryLength],
	);

	/**
	 * Clear search state
	 */
	const clearSearch = useCallback(() => {
		setQuery("");
		setIsLoading(false);
	}, []);

	/**
	 * Execute search (redirect to products page)
	 */
	const executeSearch = useCallback(
		(searchQuery?: string) => {
			const queryToSearch = searchQuery || query;

			if (queryToSearch.trim()) {
				router.push(
					`/products?search=${encodeURIComponent(queryToSearch.trim())}`,
				);
				clearSearch();
			}
		},
		[query, router, clearSearch],
	);

	/**
	 * Handle suggestion click
	 */
	const selectSuggestion = useCallback(
		(suggestion: SearchSuggestion) => {
			router.push(suggestion.url);
			clearSearch();
		},
		[router, clearSearch],
	);

	useEffect(() => {
		if (debouncedQuery.length >= minQueryLength) {
			setIsLoading(suggestionsLoading);
		}
	}, [suggestionsLoading, debouncedQuery.length, minQueryLength]);

	// Derived state
	const suggestions = suggestionsData?.searchSuggestions || [];
	const hasError = !!suggestionsError;
	const error = suggestionsError?.message;

	return {
		// State
		query,
		isLoading,
		suggestions,
		hasError,
		error,
		//Actions
		updateQuery,
		clearSearch,
		selectSuggestion,
		executeSearch,
		//Utils
		canSearch: query.trim().length >= minQueryLength,
		hasResults: suggestions.length > 0,
	};
};
