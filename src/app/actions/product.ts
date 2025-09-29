"use server";

import { revalidatePath } from "next/cache";
import { CategoryType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { ProductFormValues } from "@/lib/validations/product";
import { processProductTags } from "@/lib/tag-service";

export type ProductResult = {
	success: boolean;
	error?: string;
	productId?: string;
};

export async function createProduct(
	data: ProductFormValues,
): Promise<ProductResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: "You must be logged in" };
	}

	const {
		tags,
		images,
		categoryTypes,
		subcategoryIds,
		title,
		description,
		originalStoreLink,
		price,
		brand,
		model,
		dimensions,
		technicalFeatures,
		pros,
		cons,
		userExperience,
	} = data;

	try {
		const finalTagIds = await processProductTags(tags || []);

		const primaryImage = images.find((image) => image.isPrimary);
		if (!primaryImage && images.length > 0) {
			images[0].isPrimary = true;
		}

		const product = await prisma.product.create({
			data: {
				title,
				description,
				price,
				originalStoreLink,
				userId: session.user.id as string,
				brand,
				model: model || undefined,
				images: {
					create: images.map((image) => ({
						url: image.url,
						fileName: image.fileName,
						isPrimary: image.isPrimary,
					})),
				},
				tags:
					finalTagIds.length > 0
						? {
								create: finalTagIds.map((tagId) => ({
									tag: { connect: { id: tagId } },
								})),
							}
						: undefined,
				categories: {
					create: categoryTypes.map((categoryType) => ({
						categoryType: categoryType as CategoryType,
					})),
				},
				subcategories:
					subcategoryIds && subcategoryIds.length > 0
						? {
								create: subcategoryIds.map((subcategoryId) => ({
									subcategoryId,
								})),
							}
						: undefined,
				dimensions:
					dimensions && dimensions.length > 0
						? {
								create: dimensions.map((dim) => ({
									name: dim.name,
									value: dim.value,
									unit: dim.unit || null,
								})),
							}
						: undefined,
				technicalFeatures:
					technicalFeatures && technicalFeatures.length > 0
						? {
								create: technicalFeatures.map((feature) => ({
									name: feature.name,
									value: feature.value,
								})),
							}
						: undefined,
				prosCons:
					[...(pros || []), ...(cons || [])].length > 0
						? {
								create: [
									...(pros || []).map((pro) => ({
										text: pro.text,
										type: "PROS" as const,
									})),
									...(cons || []).map((con) => ({
										text: con.text,
										type: "CONS" as const,
									})),
								],
							}
						: undefined,
				userExperience: userExperience
					? {
							create: {
								setupDifficulty: userExperience.setupDifficulty,
								assemblyRequired: userExperience.assemblyRequired,
								toolsNeeded: userExperience.toolsNeeded || [],
								compatibility: userExperience.compatibility || [],
								userManualLink: userExperience.userManualLink || null,
							},
						}
					: undefined,
			},
			include: {
				tags: {
					include: {
						tag: true,
					},
				},
			},
		});

		revalidatePath("/profile");
		revalidatePath("/products");

		return {
			success: true,
			productId: product.id,
		};
	} catch (error) {
		console.error("Error creating product:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to create product",
		};
	}
}

