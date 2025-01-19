import { GraphQLError } from "graphql";
import type { Resolvers } from "../generated/graphql";

export const resolvers: Resolvers = {
	Query: {
		products: async (_, { limit = 10, offset = 0 }, { prisma }) => {
			try {
				const products = await prisma.product.findMany({
					take: limit ?? undefined,
					skip: offset ?? undefined,
					include: {
						createdBy: true,
					},
				});
				return products.map((product) => ({
					...product,
					createdAt: product.createdAt.toISOString(),
					updatedAt: product.updatedAt.toISOString(),
					createdBy: {
						...product.createdBy,
						createdAt: product.createdBy.createdAt.toISOString(),
						updatedAt: product.createdBy.updatedAt.toISOString(),
					},
				}));
			} catch (error) {
				console.log(error);
				throw new GraphQLError("Failed to fetch products", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		product: async (_, { id }, { prisma }) => {
			try {
				const product = await prisma.product.findUnique({
					where: {
						id,
					},
					include: {
						createdBy: true,
					},
				});

				if (!product) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return {
					...product,
					createdAt: product.createdAt.toISOString(),
					updatedAt: product.updatedAt.toISOString(),
					createdBy: {
						...product.createdBy,
						createdAt: product.createdBy.createdAt.toISOString(),
						updatedAt: product.createdBy.updatedAt.toISOString(),
					},
				};
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				throw new GraphQLError("Failed to fetch product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},

	Mutation: {
		createProduct: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to create a product",
					{ extensions: { code: "UNAUTHORIZED" } },
				);
			}

			try {
				const product = await prisma.product.create({
					data: {
						...input,
						createdBy: {
							connect: { id: user.id },
						},
					},
					include: {
						createdBy: true,
					},
				});

				return {
					...product,
					createdAt: product.createdAt.toISOString(),
					updatedAt: product.updatedAt.toISOString(),
					createdBy: {
						...product.createdBy,
						createdAt: product.createdBy.createdAt.toISOString(),
						updatedAt: product.createdBy.updatedAt.toISOString(),
					},
				};
			} catch (error) {
				console.error(error);
				throw new GraphQLError("Failed to create product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		updateProduct: async (_, { input }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to update a product",
					{ extensions: { code: "UNAUTHORIZED" } },
				);
			}

			try {
				const product = await prisma.product.findUnique({
					where: { id: input.id },
				});

				if (!product) {
					throw new GraphQLError("Product not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				if (product.userId !== user.id) {
					throw new GraphQLError(
						"You can only update your own products",
						{ extensions: { code: "FORBIDDEN" } },
					);
				}

				const updatedProduct = await prisma.product.update({
					where: { id: input.id },
					data: {
						...input,
						title: input.title ?? "",
						description: input.description || "",
						price: input.price ?? undefined,
						imageUrl: input.imageUrl || "",
						category: input.category ?? undefined,
						subcategory: input.subcategory,
					},
					include: {
						createdBy: true,
					},
				});

				return {
					...updatedProduct,
					createdAt: updatedProduct.createdAt.toISOString(),
					updatedAt: updatedProduct.updatedAt.toISOString(),
					createdBy: {
						...updatedProduct.createdBy,
						createdAt:
							updatedProduct.createdBy.createdAt.toISOString(),
						updatedAt:
							updatedProduct.createdBy.updatedAt.toISOString(),
					},
				};
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				throw new GraphQLError("Failed to update product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		deleteProduct: async (_, { id }, { user, prisma }) => {
			if (!user) {
				throw new GraphQLError(
					"You must be logged in to delete a product",
					{ extensions: { code: "UNAUTHORIZED" } },
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
						{ extensions: { code: "FORBIDDEN" } },
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
	},
};
