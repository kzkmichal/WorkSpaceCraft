import { GraphQLError } from "graphql";
import type { Resolvers } from "../generated/graphql";
import { getCategoryService } from "@/lib/services/categoryService/category-service-factory";
import { getProductService } from "@/lib/services/productService/product-service-factory";

export const resolvers: Resolvers = {
	Query: {
		categories: async () => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategories();
			} catch (error) {
				console.error("Failed to fetch categories data:", error);
				throw new GraphQLError("Failed to fetch categories data", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		categoryByType: async (_, { type }) => {
			try {
				const categoryService = getCategoryService();
				const category =
					await categoryService.getCategoryByType(type);

				if (!category) {
					throw new GraphQLError("Category not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return category;
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				console.error("Failed to fetch category data:", error);
				throw new GraphQLError("Failed to fetch category data", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		categoryProducts: async (
			_,
			{ type, limit = 10, offset = 0, subcategoryId },
		) => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategoryProducts(
					type,
					limit,
					offset,
					subcategoryId,
				);
			} catch (error) {
				console.error("Failed to fetch category products:", error);
				throw new GraphQLError("Failed to fetch category products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		categorySubcategories: async (_, { type }) => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategorySubcategories(type);
			} catch (error) {
				console.error(
					"Failed to fetch category subcategories:",
					error,
				);
				throw new GraphQLError(
					"Failed to fetch category subcategories",
					{
						extensions: { code: "DATABASE_ERROR" },
					},
				);
			}
		},

		categoriesWithStats: async () => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategoriesWithStats();
			} catch (error) {
				console.error(
					"Failed to fetch categories with stats:",
					error,
				);
				throw new GraphQLError(
					"Failed to fetch categories with stats",
					{
						extensions: { code: "DATABASE_ERROR" },
					},
				);
			}
		},
	},

	CategoryInfo: {
		products: async (parent) => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategoryProducts(
					parent.type,
					undefined,
					0,
				);
			} catch (error) {
				console.error("Failed to fetch category products:", error);
				throw new GraphQLError("Failed to fetch category products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		subcategories: async (parent) => {
			try {
				const categoryService = getCategoryService();
				return await categoryService.getCategorySubcategories(
					parent.type,
				);
			} catch (error) {
				console.error(
					"Failed to fetch category subcategories:",
					error,
				);
				throw new GraphQLError(
					"Failed to fetch category subcategories",
					{
						extensions: { code: "DATABASE_ERROR" },
					},
				);
			}
		},
	},
};
