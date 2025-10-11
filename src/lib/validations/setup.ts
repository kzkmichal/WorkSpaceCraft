import { z } from "zod";

export const createSetupSchema = z.object({
	category: z.enum(["HOME_OFFICE", "OFFICE", "REMOTE_WORK"]),
	title: z
		.string()
		.min(5, { message: "Title is required" })
		.max(100, {
			message: "Title must be between 5 and 100 characters",
		}),
	description: z.string().min(50).max(1000).optional(),
	imageUrl: z.string().url().optional(),
});

export const updateSetupSchema = z.object({
	title: z.string().min(5).max(100).optional(),
	description: z.string().min(50).max(1000).optional().nullable(),
	imageUrl: z.string().url().optional().nullable(),
	status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export type CreateSetupInput = z.infer<typeof createSetupSchema>;
export type UpdateSetupInput = z.infer<typeof updateSetupSchema>;

export const SETUP_LIMITS = {
	MIN_PRODUCTS: 1,
	MAX_PRODUCTS: 20,
	MIN_TITLE_LENGTH: 5,
	MAX_TITLE_LENGTH: 100,
	MIN_DESCRIPTION: 50,
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