export async function updateProduct(
	productId: string,
	data: ProductFormValues,
): Promise<ProductResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: "You must be logged in" };
	}

	const {
		tags,
		images,
		categoryTypes,
		subcategoryIds,
		title,
		description,
		originalStoreLink,
		price,
		brand,
		model,
		dimensions,
		technicalFeatures,
		pros,
		cons,
		userExperience,
	} = data;

	try {
		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!existingProduct) {
			return { success: false, error: "Product not found" };
		}

		if (
			existingProduct.userId !== session.user.id &&
			session.user.role !== "ADMIN"
		) {
			return {
				success: false,
				error: "You don't have permission to edit this product",
			};
		}

		const primaryImage = images.find((image) => image.isPrimary);
		if (!primaryImage && images.length > 0) {
			images[0].isPrimary = true;
		}

		const finalTagIds = await processProductTags(tags || []);

		const keepImageIds = images
			.filter((img) => img.id)
			.map((img) => img.id as string);

		await prisma.$transaction(async (tx) => {
			await tx.productToCategory.deleteMany({
				where: { productId },
			});

			if (categoryTypes.length > 0) {
				await tx.productToCategory.createMany({
					data: categoryTypes.map((categoryType) => ({
						productId,
						categoryType: categoryType as CategoryType,
					})),
				});
			}

			await tx.productToSubcategory.deleteMany({
				where: { productId },
			});

			if (subcategoryIds && subcategoryIds.length > 0) {
				await tx.productToSubcategory.createMany({
					data: subcategoryIds.map((subcategoryId) => ({
						productId,
						subcategoryId,
					})),
				});
			}

			await tx.productImage.deleteMany({
				where: {
					productId,
					id: { notIn: keepImageIds },
				},
			});

			for (const img of images.filter((img) => img.id)) {
				await tx.productImage.update({
					where: { id: img.id },
					data: {
						url: img.url,
						isPrimary: img.isPrimary,
					},
				});
			}

			await tx.productImage.createMany({
				data: images
					.filter((img) => !img.id)
					.map((img) => ({
						productId,
						url: img.url,
						fileName: img.fileName,
						isPrimary: img.isPrimary,
					})),
			});

			await tx.productToTag.deleteMany({
				where: { productId },
			});
			if (finalTagIds.length > 0) {
				await tx.productToTag.createMany({
					data: finalTagIds.map((tagId) => ({
						productId,
						tagId,
					})),
				});
			}

			await tx.productDimension.deleteMany({
				where: { productId },
			});
			if (dimensions && dimensions.length > 0) {
				await tx.productDimension.createMany({
					data: dimensions.map((dim) => ({
						productId,
						name: dim.name,
						value: dim.value,
						unit: dim.unit || null,
					})),
				});
			}

			await tx.productTechnicalFeature.deleteMany({
				where: { productId },
			});
			if (technicalFeatures && technicalFeatures.length > 0) {
				await tx.productTechnicalFeature.createMany({
					data: technicalFeatures.map((feature) => ({
						productId,
						name: feature.name,
						value: feature.value,
					})),
				});
			}

			await tx.productProCon.deleteMany({
				where: { productId },
			});
			if ([...(pros || []), ...(cons || [])].length > 0) {
				await tx.productProCon.createMany({
					data: [
						...(pros || []).map((pro) => ({
							productId,
							text: pro.text,
							type: "PROS" as const,
						})),
						...(cons || []).map((con) => ({
							productId,
							text: con.text,
							type: "CONS" as const,
						})),
					],
				});
			}

			await tx.productUserExperience.deleteMany({
				where: { productId },
			});
			if (userExperience) {
				await tx.productUserExperience.create({
					data: {
						productId,
						setupDifficulty: userExperience.setupDifficulty,
						assemblyRequired: userExperience.assemblyRequired,
						toolsNeeded: userExperience.toolsNeeded || [],
						compatibility: userExperience.compatibility || [],
						userManualLink: userExperience.userManualLink || null,
					},
				});
			}

			await tx.product.update({
				where: { id: productId },
				data: {
					title,
					description,
					price,
					originalStoreLink,
					brand,
					model: model || null,
				},
			});
		});

		revalidatePath("/profile");
		revalidatePath(`/products/${productId}`);
		revalidatePath("/products");

		return {
			success: true,
			productId,
		};
	} catch (error) {
		console.error("Error updating product:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to update product",
		};
	}
}

export async function deleteProduct(
	productId: string,
): Promise<ProductResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: "You must be logged in" };
	}

	try {
		const existingProduct = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!existingProduct) {
			return { success: false, error: "Product not found" };
		}

		if (
			existingProduct.userId !== session.user.id &&
			session.user.role !== "ADMIN"
		) {
			return {
				success: false,
				error: "You don't have permission to delete this product",
			};
		}

		await prisma.product.delete({
			where: { id: productId },
		});

		revalidatePath("/profile");
		revalidatePath("/products");

		return { success: true };
	} catch (error) {
		console.error("Error deleting product:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to delete product",
		};
	}
}

export async function reportProduct(
	productId: string,
	reason: string,
): Promise<ProductResult> {
	const session = await auth();

	if (!session) {
		return { success: false, error: "You must be logged in" };
	}

	try {
		const product = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!product) {
			return { success: false, error: "Product not found" };
		}

		await prisma.product.update({
			where: { id: productId },
			data: {
				isReported: true,
				reportCount: { increment: 1 },
				reportReason: reason,
			},
		});

		return { success: true };
	} catch (error) {
		console.error("Error reporting product:", error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: "Failed to report product",
		};
	}
}
