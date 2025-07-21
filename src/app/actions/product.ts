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
	} = data;

	try {
		const finalTagIds = await processProductTags(tags || []);

		const primaryImage = images.find((image) => image.isPrimary);

		if (!primaryImage) {
			images[0].isPrimary = true;
		}

		const product = await prisma.product.create({
			data: {
				title: title,
				description: description,
				price: price,
				images: {
					create: images.map((image) => ({
						url: image.url,
						fileName: image.fileName,
						isPrimary: image.isPrimary,
					})),
				},
				originalStoreLink: originalStoreLink,
				tags:
					finalTagIds.length > 0
						? {
								create: finalTagIds.map((tagId) => ({
									tag: { connect: { id: tagId } },
								})),
							}
						: undefined,
				userId: session.user.id as string,
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

	const {
		tags,
		images,
		categoryTypes,
		subcategoryIds,
		title,
		description,
		originalStoreLink,
		price,
	} = data;

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
				error: "You don't have permission to edit this product",
			};
		}

		const primaryImage = images.find((image) => image.isPrimary);

		if (!primaryImage) {
			images[0].isPrimary = true;
		}
		const finalTags = await processProductTags(tags || []);

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

			await tx.productToTag.deleteMany({
				where: { productId },
			});

			if (finalTags.length > 0) {
				await tx.productToTag.createMany({
					data: finalTags.map((tagId) => ({
						productId,
						tagId,
					})),
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

			await tx.product.update({
				where: { id: productId },
				data: {
					title: title,
					description: description,
					price: price,
					originalStoreLink: originalStoreLink,
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
) {
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
