import { GraphQLError } from "graphql";
import { CategoryType } from "@prisma/client";
import { User } from "next-auth";

import type {
	Resolvers,
	CreateProductInput,
	UpdateProductInput,
} from "../generated/graphql";
import { formatUser } from "./utils";
import { prisma } from "@/lib/prisma/prisma";
import { generateSlug, normalizeTagName } from "@/utils/tag-utils";

async function processProductTags(
	tagIds: string[] = [],
	newTags: string[] = [],
): Promise<string[]> {
	const processedTagIds = [...tagIds];

	if (newTags.length > 0) {
		const createdTagIds = await Promise.all(
			newTags.map(async (tagName: string) => {
				const normalizedName = normalizeTagName(tagName);
				const slug = generateSlug(normalizedName);

				let tag = await prisma.tag.findFirst({
					where: {
						OR: [{ name: normalizedName }, { slug }],
					},
				});

				if (!tag) {
					tag = await prisma.tag.create({
						data: { name: normalizedName, slug },
					});
				}

				return tag.id;
			}),
		);

		processedTagIds.push(...createdTagIds);
	}

	return [...new Set(processedTagIds)];
}

async function getProducts(
	limit = 10,
	offset = 0,
	categoryType?: CategoryType,
	tagSlugs?: string[],
) {
	try {
		const where: {
			categories?: { some: { categoryType: CategoryType } };
			tags?: { some: { tagId: { in: string[] } } };
		} = {};

		if (categoryType) {
			where.categories = {
				some: { categoryType },
			};
		}

		if (tagSlugs && tagSlugs?.length > 0) {
			const tags = await prisma.tag.findMany({
				where: { slug: { in: tagSlugs } },
			});

			if (!tags || tags.length === 0) {
				throw new GraphQLError("Tag not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}
			if (tags.length > 0) {
				const tagIds = tags.map((tag) => tag.id);
				where.tags = {
					some: { tagId: { in: tagIds } },
				};
			}
		}

		const products = await prisma.product.findMany({
			where,
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
				tags: {
					include: {
						tag: true,
					},
				},
				// reviews: true,
			},
		});

		return products.map((product) => ({
			...product,
			reportReason: product.reportReason || undefined,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
			createdBy: formatUser(product.createdBy),
			categories: product.categories.map((pc) => pc.categoryType),
			subcategories: product.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			images: product.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		}));
	} catch (error) {
		console.error("Failed to fetch products:", error);
		if (error instanceof GraphQLError) throw error;
		throw new GraphQLError("Failed to fetch products", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getProduct(id: string) {
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
				tags: {
					include: {
						tag: true,
					},
				},
				// reviews: true,
			},
		});

		if (!product) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return {
			...product,
			reportReason: product.reportReason || undefined,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
			createdBy: formatUser(product.createdBy),
			images: product.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			categories: product.categories.map((pc) => pc.categoryType),
			subcategories: product.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		};
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch product:", error);
		throw new GraphQLError("Failed to fetch product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getMyProducts(user?: { id: string }) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const products = await prisma.product.findMany({
			where: {
				userId: user.id,
			},
			include: {
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
				// reviews: true,
			},
			orderBy: { createdAt: "desc" },
		});

		return products.map((product) => ({
			...product,
			reportReason: product.reportReason || undefined,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
			createdBy: formatUser(product.createdBy),
			images: product.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			categories: product.categories.map((pc) => pc.categoryType),
			subcategories: product.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		}));
	} catch (error) {
		console.error("Failed to fetch user products:", error);
		throw new GraphQLError("Failed to fetch user products", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function createProduct(input: CreateProductInput, user?: User) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const {
			tagIds,
			newTags,
			categoryTypes,
			subcategoryIds,
			...productData
		} = input;

		const finalTagIds = await processProductTags(
			tagIds || [],
			newTags || [],
		);

		const product = await prisma.product.create({
			data: {
				...productData,
				createdBy: {
					connect: { id: user.id },
				},
				categories: categoryTypes?.length
					? {
							create: categoryTypes.map((categoryType) => ({
								categoryType: categoryType as CategoryType,
							})),
						}
					: undefined,
				subcategories: subcategoryIds?.length
					? {
							create: subcategoryIds.map((subcategoryId) => ({
								subcategory: {
									connect: { id: subcategoryId },
								},
							})),
						}
					: undefined,
				tags: finalTagIds.length
					? {
							create: finalTagIds.map((tagId) => ({
								tag: {
									connect: { id: tagId },
								},
							})),
						}
					: undefined,
			},
			include: {
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
			},
		});

		return {
			...product,
			reportReason: product.reportReason || undefined,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
			createdBy: formatUser(product.createdBy),
			images: product.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			categories: product.categories.map((pc) => pc.categoryType),
			subcategories: product.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		};
	} catch (error) {
		console.error("Failed to create product:", error);
		throw new GraphQLError("Failed to create product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function updateProduct(input: UpdateProductInput, user?: User) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const {
			id,
			tagIds,
			newTags,
			categoryTypes,
			subcategoryIds,
			...updateData
		} = input;

		const existingProduct = await prisma.product.findUnique({
			where: { id },
		});

		if (!existingProduct) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		if (existingProduct.userId !== user.id && user.role !== "ADMIN") {
			throw new GraphQLError(
				"You can only update your own products",
				{
					extensions: { code: "FORBIDDEN" },
				},
			);
		}

		const updatedProduct = await prisma.$transaction(async (tx) => {
			if (categoryTypes) {
				await tx.productToCategory.deleteMany({
					where: { productId: id },
				});

				if (categoryTypes.length > 0) {
					await tx.productToCategory.createMany({
						data: categoryTypes.map((categoryType) => ({
							productId: id,
							categoryType: categoryType as CategoryType,
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

			if (tagIds || newTags) {
				const finalTagIds = await processProductTags(
					tagIds || [],
					newTags || [],
				);

				await tx.productToTag.deleteMany({
					where: { productId: id },
				});

				if (finalTagIds.length > 0) {
					await tx.productToTag.createMany({
						data: finalTagIds.map((tagId) => ({
							productId: id,
							tagId,
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
				},
			});
		});

		return {
			...updatedProduct,
			reportReason: updatedProduct.reportReason || undefined,
			createdAt: updatedProduct.createdAt.toISOString(),
			updatedAt: updatedProduct.updatedAt.toISOString(),
			createdBy: formatUser(updatedProduct.createdBy),
			images: updatedProduct.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			categories: updatedProduct.categories.map(
				(pc) => pc.categoryType,
			),
			subcategories: updatedProduct.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			tags: updatedProduct.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		};
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to update updatedProduct:", error);
		throw new GraphQLError("Failed to update product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function deleteProduct(id: string, user?: User) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
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

		if (product.userId !== user.id && user.role !== "ADMIN") {
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
		console.error("Failed to delete product:", error);
		throw new GraphQLError("Failed to delete product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

export const resolvers: Resolvers = {
	Query: {
		products: (_, { limit, offset, categoryType, tagSlugs }) =>
			getProducts(limit, offset, categoryType, tagSlugs),
		product: (_, { id }) => getProduct(id),
		myProducts: (_, __, { user }) => getMyProducts(user),
	},
	Mutation: {
		createProduct: (_, { input }, { user }) =>
			createProduct(input, user),
		updateProduct: (_, { input }, { user }) =>
			updateProduct(input, user),
		deleteProduct: (_, { id }, { user }) => deleteProduct(id, user),
	},
};
