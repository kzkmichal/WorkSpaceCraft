import { GraphQLError } from "graphql";
import type { Resolvers } from "../generated/graphql";
import {
	formatDates,
	formatProduct,
	formatSubcategory,
} from "./utils";
import { categories, getCategoryByType } from "@/constant/categories";

export const resolvers: Resolvers = {
	Query: {
		categories: async (_, __, { prisma }) => {
			try {
				const categoriesWithData = await Promise.all(
					categories.map(async (category) => {
						const [subcategories, products] = await Promise.all([
							prisma.subcategory.findMany({
								where: { categoryType: category.type },
								include: {
									products: {
										include: {
											product: {
												include: {
													createdBy: true,
													reviews: true,
													categories: true,
												},
											},
										},
									},
								},
							}),
							prisma.product.findMany({
								where: {
									categories: {
										some: {
											categoryType: category.type,
										},
									},
								},
								include: {
									createdBy: true,
									reviews: true,
									categories: true,
									subcategories: {
										include: {
											subcategory: true,
										},
									},
								},
							}),
						]);

						return {
							...category,
							subcategories: subcategories.map((subcategory) => ({
								...formatSubcategory(subcategory),
								products: subcategory.products.map((sp) => ({
									...formatProduct(sp.product),
									createdBy: formatDates(sp.product.createdBy),
									categories: sp.product.categories.map(
										(pc) => pc.categoryType,
									),
								})),
							})),
							products: products.map((product) => ({
								...formatProduct(product),
								createdBy: formatDates(product.createdBy),
								categories: product.categories.map(
									(pc) => pc.categoryType,
								),
								subcategories: product.subcategories.map((ps) =>
									formatSubcategory(ps.subcategory),
								),
							})),
						};
					}),
				);

				return categoriesWithData;
			} catch (error) {
				console.error("Failed to fetch categories data:", error);
				throw new GraphQLError("Failed to fetch categories data", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		categoryByType: async (_, { type }, { prisma }) => {
			try {
				const category = getCategoryByType(type);

				if (!category) {
					throw new GraphQLError("Category not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				const [subcategories, products] = await Promise.all([
					prisma.subcategory.findMany({
						where: { categoryType: type },
						include: {
							products: {
								include: {
									product: {
										include: {
											createdBy: true,
											reviews: true,
											categories: true,
										},
									},
								},
							},
						},
					}),
					prisma.product.findMany({
						where: {
							categories: {
								some: {
									categoryType: type,
								},
							},
						},
						include: {
							createdBy: true,
							reviews: true,
							categories: true,
							subcategories: {
								include: {
									subcategory: true,
								},
							},
						},
					}),
				]);

				return {
					...category,
					subcategories: subcategories.map((subcategory) => ({
						...formatSubcategory(subcategory),
						products: subcategory.products.map((sp) => ({
							...formatProduct(sp.product),
							createdBy: formatDates(sp.product.createdBy),
							categories: sp.product.categories.map(
								(pc) => pc.categoryType,
							),
						})),
					})),
					products: products.map((product) => ({
						...formatProduct(product),
						createdBy: formatDates(product.createdBy),
						categories: product.categories.map(
							(pc) => pc.categoryType,
						),
						subcategories: product.subcategories.map((ps) =>
							formatSubcategory(ps.subcategory),
						),
					})),
				};
			} catch (error) {
				console.error("Failed to fetch category data:", error);
				throw new GraphQLError("Failed to fetch category data", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
		categoryProducts: async (
			_,
			{ type, limit = 10, offset = 0, subcategoryId },
			{ prisma },
		) => {
			try {
				const products = await prisma.product.findMany({
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
					include: {
						subcategories: {
							include: {
								subcategory: true,
							},
						},
						categories: true,
						createdBy: true,
						reviews: true,
					},
				});

				return products.map((product) => ({
					...formatProduct(product),
					createdBy: formatDates(product.createdBy),
					subcategories: product.subcategories.map((ps) =>
						formatSubcategory(ps.subcategory),
					),
					categories: product.categories.map((pc) => pc.categoryType),
				}));
			} catch (error) {
				console.error("Failed to fetch category products:", error);
				throw new GraphQLError("Failed to fetch category products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		categorySubcategories: async (_, { type }, { prisma }) => {
			try {
				const subcategories = await prisma.subcategory.findMany({
					where: {
						categoryType: type,
					},
					include: {
						products: {
							include: {
								product: {
									include: {
										createdBy: true,
										reviews: true,
									},
								},
							},
						},
					},
				});

				return subcategories.map((subcategory) => ({
					...formatSubcategory(subcategory),
					products: subcategory.products.map((sp) => ({
						...formatProduct(sp.product),
						createdBy: formatDates(sp.product.createdBy),
					})),
				}));
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

	CategoryInfo: {
		products: async (parent, _, { prisma }) => {
			try {
				const products = await prisma.product.findMany({
					where: {
						categories: {
							some: {
								categoryType: parent.type,
							},
						},
					},
					include: {
						subcategories: {
							include: {
								subcategory: true,
							},
						},
						categories: true,
						createdBy: true,
						reviews: true,
					},
				});

				return products.map((product) => ({
					...formatProduct(product),
					createdBy: formatDates(product.createdBy),
					subcategories: product.subcategories.map((ps) =>
						formatSubcategory(ps.subcategory),
					),
				}));
			} catch (error) {
				console.error("Failed to fetch category products:", error);
				throw new GraphQLError("Failed to fetch category products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		subcategories: async (parent, _, { prisma }) => {
			try {
				const subcategories = await prisma.subcategory.findMany({
					where: {
						categoryType: parent.type,
					},
				});

				return subcategories.map(formatSubcategory);
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
