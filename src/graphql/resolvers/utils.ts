import { CategoryType, Product, Subcategory } from "@prisma/client";

export const formatDates = <
	T extends { createdAt: Date; updatedAt: Date },
>(
	obj: T,
) => ({
	...obj,
	createdAt: obj.createdAt.toISOString(),
	updatedAt: obj.updatedAt.toISOString(),
});

export const formatProduct = (
	product: Product & {
		categories?: { categoryType: CategoryType }[];
	},
) => ({
	...product,
	...formatDates(product),
	categories: product.categories?.map((pc) => pc.categoryType) || [],
});

export const formatSubcategory = (subcategory: Subcategory) => ({
	...subcategory,
	...formatDates(subcategory),
	description: subcategory.description || undefined,
});
