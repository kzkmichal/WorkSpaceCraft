import { GraphQLError } from "graphql";
import type { Resolvers } from "../generated/graphql";
import { getSubcategoryService } from "@/lib/services/subcategoryService/subcategory-service-factory";

export const resolvers: Resolvers = {
	Query: {
		subcategories: async (_, { categoryType, limit }) => {
			try {
				const subcategoryService = getSubcategoryService();
				return (await subcategoryService.getSubcategories(
					categoryType,
					limit,
				)) as any;
			} catch (error) {
				console.error("Error fetching subcategories:", error);
				throw new GraphQLError("Failed to fetch subcategories", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		subcategory: async (_, { fullSlug }) => {
			try {
				const subcategoryService = getSubcategoryService();
				const subcategory =
					await subcategoryService.getSubcategoryByFullSlug(fullSlug);

				if (!subcategory) {
					throw new GraphQLError("Subcategory not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return subcategory as any;
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				if (
					error instanceof Error &&
					error.message === "Invalid subcategory path"
				) {
					throw new GraphQLError("Invalid subcategory path", {
						extensions: { code: "BAD_USER_INPUT" },
					});
				}
				console.error("Failed to fetch subcategory:", error);
				throw new GraphQLError("Failed to fetch subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		subcategoriesWithStats: async (_, { categoryType }) => {
			try {
				const subcategoryService = getSubcategoryService();
				return (await subcategoryService.getSubcategoriesWithStats(
					categoryType,
				)) as any;
			} catch (error) {
				console.error(
					"Failed to fetch subcategories with stats:",
					error,
				);
				throw new GraphQLError(
					"Failed to fetch subcategories with stats",
					{
						extensions: { code: "DATABASE_ERROR" },
					},
				);
			}
		},
	},

	Mutation: {
		createSubcategory: async (_, { input }) => {
			try {
				const subcategoryService = getSubcategoryService();
				return (await subcategoryService.createSubcategory(
					input,
				)) as any;
			} catch (error) {
				if (
					error instanceof Error &&
					error.message.includes("already exists")
				) {
					throw new GraphQLError(
						"Subcategory with this slug already exists in this category",
						{ extensions: { code: "BAD_USER_INPUT" } },
					);
				}
				console.error("Failed to create subcategory:", error);
				throw new GraphQLError("Failed to create subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		updateSubcategory: async (_, { input }) => {
			try {
				const subcategoryService = getSubcategoryService();
				return (await subcategoryService.updateSubcategory(
					input,
				)) as any;
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === "Subcategory not found") {
						throw new GraphQLError("Subcategory not found", {
							extensions: { code: "NOT_FOUND" },
						});
					}
					if (error.message.includes("already exists")) {
						throw new GraphQLError(
							"Subcategory with this slug already exists in this category",
							{ extensions: { code: "BAD_USER_INPUT" } },
						);
					}
				}
				console.error("Failed to update subcategory:", error);
				throw new GraphQLError("Failed to update subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		deleteSubcategory: async (_, { id }) => {
			try {
				const subcategoryService = getSubcategoryService();
				return await subcategoryService.deleteSubcategory(id);
			} catch (error) {
				console.error("Failed to delete subcategory:", error);
				throw new GraphQLError("Failed to delete subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},
};
