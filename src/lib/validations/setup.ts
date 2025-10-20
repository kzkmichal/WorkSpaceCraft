import { z } from "zod";

export const setupSchema = z.object({
	category: z.enum(["HOME_OFFICE", "OFFICE", "REMOTE_WORK"]),
	title: z.string().min(5).max(100),
	description: z.string().max(1000).nullable().optional(),
	imageUrl: z.string().url().nullable().optional(),
	status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export const createSetupSchema = setupSchema.pick({
	category: true,
	title: true,
	description: true,
	imageUrl: true,
});

export const updateSetupSchema = setupSchema
	.pick({
		title: true,
		description: true,
		imageUrl: true,
		status: true,
	})
	.partial();

export type CreateSetupInput = z.infer<typeof createSetupSchema>;
export type UpdateSetupInput = z.infer<typeof updateSetupSchema>;
export type SetupFormValues = z.infer<typeof setupSchema>;

export const SETUP_LIMITS = {
	MIN_PRODUCTS: 1,
	MAX_PRODUCTS: 20,
	MIN_TITLE_LENGTH: 5,
	MAX_TITLE_LENGTH: 100,
	MAX_DESCRIPTION: 1000,
} as const;

export const SETUP_CATEGORIES = {
	HOME_OFFICE: "HOME_OFFICE",
	OFFICE: "OFFICE",
	REMOTE_WORK: "REMOTE_WORK",
} as const;

export const SETUP_STATUS = {
	DRAFT: "DRAFT",
	PUBLISHED: "PUBLISHED",
} as const;

export const SETUP_ERRORS = {
	UNAUTHORIZED: "You are not authorized to perform this action",
	NOT_FOUND: "Setup not found",
	ALREADY_EXISTS: "You already have a setup for this category",
	PRODUCT_NOT_FOUND: "Product not found",
	PRODUCT_DELETED: "This product is no longer available",
	PRODUCT_ALREADY_IN_SETUP: "Product already in setup",
	PRODUCT_NOT_IN_SETUP: "Product not in setup",
	MAX_PRODUCTS_REACHED: "Maximum number of products reached",
	MIN_PRODUCTS_REQUIRED: "Add at least 1 product before publishing",
	FAILED_TO_CREATE: "Failed to create setup",
	FAILED_TO_UPDATE: "Failed to update setup",
	INVALID_TITLE: "Title must be between 5 and 100 characters",
	INVALID_DESCRIPTION:
		"Description must be between 50 and 1000 characters",
} as const;
