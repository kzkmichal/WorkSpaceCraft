import { prisma } from "@/lib/prisma";

export const ProductResolvers = {
	Query: {
		products: async (_, { category, subcategory }) => {
			return prisma.product.findMany({
				where: {
					category,
					subcategory,
				},
			});
		},
		product: async (_, { id }) => {
			return prisma.product.findUnique({
				where: { id },
			});
		},
	},
	Mutation: {
		createProduct: async (_, { input }) => {
			return prisma.product.create({
				data: input,
			});
		},
		updateProduct: async (_, { id, input }) => {
			return prisma.product.update({
				where: { id },
				data: input,
			});
		},
		deleteProduct: async (_, { id }) => {
			await prisma.product.delete({
				where: { id },
			});
			return true;
		},
	},
};
