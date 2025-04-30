import { GraphQLError } from "graphql";
import { User } from "next-auth";
import type { Resolvers, TagInput } from "../generated/graphql";
import { formatUser } from "./utils";
import { prisma } from "@/lib/prisma/prisma";
import { generateSlug, normalizeTagName } from "@/utils/tag-utils";

async function getAllTags() {
	try {
		const tags = await prisma.tag.findMany({
			orderBy: { name: "asc" },
		});

		if (tags.length === 0 || !tags) {
			return [];
		}

		return tags.map((tag) => ({
			...tag,
			createdAt: tag.createdAt.toISOString(),
			updatedAt: tag.updatedAt.toISOString(),
		}));
	} catch (error) {
		console.error("Failed to fetch tags:", error);
		throw new GraphQLError("Failed to fetch tags", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getPopularTags(limit = 20) {
	try {
		const tagsWithCount = await prisma.productToTag.groupBy({
			by: ["tagId"],
			_count: {
				productId: true,
			},
		});

		if (tagsWithCount.length === 0) {
			return [];
		}

		const tagIds = tagsWithCount.map((t) => t.tagId);
		const tags = await prisma.tag.findMany({
			where: { id: { in: tagIds } },
		});

		const tagsWithData = tags.map((tag) => {
			const countInfo = tagsWithCount.find((t) => t.tagId === tag.id);
			return {
				...tag,
				count: countInfo ? countInfo._count.productId : 0,
				createdAt: tag.createdAt.toISOString(),
				updatedAt: tag.updatedAt.toISOString(),
			};
		});

		return tagsWithData
			.sort((a, b) => b.count - a.count)
			.slice(0, limit);
	} catch (error) {
		console.error("Failed to fetch popular tags:", error);
		throw new GraphQLError("Failed to fetch popular tags", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getTagBySlug(slug: string) {
	try {
		const tag = await prisma.tag.findUnique({
			where: { slug },
			include: {
				products: {
					include: {
						product: {
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
						},
					},
				},
			},
		});

		if (!tag) {
			throw new GraphQLError("Tag not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return {
			id: tag.id,
			name: tag.name,
			slug: tag.slug,
			createdAt: tag.createdAt.toISOString(),
			updatedAt: tag.updatedAt.toISOString(),
			products: tag.products.map((pt) => {
				const product = pt.product;
				return {
					...product,
					reportReason: product.reportReason || undefined,
					createdAt: product.createdAt.toISOString(),
					updatedAt: product.updatedAt.toISOString(),
					images: product.images.map((image) => ({
						...image,
						fileName: image.fileName || undefined,
						createdAt: image.createdAt.toISOString(),
						updatedAt: image.updatedAt.toISOString(),
					})),
					createdBy: formatUser(product.createdBy),
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
			}),
		};
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch tag:", error);
		throw new GraphQLError("Failed to fetch tag", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getProductsByTag(
	tagSlug: string,
	limit = 10,
	offset = 0,
) {
	try {
		const tag = await prisma.tag.findUnique({
			where: { slug: tagSlug },
		});

		if (!tag) {
			throw new GraphQLError("Tag not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		const productConnections = await prisma.productToTag.findMany({
			where: { tagId: tag.id },
			skip: offset,
			take: limit,
		});

		if (productConnections.length === 0) {
			return [];
		}

		const productIds = productConnections.map((pc) => pc.productId);
		const products = await prisma.product.findMany({
			where: { id: { in: productIds } },
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
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
				description: ps.subcategory.description || undefined,
			})),
			tags: product.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		}));
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch products by tag:", error);
		throw new GraphQLError("Failed to fetch products by tag", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function addTagToProduct(
	productId: string,
	tagInput: TagInput,
	user?: User,
) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const product = await prisma.product.findUnique({
			where: { id: productId },
			include: { createdBy: true },
		});

		if (!product) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		if (product.userId !== user.id && user.role !== "ADMIN") {
			throw new GraphQLError(
				"You can only modify your own products",
				{
					extensions: { code: "FORBIDDEN" },
				},
			);
		}

		const normalizedName = normalizeTagName(tagInput.name);

		let tag;

		if (tagInput.id) {
			tag = await prisma.tag.findUnique({
				where: { id: tagInput.id },
			});

			if (!tag) {
				throw new GraphQLError("Tag not found", {
					extensions: { code: "NOT_FOUND" },
				});
			}
		} else {
			tag = await prisma.tag.findFirst({
				where: { name: normalizedName },
			});

			if (!tag) {
				const slug = generateSlug(normalizedName);
				tag = await prisma.tag.create({
					data: {
						name: normalizedName,
						slug,
					},
				});
			}
		}

		const existingRelation = await prisma.productToTag.findUnique({
			where: {
				productId_tagId: {
					productId,
					tagId: tag.id,
				},
			},
		});

		if (!existingRelation) {
			await prisma.productToTag.create({
				data: {
					productId,
					tagId: tag.id,
				},
			});
		}

		const updatedProduct = await prisma.product.findUnique({
			where: { id: productId },
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

		if (!updatedProduct) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return {
			...updatedProduct,
			createdAt: updatedProduct.createdAt.toISOString(),
			updatedAt: updatedProduct.updatedAt.toISOString(),
			reportReason: updatedProduct.reportReason || undefined,
			images: updatedProduct.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			createdBy: formatUser(updatedProduct.createdBy),
			categories: updatedProduct.categories.map(
				(pc) => pc.categoryType,
			),
			subcategories: updatedProduct.subcategories.map((ps) => ({
				...ps.subcategory,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
				description: ps.subcategory.description || undefined,
			})),
			tags: updatedProduct.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		};
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to add tag to product:", error);
		throw new GraphQLError("Failed to add tag to product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function removeTagFromProduct(
	productId: string,
	tagId: string,
	user?: User,
) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const product = await prisma.product.findUnique({
			where: { id: productId },
			include: { createdBy: true },
		});

		if (!product) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		if (product.userId !== user.id && user.role !== "ADMIN") {
			throw new GraphQLError(
				"You can only modify your own products",
				{
					extensions: { code: "FORBIDDEN" },
				},
			);
		}

		const tag = await prisma.tag.findUnique({
			where: { id: tagId },
		});

		if (!tag) {
			throw new GraphQLError("Tag not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		const relation = await prisma.productToTag.findUnique({
			where: {
				productId_tagId: {
					productId,
					tagId,
				},
			},
		});

		if (!relation) {
			throw new GraphQLError("Tag is not assigned to this product", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		await prisma.productToTag.delete({
			where: {
				productId_tagId: {
					productId,
					tagId,
				},
			},
		});

		const updatedProduct = await prisma.product.findUnique({
			where: { id: productId },
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

		if (!updatedProduct) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return {
			...updatedProduct,
			reportReason: updatedProduct.reportReason || undefined,
			createdAt: updatedProduct.createdAt.toISOString(),
			updatedAt: updatedProduct.updatedAt.toISOString(),
			createdBy: formatUser(updatedProduct.createdBy),
			categories: updatedProduct.categories.map(
				(pc) => pc.categoryType,
			),
			subcategories: updatedProduct.subcategories.map((ps) => ({
				...ps.subcategory,
				description: ps.subcategory.description || undefined,
				createdAt: ps.subcategory.createdAt.toISOString(),
				updatedAt: ps.subcategory.updatedAt.toISOString(),
			})),
			images: updatedProduct.images.map((image) => ({
				...image,
				fileName: image.fileName || undefined,
				createdAt: image.createdAt.toISOString(),
				updatedAt: image.updatedAt.toISOString(),
			})),
			tags: updatedProduct.tags.map((pt) => ({
				...pt.tag,
				createdAt: pt.tag.createdAt.toISOString(),
				updatedAt: pt.tag.updatedAt.toISOString(),
			})),
		};
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to remove tag from product:", error);
		throw new GraphQLError("Failed to remove tag from product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

export const resolvers: Resolvers = {
	Query: {
		tags: () => getAllTags(),
		popularTags: (_, { limit }) => getPopularTags(limit),
		tag: (_, { slug }) => getTagBySlug(slug),
		productsByTag: (_, { tagSlug, limit, offset }) =>
			getProductsByTag(tagSlug, limit, offset),
	},
	Mutation: {
		addTagToProduct: (_, { productId, tagInput }, { user }) =>
			addTagToProduct(productId, tagInput, user),
		removeTagFromProduct: (_, { productId, tagId }, { user }) =>
			removeTagFromProduct(productId, tagId, user),
	},
};
