import { PrismaClient, CategoryType } from "@prisma/client";

/**
 * Helper functions for building search queries with proper types
 */
export class SearchQueryBuilder {
	/**
	 * Build full-text search condition for PostgreSQL
	 */
	static buildFullTextSearch(query: string) {
		// Escape special characters for PostgreSQL full-text search
		const escapedQuery = query
			.replace(/[|&:*!]/g, " ") // Remove special characters
			.trim()
			.split(/\s+/) // Split on whitespace
			.filter((word) => word.length >= 2) // Filter out short words
			.join(" & "); // Join with AND operator

		if (!escapedQuery) {
			return undefined;
		}

		return {
			OR: [
				// Standard text search for fallback
				{ title: { contains: query, mode: "insensitive" as const } },
				{
					description: {
						contains: query,
						mode: "insensitive" as const,
					},
				},
				// Full-text search (PostgreSQL specific)
				// Note: This would need raw SQL in production for best performance
			],
		};
	}

	/**
	 * Build category filter condition
	 */
	static buildCategoryFilter(category?: CategoryType) {
		if (!category) return undefined;

		return {
			categories: {
				some: {
					categoryType: category,
				},
			},
		};
	}

	/**
	 * Build subcategory filter condition
	 */
	static buildSubcategoryFilter(subcategorySlug?: string) {
		if (!subcategorySlug) return undefined;

		return {
			subcategories: {
				some: {
					subcategory: {
						slug: subcategorySlug,
					},
				},
			},
		};
	}

	static buildTagsFilter(tagsSlug: string[]) {
		if (tagsSlug.length === 0) return undefined;

		return {
			tags: {
				some: {
					tag: {
						slug: {
							in: tagsSlug,
						},
					},
				},
			},
		};
	}

	/**
	 * Build complete search where clause
	 */
	static buildSearchWhere(params: {
		query?: string;
		category?: CategoryType;
		subcategory?: string;
		tags?: string[];
	}) {
		const conditions = [];

		// Text search
		if (params.query?.trim()) {
			const textSearch = this.buildFullTextSearch(params.query);
			if (textSearch) {
				conditions.push(textSearch);
			}
		}

		// Category filter
		if (params.category) {
			const categoryFilter = this.buildCategoryFilter(
				params.category,
			);
			if (categoryFilter) {
				conditions.push(categoryFilter);
			}
		}

		// Subcategory filter
		if (params.subcategory) {
			const subcategoryFilter = this.buildSubcategoryFilter(
				params.subcategory,
			);
			if (subcategoryFilter) {
				conditions.push(subcategoryFilter);
			}
		}

		if (params.tags && params.tags.length > 0) {
			const tagsFilter = this.buildTagsFilter(params.tags);
			if (tagsFilter) {
				conditions.push(tagsFilter);
			}
		}

		// Combine with AND logic
		return conditions.length > 0 ? { AND: conditions } : {};
	}

	static buildPriceFilter(minPrice?: number, maxPrice?: number) {
		const conditions = [];

		if (minPrice !== undefined) {
			conditions.push({ price: { gte: minPrice } });
		}
		if (maxPrice !== undefined) {
			conditions.push({ price: { lte: maxPrice } });
		}

		return conditions.length > 0 ? { AND: conditions } : undefined;
	}

	static buildRatingFilter(minRating?: number) {
		if (minRating === undefined) return undefined;

		return {
			reviews: {
				some: {
					rating: {
						gte: minRating,
					},
				},
			},
		};
	}

	static buildSort(sortBy?: string) {
		switch (sortBy) {
			case sortOptions.PRICE_LOW_TO_HIGH:
				return [{ price: "asc" as const }];
			case sortOptions.PRICE_HIGH_TO_LOW:
				return [{ price: "desc" as const }];
			case sortOptions.NEWEST:
				return [{ createdAt: "desc" as const }];
			case sortOptions.OLDEST:
				return [{ createdAt: "asc" as const }];
			case sortOptions.MOST_POPULAR:
				return [{ createdAt: "desc" as const }];
			case sortOptions.HIGHEST_RATED:
				return [{ createdAt: "desc" as const }];
			case sortOptions.MOST_REVIEWED:
				return [{ createdAt: "desc" as const }];
			default:
				return [{ createdAt: "desc" as const }];
		}
	}
}

/**
 * Analytics helper functions
 */
export class SearchAnalytics {
	static async trackSearch(
		prisma: PrismaClient,
		params: {
			query: string;
			resultCount?: number;
			userId?: string;
			searchContext?: string;
		},
	) {
		try {
			await prisma.searchAnalytics.create({
				data: {
					query: params.query.trim(),
					resultCount: params.resultCount || 0,
					userId: params.userId,
					searchContext: params.searchContext || "unknown",
				},
			});
		} catch (error) {
			// Don't fail the search if analytics tracking fails
			console.error("Failed to track search analytics:", error);
		}
	}

	/**
	 * Get popular search queries (for future branches)
	 */
	static async getPopularQueries(prisma: PrismaClient, limit = 10) {
		try {
			// Simple aggregation for Branch 1
			const popularQueries = await prisma.searchAnalytics.groupBy({
				by: ["query"],
				_count: {
					query: true,
				},
				_avg: {
					resultCount: true,
				},
				where: {
					createdAt: {
						gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
					},
					query: {
						not: undefined,
					},
				},
				orderBy: {
					_count: {
						query: "desc",
					},
				},
				take: limit,
			});

			return popularQueries.map((item) => ({
				query: item.query,
				count: item._count.query,
				avgResultCount: item._avg.resultCount || 0,
			}));
		} catch (error) {
			console.error("Failed to get popular queries:", error);
			return [];
		}
	}
}

/**
 * Type definitions for search
 */
export type SearchParams = {
	query?: string;
	category?: CategoryType;
	subcategory?: string;
	tags?: string[];
	limit?: number;
	offset?: number;
};

export enum SuggestionProps {
	PRODUCT = "PRODUCT",
	CATEGORY = "CATEGORY",
	SEARCH_QUERY = "SEARCH_QUERY",
	TAG = "TAG",
}
export type SuggestionType = keyof typeof SuggestionProps;

export type SearchSuggestionData = {
	type: SuggestionType;
	title: string;
	subtitle?: string;
	url: string;
	imageUrl?: string;
	badge?: string;
};

/**
 * Search result types
 */
export type ProductSearchResult = {
	id: string;
	title: string;
	description: string;
	price: number;
	imageUrl?: string;
	createdAt: Date;
	categories: CategoryType[];
	subcategories: string[];
	tags: string[];
};

export type CategorySearchResult = {
	name: string;
	slug: string;
	type: CategoryType;
	productCount: number;
};

export type TagSearchResult = {
	id: string;
	name: string;
	slug: string;
	productCount: number;
};

export enum sortOptions {
	PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
	PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
	NEWEST = "NEWEST",
	OLDEST = "OLDEST",
	MOST_POPULAR = "MOST_POPULAR",
	HIGHEST_RATED = "HIGHEST_RATED",
	MOST_REVIEWED = "MOST_REVIEWED",
}
