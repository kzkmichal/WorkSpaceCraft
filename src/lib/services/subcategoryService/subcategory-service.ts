import { PrismaClient } from "@prisma/client";
import { CategoryType } from "@/constant/categories";
import { SubcategoryFormatter } from "./subcategory-formatter";
import { getProductService } from "../productService/product-service-factory";

type SubcategoryUpdateData = {
	name?: string;
	description?: string | null;
	slug?: string;
	fullSlug?: string;
};

export class SubcategoryService {
	constructor(private prisma: PrismaClient) {}

	private getCompleteProductInclude() {
		return {
			createdBy: true,
			categories: true,
			images: true,
			subcategories: {
				include: {
					subcategory: true,
				},
			},
			tags: {
				include: {
					tag: true,
				},
			},
			reviews: true,
			dimensions: true,
			technicalFeatures: true,
			prosCons: true,
			userExperience: true,
		};
	}

	async getSubcategories(
		categoryType?: CategoryType,
		limit?: number,
	) {
		try {
			if (
				typeof categoryType === "string" &&
				categoryType.includes(".well-known")
			) {
				return [];
			}

			const subcategories = await this.prisma.subcategory.findMany({
				where: categoryType ? { categoryType } : {},
				...(limit && { take: limit }),
			});

			return subcategories.map(
				SubcategoryFormatter.formatSubcategory,
			);
		} catch (error) {
			console.error("Error fetching subcategories:", error);
			throw new Error("Failed to fetch subcategories");
		}
	}

	async getSubcategoryByFullSlug(fullSlug: string) {
		try {
			if (
				fullSlug.startsWith(".") ||
				fullSlug.includes("well-known") ||
				fullSlug.includes("favicon")
			) {
				console.log("Ignoring system path:", fullSlug);
				throw new Error("Invalid subcategory path");
			}

			const subcategory = await this.prisma.subcategory.findUnique({
				where: { fullSlug },
				include: {
					products: {
						include: {
							product: {
								include: this.getCompleteProductInclude(),
							},
						},
					},
				},
			});

			if (!subcategory) {
				throw new Error("Subcategory not found");
			}

			return SubcategoryFormatter.formatSubcategoryWithProducts({
				...subcategory,
				products: subcategory.products.map((sp) => ({
					...sp,
					product: sp.product,
				})),
			});
		} catch (error) {
			console.error("Failed to fetch subcategory:", error);
			throw error;
		}
	}

	async getSubcategoriesWithStats(categoryType: CategoryType) {
		const productService = getProductService();
		return await productService.getSubcategoriesWithStats(
			categoryType,
		);
	}

	async createSubcategory(input: {
		name: string;
		slug: string;
		description?: string;
		categoryType: CategoryType;
	}) {
		try {
			const { name, slug, description, categoryType } = input;
			const fullSlug = `${categoryType.toLowerCase()}/${slug}`;

			const existing = await this.prisma.subcategory.findFirst({
				where: {
					OR: [
						{ fullSlug },
						{
							AND: [{ categoryType }, { slug }],
						},
					],
				},
			});

			if (existing) {
				throw new Error(
					"Subcategory with this slug already exists in this category",
				);
			}

			const subcategory = await this.prisma.subcategory.create({
				data: {
					name,
					slug,
					fullSlug,
					description,
					categoryType,
				},
				include: {
					products: {
						include: {
							product: {
								include: this.getCompleteProductInclude(),
							},
						},
					},
				},
			});

			return SubcategoryFormatter.formatSubcategoryWithProducts({
				...subcategory,
				products: subcategory.products.map((sp) => ({
					...sp,
					product: sp.product,
				})),
			});
		} catch (error) {
			console.error("Failed to create subcategory:", error);
			throw error;
		}
	}

	async updateSubcategory(input: {
		id: string;
		name?: string;
		slug?: string;
		description?: string;
	}) {
		try {
			const { id, name, slug, description } = input;

			const existingSubcategory =
				await this.prisma.subcategory.findUnique({
					where: { id },
				});

			if (!existingSubcategory) {
				throw new Error("Subcategory not found");
			}

			let updateData: SubcategoryUpdateData = {
				...(name && { name }),
				...(description !== undefined && { description }),
			};

			if (slug) {
				const fullSlug = `${existingSubcategory.categoryType.toLowerCase()}/${slug}`;

				const slugExists = await this.prisma.subcategory.findFirst({
					where: {
						AND: [
							{ categoryType: existingSubcategory.categoryType },
							{ slug },
							{ id: { not: id } },
						],
					},
				});

				if (slugExists) {
					throw new Error(
						"Subcategory with this slug already exists in this category",
					);
				}

				updateData = {
					...updateData,
					slug,
					fullSlug,
				};
			}

			const updatedSubcategory = await this.prisma.subcategory.update(
				{
					where: { id },
					data: updateData,
					include: {
						products: {
							include: {
								product: {
									include: this.getCompleteProductInclude(),
								},
							},
						},
					},
				},
			);

			return SubcategoryFormatter.formatSubcategoryWithProducts({
				...updatedSubcategory,
				products: updatedSubcategory.products.map((sp) => ({
					...sp,
					product: sp.product,
				})),
			});
		} catch (error) {
			console.error("Failed to update subcategory:", error);
			throw error;
		}
	}

	async deleteSubcategory(id: string) {
		try {
			await this.prisma.subcategory.delete({
				where: { id },
			});
			return true;
		} catch (error) {
			console.error("Failed to delete subcategory:", error);
			throw error;
		}
	}
}
