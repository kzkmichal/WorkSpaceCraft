import { GraphQLError } from "graphql";
import type { Resolvers } from "../generated/graphql";
import {
	formatProduct,
	formatSubcategory,
	formatUser,
} from "./utils";

type SubcategoryUpdateData = {
	name?: string;
	description?: string | null;
	slug?: string;
	fullSlug?: string;
};

export const resolvers: Resolvers = {
	Query: {
		subcategories: async (_, { categoryType }, { prisma }) => {
			try {
				const subcategories = await prisma.subcategory.findMany({
					where: categoryType ? { categoryType } : undefined,
					include: {
						products: {
							include: {
								product: {
									include: {
										createdBy: true,
										categories: true,
										reviews: true,
										images: true,
									},
								},
							},
						},
					},
					orderBy: {
						name: "asc",
					},
				});

				return subcategories.map((subcategory) => ({
					...formatSubcategory(subcategory),
					products: subcategory.products.map((sp) => ({
						...formatProduct(sp.product),
						createdBy: formatUser(sp.product.createdBy),
					})),
				}));
			} catch (error) {
				console.error("Failed to fetch subcategories:", error);
				throw new GraphQLError("Failed to fetch subcategories", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		subcategory: async (_, { fullSlug }, { prisma }) => {
			try {
				const subcategory = await prisma.subcategory.findUnique({
					where: { fullSlug },
					include: {
						products: {
							include: {
								product: {
									include: {
										createdBy: true,
										categories: true,
										reviews: true,
										images: true,
									},
								},
							},
						},
					},
				});

				if (!subcategory) {
					throw new GraphQLError("Subcategory not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return {
					...formatSubcategory(subcategory),
					products: subcategory.products.map((sp) => ({
						...formatProduct(sp.product),
						createdBy: formatUser(sp.product.createdBy),
					})),
				};
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				console.error("Failed to fetch subcategory:", error);
				throw new GraphQLError("Failed to fetch subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},

	Mutation: {
		createSubcategory: async (_, { input }, { prisma }) => {
			try {
				const { name, slug, description, categoryType } = input;
				const fullSlug = `${categoryType.toLowerCase()}/${slug}`;

				const existing = await prisma.subcategory.findFirst({
					where: {
						OR: [
							{ fullSlug },
							{
								AND: [{ categoryType }, { slug }],
							},
						],
					},
				});

				if (existing) {
					throw new GraphQLError(
						"Subcategory with this slug already exists in this category",
						{ extensions: { code: "BAD_USER_INPUT" } },
					);
				}

				const subcategory = await prisma.subcategory.create({
					data: {
						name,
						slug,
						fullSlug,
						description,
						categoryType,
					},
					include: {
						products: {
							include: {
								product: {
									include: {
										createdBy: true,
										categories: true,
									},
								},
							},
						},
					},
				});

				return formatSubcategory(subcategory);
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				console.error("Failed to create subcategory:", error);
				throw new GraphQLError("Failed to create subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		updateSubcategory: async (_, { input }, { prisma }) => {
			try {
				const { id, name, slug, description } = input;

				const existingSubcategory =
					await prisma.subcategory.findUnique({
						where: { id },
					});

				if (!existingSubcategory) {
					throw new GraphQLError("Subcategory not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				let updateData: SubcategoryUpdateData = {
					...(name && { name }),
					...(description && { description }),
				};

				if (slug) {
					const fullSlug = `${existingSubcategory.categoryType.toLowerCase()}/${slug}`;

					const slugExists = await prisma.subcategory.findFirst({
						where: {
							AND: [
								{ categoryType: existingSubcategory.categoryType },
								{ slug },
								{ id: { not: id } },
							],
						},
					});

					if (slugExists) {
						throw new GraphQLError(
							"Subcategory with this slug already exists in this category",
							{ extensions: { code: "BAD_USER_INPUT" } },
						);
					}

					updateData = {
						...updateData,
						slug,
						fullSlug,
					};
				}

				const updatedSubcategory = await prisma.subcategory.update({
					where: { id },
					data: updateData,
					include: {
						products: {
							include: {
								product: {
									include: {
										createdBy: true,
										categories: true,
									},
								},
							},
						},
					},
				});

				return formatSubcategory(updatedSubcategory);
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				console.error("Failed to update subcategory:", error);
				throw new GraphQLError("Failed to update subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		deleteSubcategory: async (_, { id }, { prisma }) => {
			try {
				await prisma.subcategory.delete({
					where: { id },
				});
				return true;
			} catch (error) {
				console.error("Failed to delete subcategory:", error);
				throw new GraphQLError("Failed to delete subcategory", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},
};
