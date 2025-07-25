import { prisma } from "@/lib/prisma/prisma";
import { ProductService } from "./product-service";

export const getProductService = (): ProductService => {
	let productServiceInstance: ProductService | null = null;

	if (productServiceInstance === null) {
		productServiceInstance = new ProductService(prisma);
	}

	return productServiceInstance;
};

export const productService = getProductService();
