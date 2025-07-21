import { PrismaClient, CategoryType } from "@prisma/client";
import {
	SearchQueryBuilder,
	SearchAnalytics,
	type SearchParams,
	type SearchSuggestionData,
	SuggestionProps,
} from "./search-helpers";

/**
 * Main Search Service - handles all search-related business logic
 */
export class SearchService {
	constructor(private prisma: PrismaClient) {}

	/**
	 * Get search suggestions for smart dropdown
	 */
	async getSearchSuggestions(
		query: string,
		options: { limit?: number } = {},
	): Promise<SearchSuggestionData[]> {
		const { limit = 10 } = options;
		const suggestions: SearchSuggestionData[] = [];

		try {
			// Parallel queries for better performance
			const [products, categories, subcategories, tags] =
				await Promise.all([
					this.findMatchingProducts(query, { limit: 3 }),
					this.findMatchingCategories(query),
					this.findMatchingSubcategories(query),
					this.findMatchingTags(query, { limit: 2 }),
				]);

			// 1. Add product suggestions
			suggestions.push(
				...products.map((product) => ({
					type: SuggestionProps.PRODUCT,
					title: product.title,
					subtitle: `$${product.price.toFixed(2)}`,
					url: `/products/${product.id}`,
					imageUrl:
						product.images?.find((img) => img.isPrimary)?.url ||
						product.images?.[0]?.url,
					badge: this.getProductBadge(product),
				})),
			);
			// 2. Add category suggestions
			suggestions.push(
				...categories.map((category) => ({
					type: SuggestionProps.CATEGORY,
					title: `${category.name}`,
					subtitle: `${category.productCount} products`,
					url: `/products?category=${category.slug}`,
					badge: category.productCount > 20 ? "Popular" : undefined,
				})),
			);
			// 3. Add subcategory suggestions
			suggestions.push(
				...subcategories.map((subcategory) => ({
					type: SuggestionProps.CATEGORY,
					title: `${subcategory.categoryName} > ${subcategory.name}`,
					subtitle: `${subcategory.productCount} products`,
					url: `/products?category=${subcategory.categorySlug}&subcategory=${subcategory.slug}`,
				})),
			);
			// 4. Add tag suggestions
			suggestions.push(
				...tags.map((tag) => ({
					type: SuggestionProps.TAG,
					title: tag.name,
					subtitle: `${tag.productCount} products`,
					url: `/products?tags=${tag.slug}`,
				})),
			);
			// Return top suggestions up to limit
			return suggestions.slice(0, limit);
		} catch (error) {
			console.error("Error getting search suggestions:", error);
			return [];
		}
	}

	/**
	 * Search products with basic filtering
	 */
	async searchProducts(params: SearchParams) {
		const {
			query,
			category,
			subcategory,
			tags,
			limit = 20,
			offset = 0,
		} = params;

		try {
			// Build where clause using helper
			const where = SearchQueryBuilder.buildSearchWhere({
				query,
				category,
				subcategory,
				tags,
			});

			const products = await this.prisma.product.findMany({
				where,
				include: {
					createdBy: true,
					images: true,
					categories: true,
					subcategories: {
						include: {
							subcategory: true,
						},
					},
					tags: {
						include: {
							tag: true,
						},
					},
				},
				orderBy: [{ createdAt: "desc" }],
				take: limit,
				skip: offset,
			});

			if (query?.trim()) {
				SearchAnalytics.trackSearch(this.prisma, {
					query: query.trim(),
					resultCount: products.length,
					searchContext: "products-page",
				}).catch((err) =>
					console.error("Analytics tracking failed:", err),
				);
			}

			return products;
		} catch (error) {
			console.error("Error searching products:", error);
			throw new Error("Search failed");
		}
	}

	/**
	 * Find products matching search query
	 */
	private async findMatchingProducts(
		query: string,
		options: { limit?: number } = {},
	) {
		const { limit = 5 } = options;

		const where = SearchQueryBuilder.buildFullTextSearch(query);
		if (!where) return [];

		return this.prisma.product.findMany({
			where,
			include: {
				images: true,
			},
			orderBy: [{ createdAt: "desc" }],
			take: limit,
		});
	}

	/**
	 * Find categories matching search query
	 */
	private async findMatchingCategories(query: string) {
		// Static categories with product counts
		const categories = [
			{ type: "HOME", name: "Home", slug: "home" },
			{ type: "REMOTE", name: "Remote", slug: "remote" },
			{ type: "OFFICE", name: "Office", slug: "office" },
		];

		const matchingCategories = categories.filter((cat) =>
			cat.name.toLowerCase().includes(query.toLowerCase()),
		);

		// Get product counts for matching categories
		const categoriesWithCounts = await Promise.all(
			matchingCategories.map(async (category) => {
				const productCount = await this.prisma.product.count({
					where: {
						categories: {
							some: {
								categoryType: category.type as CategoryType,
							},
						},
					},
				});

				return {
					...category,
					productCount,
				};
			}),
		);

		return categoriesWithCounts.filter((cat) => cat.productCount > 0);
	}

	/**
	 * Find subcategories matching search query
	 */
	private async findMatchingSubcategories(query: string) {
		const subcategories = await this.prisma.subcategory.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
			include: {
				products: true,
			},
		});

		// Add category info and product counts
		const subcategoriesWithInfo = subcategories.map((sub) => {
			const categoryInfo = this.getCategoryInfo(sub.categoryType);
			return {
				...sub,
				categoryName: categoryInfo.name,
				categorySlug: categoryInfo.slug,
				productCount: sub.products.length,
			};
		});

		return subcategoriesWithInfo.filter(
			(sub) => sub.productCount > 0,
		);
	}

	/**
	 * Find tags matching search query
	 */
	private async findMatchingTags(
		query: string,
		options: { limit?: number } = {},
	) {
		const { limit = 5 } = options;

		const tags = await this.prisma.tag.findMany({
			where: {
				name: {
					contains: query,
					mode: "insensitive",
				},
			},
			include: {
				products: true,
			},
			take: limit,
		});

		return tags
			.map((tag) => ({
				...tag,
				productCount: tag.products.length,
			}))
			.filter((tag) => tag.productCount > 0);
	}

	/**
	 * Helper: Get category info from type
	 */
	private getCategoryInfo(type: CategoryType) {
		const categoryMap = {
			HOME: { name: "Home", slug: "home" },
			REMOTE: { name: "Remote", slug: "remote" },
			OFFICE: { name: "Office", slug: "office" },
		};
		return categoryMap[type];
	}

	/**
	 * Helper: Get product badge based on criteria
	 */
	private getProductBadge(product: any): string | undefined {
		const daysSinceCreated = Math.floor(
			(Date.now() - new Date(product.createdAt).getTime()) /
				(1000 * 60 * 60 * 24),
		);

		if (daysSinceCreated <= 7) {
			return "New";
		}

		// Could add more badge logic here (Popular, Sale, etc.)
		return undefined;
	}

	/**
	 * Get popular search queries (for future branches)
	 */
	async getPopularQueries(limit = 10) {
		return SearchAnalytics.getPopularQueries(this.prisma, limit);
	}

	/**
	 * Track search event
	 */
	async trackSearch(params: {
		query: string;
		resultCount?: number;
		userId?: string;
		searchContext?: string;
	}) {
		return SearchAnalytics.trackSearch(this.prisma, params);
	}
}
