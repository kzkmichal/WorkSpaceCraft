import {
	CategoryType,
	Product,
	Subcategory,
	User,
} from "@prisma/client";

export const formatDates = <
	T extends {
		createdAt: Date;
		updatedAt: Date;
	},
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
		subcategories?: { subcategory: Subcategory }[];
	},
) => ({
	...product,
	...formatDates(product),
	categories: product.categories?.map((pc) => pc.categoryType) || [],
	subcategories:
		product.subcategories?.map((ps) =>
			formatSubcategory(ps.subcategory),
		) || [],
	reportReason: product.reportReason ?? undefined,
	moderatedBy: product.moderatedBy ?? undefined,
	moderatedAt: product.moderatedAt?.toISOString(),
});

export const formatSubcategory = (subcategory: Subcategory) => ({
	...subcategory,
	...formatDates(subcategory),
	description: subcategory.description || undefined,
});

export const formatUser = (user: User) => ({
	...user,
	...formatDates(user),
	emailVerified: user.emailVerified?.toISOString() ?? undefined,
	image: user.image ?? undefined,
	role: user.role as "USER" | "ADMIN",
	bio: user.bio ?? undefined,
});
