import { z } from "zod";

export const productSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Title is required" })
		.max(100, {
			message: "Title cannot be longer than 100 characters",
		}),
	description: z
		.string()
		.min(1, { message: "Description is required" })
		.max(2000, {
			message: "Description cannot be longer than 2000 characters",
		}),
	price: z
		.number({ invalid_type_error: "Price must be a number" })
		.positive({ message: "Price must be greater than 0" }),
	imageUrl: z
		.string()
		.min(1, { message: "Image URL is required" })
		.url({ message: "Invalid image URL" }),
	originalStoreLink: z
		.string()
		.min(1, { message: "Original store link is required" })
		.url({ message: "Invalid URL" }),
	categoryTypes: z
		.array(z.string())
		.min(1, { message: "Select at least one category" }),
	subcategoryIds: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
