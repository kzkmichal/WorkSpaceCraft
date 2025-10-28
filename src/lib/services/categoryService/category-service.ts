import { PrismaClient } from "@prisma/client";
import {
	categories,
	getCategoryByType,
	CategoryType,
} from "@/constant/categories";
import { CategoryFormatter } from "./category-formatter";
import { ProductFormatter } from "../productService/product-formatter";

export class CategoryService {
	constructor(private prisma: PrismaClient) {}

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

	async getCategories() {
		try {
			const categoriesWithData = await Promise.all(
				categories.map(async (category) => {
					const [subcategories, products] = await Promise.all([
						this.prisma.subcategory.findMany({
							where: { categoryType: category.type },
							include: {
								products: {
									include: {
										product: {
											include: this.getCompleteProductInclude(),
										},
									},
								},
							},
						}),
						this.prisma.product.findMany({
							where: {
								categories: {
									some: {
										categoryType: category.type,
									},
								},
							},
							include: this.getCompleteProductInclude(),
						}),
					]);

					return CategoryFormatter.formatCategory({
						...category,
						subcategories: subcategories.map((subcategory) => ({
							...subcategory,
							products: subcategory.products.map((sp) => ({
								...sp,
								product: sp.product,
							})),
						})),
						products,
					});
				}),
			);

			return categoriesWithData;
		} catch (error) {
			console.error("Failed to fetch categories data:", error);
			throw new Error("Failed to fetch categories data");
		}
	}

	async getCategoryByType(type: CategoryType) {
		try {
			const category = getCategoryByType(type);

			if (!category) {
				throw new Error("Category not found");
			}

			const [subcategories, products] = await Promise.all([
				this.prisma.subcategory.findMany({
					where: { categoryType: type },
					include: {
						products: {
							include: {
								product: {
									include: this.getCompleteProductInclude(),
								},
							},
						},
					},
				}),
				this.prisma.product.findMany({
					where: {
						categories: {
							some: {
								categoryType: type,
							},
						},
					},
					include: this.getCompleteProductInclude(),
				}),
			]);

			return CategoryFormatter.formatCategory({
				...category,
				subcategories: subcategories.map((subcategory) => ({
					...subcategory,
					products: subcategory.products.map((sp) => ({
						...sp,
						product: sp.product,
					})),
				})),
				products,
			});
		} catch (error) {
			console.error("Failed to fetch category data:", error);
			throw new Error("Failed to fetch category data");
		}
	}

	async getCategoryProducts(
		type: CategoryType,
		limit = 10,
		offset = 0,
		subcategoryId?: string,
	) {
		try {
			const products = await this.prisma.product.findMany({
				where: {
					categories: {
						some: {
							categoryType: type,
						},
					},
					...(subcategoryId && {
						subcategories: {
							some: {
								subcategoryId,
							},
						},
					}),
				},
				take: limit,
				skip: offset,
				include: this.getCompleteProductInclude(),
			});

			return products.map((product) =>
				ProductFormatter.formatProduct(product),
			);
		} catch (error) {
			console.error("Failed to fetch category products:", error);
			throw new Error("Failed to fetch category products");
		}
	}

	async getCategorySubcategories(type: CategoryType) {
		try {
			const subcategories = await this.prisma.subcategory.findMany({
				where: {
					categoryType: type,
				},
				include: {
					products: {
						include: {
							product: {
								include: this.getCompleteProductInclude(),
							},
						},
					},
				},
			});

			return subcategories.map((subcategory) =>
				CategoryFormatter.formatSubcategoryWithProducts({
					...subcategory,
					products: subcategory.products.map((sp) => ({
						...sp,
						product: sp.product,
					})),
				}),
			);
		} catch (error) {
			console.error("Failed to fetch category subcategories:", error);
			throw new Error("Failed to fetch category subcategories");
		}
	}

	async getCategoriesWithStats() {
		try {
			const categoriesData = ["HOME", "REMOTE", "OFFICE"] as const;

			const result = [];

			for (const categoryType of categoriesData) {
				const productCount = await this.prisma.product.count({
					where: {
						categories: {
							some: {
								categoryType: categoryType as CategoryType,
							},
						},
					},
				});

				result.push({
					type: categoryType as CategoryType,
					name: this.getCategoryDisplayName(categoryType),
					productCount,
					subcategories: [],
					slug: categoryType.toLowerCase(),
				});
			}
			return result;
		} catch (error) {
			console.error("Error getting categories with stats:", error);
			throw new Error("Getting categories with stats failed");
		}
	}

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
}
