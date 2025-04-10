import { GraphQLError } from "graphql";
import {
	Product,
	ProductImage,
	Subcategory,
	User,
} from "@prisma/client";
import type { Resolvers } from "../generated/graphql";
import { formatDates, formatSubcategory, formatUser } from "./utils";
import { CategoryType } from "@/constant/categories";

const formatProduct = (
	product: Product & {
		categories?: { categoryType: CategoryType }[];
		createdBy: User;
		subcategories?: { subcategory: Subcategory }[];
		images?: ProductImage[];
	},
) => ({
	...product,
	...formatDates(product),
	categories: product.categories?.map((pc) => pc.categoryType) || [],
	createdBy: formatUser(product.createdBy),
	subcategories:
		product.subcategories?.map((ps) =>
			formatSubcategory(ps.subcategory),
		) || [],

	reportReason: product.reportReason ?? undefined,
	moderatedBy: product.moderatedBy ?? undefined,
	moderatedAt: product.moderatedAt?.toISOString(),
	images: product.images?.map((image) => ({
		...image,
		fileName: image.fileName ?? undefined,
	})),
});

export const resolvers: Resolvers = {
	Query: {
		products: async (_, { limit = 10, offset = 0 }, { prisma }) => {
			try {
				const products = await prisma.product.findMany({
					take: limit,
					skip: offset,
					include: {
						createdBy: true,
						categories: true,
						images: true,
						subcategories: {
							include: {
								subcategory: true,
							},
						},
						reviews: true,
					},
				});

				return products.map(formatProduct);
			} catch (error) {
				console.error("Failed to fetch products:", error);
				throw new GraphQLError("Failed to fetch products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		product: async (_, { id }, { prisma }) => {
			try {
				const product = await prisma.product.findUnique({
					where: { id },
					include: {
						createdBy: true,
						categories: true,
						images: true,
						subcategories: {
							include: {
								subcategory: true,
							},
						},
						reviews: true,
					},
				});

				if (!product) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return formatProduct(product);
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				throw new GraphQLError("Failed to fetch product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
		// reportedProducts: async (
		// 	_,
		// 	{ limit = 10, offset = 0 },
		// 	{ user, prisma },
		// ) => {
		// 	if (!user || user.role !== "ADMIN") {
		// 		throw new GraphQLError("Not authorized", {
		// 			extensions: { code: "FORBIDDEN" },
		// 		});
		// 	}
		// 	const products = await prisma.product.findMany({
		// 		where: { isReported: true },
		// 		take: limit,
		// 		skip: offset,
		// 		orderBy: { reportCount: "desc" },
		// 		include: {
		// 			createdBy: true,
		// 			categories: true,
		// 			subcategories: {
		// 				include: {
		// 					subcategory: true,
		// 				},
		// 			},
		// 		},
		// 	});

		// 	return products.map(formatProduct);
		// },
		myProducts: async (_, __, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError("You must be logged in", {
					extensions: { code: "UNAUTHORIZED" },
				});
			}

			const products = await prisma.product.findMany({
				where: {
					userId: user.id,
				},
				include: {
					createdBy: true,
					categories: true,
					subcategories: {
						include: {
							subcategory: true,
						},
					},
					reviews: true,
				},
				orderBy: { createdAt: "desc" },
			});

			return products.map(formatProduct);
		},
	},

	Mutation: {
		createProduct: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to create a product",
					{
						extensions: { code: "UNAUTHORIZED" },
					},
				);
			}

			try {
				const { categoryTypes, subcategoryIds, ...productData } =
					input;

				const product = await prisma.product.create({
					data: {
						...productData,
						createdBy: {
							connect: { id: user.id },
						},
						categories: {
							create: categoryTypes.map((categoryType) => ({
								categoryType,
							})),
						},
						subcategories: {
							create: subcategoryIds?.map((subcategoryId) => ({
								subcategory: {
									connect: { id: subcategoryId },
								},
							})),
						},
					},
					include: {
						createdBy: true,
						categories: true,
						subcategories: {
							include: {
								subcategory: true,
							},
						},
						reviews: true,
					},
				});

				return formatProduct(product);
			} catch (error) {
				console.error("Failed to create product:", error);
				throw new GraphQLError("Failed to create product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		updateProduct: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to update a product",
					{
						extensions: { code: "UNAUTHORIZED" },
					},
				);
			}

			try {
				const { id, categoryTypes, subcategoryIds, ...updateData } =
					input;

				const existingProduct = await prisma.product.findUnique({
					where: { id },
				});

				if (!existingProduct) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				if (existingProduct.userId !== user.id) {
					throw new GraphQLError(
						"You can only update your own products",
						{
							extensions: { code: "FORBIDDEN" },
						},
					);
				}

				const updatedProduct = await prisma.$transaction(
					async (tx) => {
						if (categoryTypes) {
							await tx.productToCategory.deleteMany({
								where: { productId: id },
							});

							if (categoryTypes.length > 0) {
								await tx.productToCategory.createMany({
									data: categoryTypes.map((categoryType) => ({
										productId: id,
										categoryType,
									})),
								});
							}
						}

						if (subcategoryIds) {
							await tx.productToSubcategory.deleteMany({
								where: { productId: id },
							});

							if (subcategoryIds.length > 0) {
								await tx.productToSubcategory.createMany({
									data: subcategoryIds.map((subcategoryId) => ({
										productId: id,
										subcategoryId,
									})),
								});
							}
						}

						return tx.product.update({
							where: { id },
							data: updateData,
							include: {
								createdBy: true,
								categories: true,
								subcategories: {
									include: {
										subcategory: true,
									},
								},
								reviews: true,
							},
						});
					},
				);

				return formatProduct(updatedProduct);
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				console.error("Failed to update product:", error);
				throw new GraphQLError("Failed to update product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		deleteProduct: async (_, { id }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to delete a product",
					{
						extensions: { code: "UNAUTHORIZED" },
					},
				);
			}

			try {
				const product = await prisma.product.findUnique({
					where: { id },
				});

				if (!product) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				if (product.userId !== user.id) {
					throw new GraphQLError(
						"You can only delete your own products",
						{
							extensions: { code: "FORBIDDEN" },
						},
					);
				}

				await prisma.product.delete({
					where: { id },
				});

				return true;
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				throw new GraphQLError("Failed to delete product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		reportProduct: async (
			_,
			{ productId, reason },
			{ user, prisma },
		) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to report a product",
					{
						extensions: { code: "UNAUTHORIZED" },
					},
				);
			}
			try {
				const product = await prisma.product.findUnique({
					where: { id: productId },
				});

				if (!product) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				const updatedProduct = await prisma.product.update({
					where: { id: productId },
					data: {
						isReported: true,
						reportCount: { increment: 1 },
						reportReason: reason,
					},
					include: {
						createdBy: true,
						categories: true,
						subcategories: {
							include: {
								subcategory: true,
							},
						},
					},
				});

				return formatProduct(updatedProduct);
			} catch (error) {
				console.error("Failed to report product:", error);
				throw new GraphQLError("Failed to report product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		// moderateProduct: async (
		// 	_,
		// 	{ productId, action, reason },
		// 	{ user, prisma },
		// ) => {
		// 	if (!user || user.role !== "ADMIN") {
		// 		throw new GraphQLError("Not authorized", {
		// 			extensions: { code: "FORBIDDEN" },
		// 		});
		// 	}

		// 	const product = await prisma.product.findUnique({
		// 		where: { id: productId },
		// 	});

		// 	if (!product) {
		// 		throw new GraphQLError("Product not found", {
		// 			extensions: { code: "NOT_FOUND" },
		// 		});
		// 	}

		// 	let updateData;

		// 	if (action === "APPROVE") {
		// 		updateData = {
		// 			moderatedBy: user.id,
		// 			moderatedAt: new Date(),
		// 			isReported: false,
		// 			reportCount: 0,
		// 			reportReason: null,
		// 		};
		// 	} else if (action === "REMOVE") {
		// 		updateData = {
		// 			moderatedBy: user.id,
		// 			moderatedAt: new Date(),
		// 			isReported: false,
		// 			isDeleted: true,
		// 		};
		// 	}

		// 	const updatedProduct = await prisma.product.update({
		// 		where: { id: productId },
		// 		data: {
		// 			...updateData,
		// 			reportReason: reason,
		// 		},
		// 		include: {
		// 			createdBy: true,
		// 			categories: true,
		// 			subcategories: {
		// 				include: {
		// 					subcategory: true,
		// 				},
		// 			},
		// 		},
		// 	});

		// 	return formatProduct(updatedProduct);
		// },
	},
};
