import { GraphQLError } from "graphql";
import { CategoryType } from "@prisma/client";
import { User } from "next-auth";
import type {
	Resolvers,
	ProductsQueryInput,
} from "../generated/graphql";
import { prisma } from "@/lib/prisma/prisma";
import { generateSlug, normalizeTagName } from "@/utils/tag-utils";
import { getProductService } from "@/lib/services/productService/product-service-factory";

async function processProductTags(
	tagIds: string[] = [],
	newTags: string[] = [],
): Promise<string[]> {
	const processedTagIds = [...tagIds];

	if (newTags.length > 0) {
		const createdTagIds = await Promise.all(
			newTags.map(async (tagName: string) => {
				const normalizedName = normalizeTagName(tagName);
				const slug = generateSlug(normalizedName);

				let tag = await prisma.tag.findFirst({
					where: {
						OR: [{ name: normalizedName }, { slug }],
					},
				});

				if (!tag) {
					tag = await prisma.tag.create({
						data: { name: normalizedName, slug },
					});
				}

				return tag.id;
			}),
		);

		processedTagIds.push(...createdTagIds);
	}

	return [...new Set(processedTagIds)];
}

async function getProducts(input: ProductsQueryInput) {
	try {
		const productService = getProductService();

		const products = await productService.getProducts({
			...input,
		});

		return products;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		if (error instanceof GraphQLError) throw error;
		throw new GraphQLError("Failed to fetch products", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getProduct(id: string) {
	try {
		const productService = getProductService();

		const product = await productService.getProduct(id);

		if (!product) {
			throw new GraphQLError("Product not found", {
				extensions: { code: "NOT_FOUND" },
			});
		}

		return product;
	} catch (error) {
		if (error instanceof GraphQLError) throw error;
		console.error("Failed to fetch product:", error);
		throw new GraphQLError("Failed to fetch product", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getMyProducts(user?: { id: string }) {
	if (!user) {
		throw new GraphQLError("You must be logged in", {
			extensions: { code: "UNAUTHORIZED" },
		});
	}

	try {
		const productsService = getProductService();

		const products = await productsService.getUserProducts(user.id);

		return products;
	} catch (error) {
		console.error("Failed to fetch user products:", error);
		throw new GraphQLError("Failed to fetch user products", {
			extensions: { code: "DATABASE_ERROR" },
		});
	}
}

async function getPriceRange(
	categoryType?: CategoryType,
	subcategorySlug?: string,
) {
	const productService = getProductService();
	const priceRange = await productService.getPriceRange(
		categoryType,
		subcategorySlug,
	);
	return priceRange;
}

export const resolvers: Resolvers = {
	Query: {
		products: (_, { input }) => getProducts({ ...input }),
		product: (_, { id }) => getProduct(id),
		myProducts: (_, __, { user }) => getMyProducts(user),
		priceRangeForFilters: (_, { categoryType, subcategorySlug }) =>
			getPriceRange(categoryType, subcategorySlug),
	},
};
