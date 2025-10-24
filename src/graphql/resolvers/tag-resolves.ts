import { GraphQLError } from "graphql";
import { User } from "next-auth";
import type { Resolvers, TagInput } from "../generated/graphql";
import { getTagService } from "@/lib/services/tagService/tag-service-factory";

export const resolvers: Resolvers = {
	Query: {
		tags: async () => {
			try {
				const tagService = getTagService();
				return (await tagService.getAllTags()) as any;
			} catch (error) {
				console.error("Failed to fetch tags:", error);
				throw new GraphQLError("Failed to fetch tags", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		popularTags: async (_, { limit }) => {
			try {
				const tagService = getTagService();
				return (await tagService.getPopularTags(limit)) as any;
			} catch (error) {
				console.error("Failed to fetch popular tags:", error);
				throw new GraphQLError("Failed to fetch popular tags", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		tag: async (_, { slug }) => {
			try {
				const tagService = getTagService();
				const tag = await tagService.getTagBySlug(slug);

				if (!tag) {
					throw new GraphQLError("Tag not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}

				return tag as any;
			} catch (error) {
				if (error instanceof GraphQLError) throw error;
				if (
					error instanceof Error &&
					error.message === "Tag not found"
				) {
					throw new GraphQLError("Tag not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}
				console.error("Failed to fetch tag:", error);
				throw new GraphQLError("Failed to fetch tag", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		productsByTag: async (_, { tagSlug, limit, offset }) => {
			try {
				const tagService = getTagService();
				return (await tagService.getProductsByTag(
					tagSlug,
					limit,
					offset,
				)) as any;
			} catch (error) {
				if (
					error instanceof Error &&
					error.message === "Tag not found"
				) {
					throw new GraphQLError("Tag not found", {
						extensions: { code: "NOT_FOUND" },
					});
				}
				console.error("Failed to fetch products by tag:", error);
				throw new GraphQLError("Failed to fetch products by tag", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},

	Mutation: {
		addTagToProduct: async (_, { productId, tagInput }, { user }) => {
			try {
				const tagService = getTagService();
				return (await tagService.addTagToProduct(
					productId,
					tagInput,
					user,
				)) as any;
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === "You must be logged in") {
						throw new GraphQLError("You must be logged in", {
							extensions: { code: "UNAUTHORIZED" },
						});
					}
					if (error.message === "Product not found") {
						throw new GraphQLError("Product not found", {
							extensions: { code: "NOT_FOUND" },
						});
					}
					if (
						error.message === "You can only modify your own products"
					) {
						throw new GraphQLError(
							"You can only modify your own products",
							{
								extensions: { code: "FORBIDDEN" },
							},
						);
					}
					if (error.message === "Tag not found") {
						throw new GraphQLError("Tag not found", {
							extensions: { code: "NOT_FOUND" },
						});
					}
				}
				console.error("Failed to add tag to product:", error);
				throw new GraphQLError("Failed to add tag to product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},

		removeTagFromProduct: async (
			_,
			{ productId, tagId },
			{ user },
		) => {
			try {
				const tagService = getTagService();
				return (await tagService.removeTagFromProduct(
					productId,
					tagId,
					user,
				)) as any;
			} catch (error) {
				if (error instanceof Error) {
					if (error.message === "You must be logged in") {
						throw new GraphQLError("You must be logged in", {
							extensions: { code: "UNAUTHORIZED" },
						});
					}
					if (error.message === "Product not found") {
						throw new GraphQLError("Product not found", {
							extensions: { code: "NOT_FOUND" },
						});
					}
					if (
						error.message === "You can only modify your own products"
					) {
						throw new GraphQLError(
							"You can only modify your own products",
							{
								extensions: { code: "FORBIDDEN" },
							},
						);
					}
					if (error.message === "Tag not found") {
						throw new GraphQLError("Tag not found", {
							extensions: { code: "NOT_FOUND" },
						});
					}
					if (
						error.message === "Tag is not assigned to this product"
					) {
						throw new GraphQLError(
							"Tag is not assigned to this product",
							{
								extensions: { code: "NOT_FOUND" },
							},
						);
					}
				}
				console.error("Failed to remove tag from product:", error);
				throw new GraphQLError("Failed to remove tag from product", {
					extensions: { code: "DATABASE_ERROR" },
				});
			}
		},
	},
};
