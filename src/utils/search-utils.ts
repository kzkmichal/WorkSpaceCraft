import type {
	SearchSuggestion,
	CategoryType,
} from "@/graphql/generated/graphql";

/**
 * Format search query for URL
 */
export const formatSearchQuery = (query: string): string => {
	return query.trim().toLowerCase();
};

/**
 * Parse search query from URL params§
 */
export const parseSearchQuery = (
	searchParams: URLSearchParams,
): string => {
	return searchParams.get("search") || "";
};

/**
 * Build search URL with parameters
 */
export function buildSearchUrl(params: {
	query?: string;
	category?: CategoryType;
	subcategory?: string;
	page?: number;
}): string {
	const urlParams = new URLSearchParams();

	if (params.query?.trim()) {
		urlParams.set("search", params.query.trim());
	}

	if (params.category) {
		urlParams.set("category", params.category.toLowerCase());
	}

	if (params.subcategory) {
		urlParams.set("subcategory", params.subcategory);
	}

	if (params.page && params.page > 1) {
		urlParams.set("page", params.page.toString());
	}

	const queryString = urlParams.toString();
	return queryString ? `/products?${queryString}` : "/products";
}

/**
 * Highlight search terms in text
 */
export function highlightSearchTerms(
	text: string,
	searchQuery: string,
): string {
	if (!searchQuery.trim()) return text;

	const terms = searchQuery.trim().split(/\s+/);
	let highlightedText = text;

	terms.forEach((term) => {
		const regex = new RegExp(`(${escapeRegExp(term)})`, "gi");
		highlightedText = highlightedText.replace(
			regex,
			'<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
		);
	});

	return highlightedText;
}

/**
 * Escape RegExp special characters
 */
function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Group suggestions by type for better display
 */
export function groupSuggestionsByType(
	suggestions: SearchSuggestion[],
) {
	const groups = {
		products: [] as SearchSuggestion[],
		categories: [] as SearchSuggestion[],
		tags: [] as SearchSuggestion[],
		queries: [] as SearchSuggestion[],
	};

	suggestions.forEach((suggestion) => {
		switch (suggestion.type) {
			case "PRODUCT":
				groups.products.push(suggestion);
				break;
			case "CATEGORY":
				groups.categories.push(suggestion);
				break;
			case "TAG":
				groups.tags.push(suggestion);
				break;
			case "SEARCH_QUERY":
				groups.queries.push(suggestion);
				break;
		}
	});

	return groups;
}

/**
 * Get suggestion display icon based on type
 */
export function getSuggestionIcon(
	type: SearchSuggestion["type"],
): string {
	switch (type) {
		case "PRODUCT":
			return "📦";
		case "CATEGORY":
			return "📁";
		case "TAG":
			return "🏷️";
		case "SEARCH_QUERY":
			return "🔍";
		default:
			return "📄";
	}
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): {
	isValid: boolean;
	error?: string;
} {
	const trimmed = query.trim();

	if (trimmed.length === 0) {
		return { isValid: false, error: "Search query cannot be empty" };
	}

	if (trimmed.length < 2) {
		return {
			isValid: false,
			error: "Search query must be at least 2 characters",
		};
	}

	if (trimmed.length > 100) {
		return {
			isValid: false,
			error: "Search query is too long (max 100 characters)",
		};
	}

	// Check for only special characters
	if (!/[a-zA-Z0-9]/.test(trimmed)) {
		return {
			isValid: false,
			error:
				"Search query must contain at least one letter or number",
		};
	}

	return { isValid: true };
}

/**
 * Get search analytics context
 */
export function getSearchContext(pathname: string): string {
	if (pathname === "/") return "homepage";
	if (pathname.startsWith("/products")) return "products-page";
	if (pathname.includes("header")) return "header";
	return "unknown";
}

/**
 * Format suggestion subtitle
 */
export function formatSuggestionSubtitle(
	type: SearchSuggestion["type"],
	data: { price?: number; count?: number; category?: string },
): string {
	switch (type) {
		case "PRODUCT":
			return data.price ? `$${data.price.toFixed(2)}` : "";
		case "CATEGORY":
		case "TAG":
			return data.count
				? `${data.count} product${data.count !== 1 ? "s" : ""}`
				: "";
		case "SEARCH_QUERY":
			return "Popular search";
		default:
			return "";
	}
}

/**
 * Truncate text for suggestions
 */
export function truncateText(
	text: string,
	maxLength: number = 50,
): string {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength).trim() + "...";
}
