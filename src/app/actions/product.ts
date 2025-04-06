"use server";

import { revalidatePath } from "next/cache";
import { CategoryType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";

export type ProductFormData = {
	title: string;
	description: string;
	price: number;
	imageUrl: string;
	originalStoreLink: string;
	categoryTypes: string[];
	subcategoryIds: string[];
};

export async function createProduct(data: ProductFormData) {
	const session = await auth();

	if (!session) {
		return { success: false, error: "You must be logged in" };
	}

	try {
		if (!data.title || !data.description || data.price <= 0) {
			return { success: false, error: "Invalid product data" };
		}

		const product = await prisma.product.create({
			data: {
				title: data.title,
				description: data.description,
				price: data.price,
				imageUrl: data.imageUrl,
				originalStoreLink: data.originalStoreLink,
				userId: session.user.id as string,
				categories: {
					create: data.categoryTypes.map((categoryType) => ({
						categoryType: categoryType as CategoryType,
					})),
				},
				subcategories:
					data.subcategoryIds.length > 0
						? {
								create: data.subcategoryIds.map((subcategoryId) => ({
									subcategoryId,
								})),
							}
						: undefined,
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
	data: ProductFormData,
) {
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
				error: "You don't have permission to edit this product",
			};
		}

		await prisma.$transaction(async (tx) => {
			await tx.productToCategory.deleteMany({
				where: { productId },
			});

			if (data.categoryTypes.length > 0) {
				await tx.productToCategory.createMany({
					data: data.categoryTypes.map((categoryType) => ({
						productId,
						categoryType: categoryType as CategoryType,
					})),
				});
			}

			await tx.productToSubcategory.deleteMany({
				where: { productId },
			});

			if (data.subcategoryIds.length > 0) {
				await tx.productToSubcategory.createMany({
					data: data.subcategoryIds.map((subcategoryId) => ({
						productId,
						subcategoryId,
					})),
				});
			}

			await tx.product.update({
				where: { id: productId },
				data: {
					title: data.title,
					description: data.description,
					price: data.price,
					imageUrl: data.imageUrl,
					originalStoreLink: data.originalStoreLink,
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

export async function deleteProduct(productId: string) {
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
