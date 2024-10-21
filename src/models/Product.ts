import { type Product } from "@prisma/client";

export type ProductInput = Omit<
	Product,
	"id" | "createdAt" | "updatedAt"
>;

export const createProduct = async (input: ProductInput) => {
	// TODO: Implement product creation logic
};

export const updateProduct = async (
	id: string,
	input: Partial<ProductInput>,
) => {
	// TODO: Implement product update logic
};

export const deleteProduct = async (id: string) => {
	// TODO: Implement product deletion logic
};

export const getProduct = async (id: string) => {
	// TODO: Implement get product logic
};

export const getProducts = async (
	filters?: Partial<ProductInput>,
) => {
	// TODO: Implement get products logic
};
