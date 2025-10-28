import { PrismaClient } from "@prisma/client";
import { User } from "next-auth";
import { TagInput } from "@/graphql/generated/graphql";
import { generateSlug, normalizeTagName } from "@/utils/tag-utils";
import { TagFormatter } from "./tag-formatter";

export class TagService {
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

	async getAllTags() {
		try {
			const tags = await this.prisma.tag.findMany({
				orderBy: { name: "asc" },
			});

			if (tags.length === 0 || !tags) {
				return [];
			}

			return tags.map(TagFormatter.formatTag);
		} catch (error) {
			console.error("Failed to fetch tags:", error);
			throw new Error("Failed to fetch tags");
		}
	}

	async getPopularTags(limit = 20) {
		try {
			const tagsWithCount = await this.prisma.productToTag.groupBy({
				by: ["tagId"],
				_count: {
					productId: true,
				},
			});

			if (tagsWithCount.length === 0) {
				return [];
			}

			const tagIds = tagsWithCount.map((t) => t.tagId);
			const tags = await this.prisma.tag.findMany({
				where: { id: { in: tagIds } },
			});

			const tagsWithData = tags.map((tag) => {
				const countInfo = tagsWithCount.find(
					(t) => t.tagId === tag.id,
				);
				return TagFormatter.formatTagWithCount(
					tag,
					countInfo ? countInfo._count.productId : 0,
				);
			});

			return tagsWithData
				.sort((a, b) => b.count - a.count)
				.slice(0, limit);
		} catch (error) {
			console.error("Failed to fetch popular tags:", error);
			throw new Error("Failed to fetch popular tags");
		}
	}

	async getTagBySlug(slug: string) {
		try {
			const tag = await this.prisma.tag.findUnique({
				where: { slug },
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

			if (!tag) {
				throw new Error("Tag not found");
			}

			return TagFormatter.formatTagWithProducts({
				...tag,
				products: tag.products.map((pt) => ({
					...pt,
					product: pt.product,
				})),
			});
		} catch (error) {
			console.error("Failed to fetch tag:", error);
			throw error;
		}
	}

	async getProductsByTag(tagSlug: string, limit = 10, offset = 0) {
		try {
			const tag = await this.prisma.tag.findUnique({
				where: { slug: tagSlug },
			});

			if (!tag) {
				throw new Error("Tag not found");
			}

			const productConnections =
				await this.prisma.productToTag.findMany({
					where: { tagId: tag.id },
					skip: offset,
					take: limit,
				});

			if (productConnections.length === 0) {
				return [];
			}

			const productIds = productConnections.map((pc) => pc.productId);
			const products = await this.prisma.product.findMany({
				where: { id: { in: productIds } },
				include: this.getCompleteProductInclude(),
			});

			return products.map(TagFormatter.formatProductForTag);
		} catch (error) {
			console.error("Failed to fetch products by tag:", error);
			throw error;
		}
	}

	async addTagToProduct(
		productId: string,
		tagInput: TagInput,
		user?: User,
	) {
		if (!user) {
			throw new Error("You must be logged in");
		}

		try {
			const product = await this.prisma.product.findUnique({
				where: { id: productId },
				include: { createdBy: true },
			});

			if (!product) {
				throw new Error("Product not found");
			}

			if (product.userId !== user.id && user.role !== "ADMIN") {
				throw new Error("You can only modify your own products");
			}

			const normalizedName = normalizeTagName(tagInput.name);

			let tag;

			if (tagInput.id) {
				tag = await this.prisma.tag.findUnique({
					where: { id: tagInput.id },
				});

				if (!tag) {
					throw new Error("Tag not found");
				}
			} else {
				tag = await this.prisma.tag.findFirst({
					where: { name: normalizedName },
				});

				if (!tag) {
					const slug = generateSlug(normalizedName);
					tag = await this.prisma.tag.create({
						data: {
							name: normalizedName,
							slug,
						},
					});
				}
			}

			const existingRelation =
				await this.prisma.productToTag.findUnique({
					where: {
						productId_tagId: {
							productId,
							tagId: tag.id,
						},
					},
				});

			if (!existingRelation) {
				await this.prisma.productToTag.create({
					data: {
						productId,
						tagId: tag.id,
					},
				});
			}

			const updatedProduct = await this.prisma.product.findUnique({
				where: { id: productId },
				include: this.getCompleteProductInclude(),
			});

			if (!updatedProduct) {
				throw new Error("Product not found");
			}

			return TagFormatter.formatProductForTag(updatedProduct);
		} catch (error) {
			console.error("Failed to add tag to product:", error);
			throw error;
		}
	}

	async removeTagFromProduct(
		productId: string,
		tagId: string,
		user?: User,
	) {
		if (!user) {
			throw new Error("You must be logged in");
		}

		try {
			const product = await this.prisma.product.findUnique({
				where: { id: productId },
				include: { createdBy: true },
			});

			if (!product) {
				throw new Error("Product not found");
			}

			if (product.userId !== user.id && user.role !== "ADMIN") {
				throw new Error("You can only modify your own products");
			}

			const tag = await this.prisma.tag.findUnique({
				where: { id: tagId },
			});

			if (!tag) {
				throw new Error("Tag not found");
			}

			const relation = await this.prisma.productToTag.findUnique({
				where: {
					productId_tagId: {
						productId,
						tagId,
					},
				},
			});

			if (!relation) {
				throw new Error("Tag is not assigned to this product");
			}

			await this.prisma.productToTag.delete({
				where: {
					productId_tagId: {
						productId,
						tagId,
					},
				},
			});

			const updatedProduct = await this.prisma.product.findUnique({
				where: { id: productId },
				include: this.getCompleteProductInclude(),
			});

			if (!updatedProduct) {
				throw new Error("Product not found");
			}

			return TagFormatter.formatProductForTag(updatedProduct);
		} catch (error) {
			console.error("Failed to remove tag from product:", error);
			throw error;
		}
	}
}
