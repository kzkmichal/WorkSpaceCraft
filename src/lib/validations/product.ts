import { z } from "zod";

export const productImageSchema = z.object({
	id: z.string().optional(),
	url: z.string().url({ message: "Invalid image URL" }),
	fileName: z.string().optional(),
	isPrimary: z.boolean(),
});

export const tagSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	slug: z.string().optional(),
});

export const dimensionSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, { message: "Dimension name is required" }),
	value: z
		.string()
		.min(1, { message: "Dimension value is required" }),
	unit: z.string().optional(),
});

export const technicalFeatureSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, { message: "Feature name is required" }),
	value: z.string().min(1, { message: "Feature value is required" }),
});

export const proConSchema = z.object({
	id: z.string().optional(),
	text: z
		.string()
		.min(1, { message: "Description is required" })
		.max(500, {
			message: "Description cannot be longer than 500 characters",
		}),
});

export const userExperienceSchema = z.object({
	id: z.string().optional(),
	setupDifficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
		required_error: "Setup difficulty is required",
	}),
	assemblyRequired: z.boolean().default(false).optional(),
	toolsNeeded: z.array(z.string()).optional(),
	compatibility: z.array(z.string()).optional(),
	userManualLink: z
		.string()
		.url({ message: "Invalid URL" })
		.optional()
		.or(z.literal("")),
});

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
	originalStoreLink: z
		.string()
		.min(1, { message: "Original store link is required" })
		.url({ message: "Invalid URL" }),
	categoryTypes: z
		.array(z.string())
		.min(1, { message: "Select at least one category" }),
	subcategoryIds: z.array(z.string()).optional(),
	images: z.array(productImageSchema).min(1, {
		message: "At least one image is required",
	}),
	tags: z.array(tagSchema).optional(),
	brand: z.string().optional(),
	model: z.string().optional(),
	dimensions: z.array(dimensionSchema).optional(),
	technicalFeatures: z.array(technicalFeatureSchema).optional(),
	pros: z.array(proConSchema).optional(),
	cons: z.array(proConSchema).optional(),
	userExperience: userExperienceSchema.optional(),
});

export type TagType = z.infer<typeof tagSchema>;
export type ProductImage = z.infer<typeof productImageSchema>;
export type ProductDimension = z.infer<typeof dimensionSchema>;
export type ProductTechnicalFeature = z.infer<
	typeof technicalFeatureSchema
>;
export type ProductProCon = z.infer<typeof proConSchema>;
export type ProductUserExperience = z.infer<
	typeof userExperienceSchema
>;
export type ProductFormValues = z.infer<typeof productSchema>;

export type SetupDifficulty = "EASY" | "MEDIUM" | "HARD";

export const SETUP_DIFFICULTY_OPTIONS = [
	{
		value: "EASY" as const,
		label: "Easy - Plug and play",
		icon: "😊",
	},
	{
		value: "MEDIUM" as const,
		label: "Medium - Some setup required",
		icon: "🔧",
	},
	{
		value: "HARD" as const,
		label: "Hard - Complex installation",
		icon: "⚙️",
	},
] as const;

export const COMMON_DIMENSIONS = [
	"Width",
	"Height",
	"Depth",
	"Length",
	"Weight",
	"Diameter",
	"Thickness",
] as const;

export const COMMON_UNITS = [
	"cm",
	"mm",
	"inch",
	"ft",
	"kg",
	"g",
	"lb",
	"oz",
] as const;

export const COMMON_TECH_FEATURES = [
	"USB Ports",
	"RAM",
	"Storage",
	"Connectivity",
	"Power Consumption",
	"Max Weight Capacity",
	"Adjustability Range",
	"Materials",
	"Warranty",
	"Color Options",
] as const;

export const COMMON_TOOLS = [
	"No tools needed",
	"Screwdriver",
	"Allen key",
	"Drill",
	"Level",
	"Measuring tape",
	"Hammer",
] as const;

export const COMPATIBILITY_OPTIONS = [
	"Windows",
	"Mac",
	"Linux",
	"iOS",
	"Android",
	"Universal",
	"Gaming Consoles",
] as const;
