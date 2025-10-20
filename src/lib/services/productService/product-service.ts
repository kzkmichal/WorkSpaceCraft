import { CategoryType } from "@/constant/categories";
import {
	ProductsQueryInput,
	SubcategoryWithStats,
} from "@/graphql/generated/graphql";
import { SearchQueryBuilder } from "@/lib/search-helpers";
import { PrismaClient } from "@prisma/client";
import { ProductFormatter } from "./product-formatter";

export class ProductService {
	constructor(private prisma: PrismaClient) {}

	private getCategoryDisplayName(categoryType: string): string {
		switch (categoryType) {
			case "HOME":
				return "Home Office";
			case "OFFICE":
				return "Office Equipment";
			case "REMOTE":
				return "Remote Work";
			default:
				return categoryType;
		}
	}

	private getCompleteProductInclude() {
		return {
			createdBy: true,
			categories: true,
			images: true,
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
			reviews: true,
			dimensions: true,
			technicalFeatures: true,
			prosCons: true,
			userExperience: true,
		};
	}

	async getProduct(id: string) {
		try {
			const product = await this.prisma.product.findUnique({
				where: { id },
				include: this.getCompleteProductInclude(),
			});

			return product ? ProductFormatter.formatProduct(product) : null;
		} catch (error) {
			console.error(`Error fetching Product ${id}:`, error);
			throw error;
		}
	}

	async getUserProducts(userId: string) {
		try {
			const products = await this.prisma.product.findMany({
				where: { userId },
				include: this.getCompleteProductInclude(),
				orderBy: {
					createdAt: "desc",
				},
			});

			return products.map((product) =>
				ProductFormatter.formatProduct(product),
			);
		} catch (error) {
			console.error(
				`Error fetching user products for ${userId}:`,
				error,
			);
			throw error;
		}
	}

	async getProducts(input: ProductsQueryInput) {
		const {
			categoryType,
			limit = 20,
			offset = 0,
			search,
			subcategorySlug,
			tagSlugs,
			sortBy,
			maxPrice,
			minPrice,
			minRating,
		} = input;

		try {
			const baseWhere = SearchQueryBuilder.buildSearchWhere({
				query: search,
				category: categoryType,
				subcategory: subcategorySlug,
				tags: tagSlugs,
			});

			const conditions = [];

			if (Object.keys(baseWhere).length > 0) {
				conditions.push(baseWhere);
			}

			const priceFilter = SearchQueryBuilder.buildPriceFilter(
				minPrice,
				maxPrice,
			);
			if (priceFilter) {
				conditions.push(priceFilter);
			}

			const ratingFilter =
				SearchQueryBuilder.buildRatingFilter(minRating);
			if (ratingFilter) {
				conditions.push(ratingFilter);
			}

			const orderBy = SearchQueryBuilder.buildSort(sortBy);

			const products = await this.prisma.product.findMany({
				where: conditions.length > 0 ? { AND: conditions } : {},
				take: limit,
				skip: offset,
				orderBy,
				include: this.getCompleteProductInclude(),
			});

			return products.map((product) =>
				ProductFormatter.formatProduct(product),
			);
		} catch (error) {
			console.error("Error getting products:", error);
			throw new Error("Getting products failed");
		}
	}
	async getCategoriesWithStats() {
		try {
			const categories = ["HOME", "REMOTE", "OFFICE"] as const;

			const result = [];

			for (const categoryType of categories) {
				const productCount = await this.prisma.product.count({
					where: {
						categories: {
							some: {
								categoryType: categoryType as CategoryType,
							},
						},
					},
				});

				const subcategories = [] as Array<SubcategoryWithStats>;

				result.push({
					type: categoryType as CategoryType,
					name: this.getCategoryDisplayName(categoryType),
					productCount,
					subcategories,
					slug: categoryType.toLowerCase(),
				});
			}
			return result;
		} catch (error) {
			console.error("Error getting categories with stats:", error);
			throw new Error("Getting categories with stats failed");
		}
	}
	async getSubcategoriesWithStats(category: CategoryType) {
		try {
			const subcategories = await this.prisma.subcategory.findMany({
				where: {
					categoryType: category,
				},
			});

			const result = [];

			for (const subcategory of subcategories) {
				const productCount = await this.prisma.product.count({
					where: {
						AND: [
							{
								categories: {
									some: {
										categoryType: category,
									},
								},
							},
							{
								subcategories: {
									some: {
										subcategoryId: subcategory.id,
									},
								},
							},
						],
					},
				});

				result.push({
					id: subcategory.id,
					name: subcategory.name,
					slug: subcategory.slug,
					productCount,
				});
			}
			return result;
		} catch (error) {
			console.error("Error getting subcategories with stats:", error);
			throw new Error("Getting subcategories with stats failed");
		}
	}
	async getPriceRange(
		categoryType?: CategoryType,
		subcategorySlug?: string,
	) {
		try {
			const whereConditions = [];

			if (categoryType) {
				whereConditions.push({
					categories: {
						some: { categoryType },
					},
				});
				if (subcategorySlug) {
					whereConditions.push({
						subcategories: {
							some: {
								subcategory: { slug: subcategorySlug },
							},
						},
					});
				}
			}

			const result = await this.prisma.product.aggregate({
				where:
					whereConditions.length > 0 ? { AND: whereConditions } : {},
				_min: {
					price: true,
				},
				_max: {
					price: true,
				},
			});

			return {
				min: result._min.price || 0,
				max: result._max.price || 0,
			};
		} catch (error) {
			console.error("Error getting price range:", error);
			throw new Error("Getting price range failed");
		}
	}
}
