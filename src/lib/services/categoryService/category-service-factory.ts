import { prisma } from "@/lib/prisma/prisma";
import { CategoryService } from "./category-service";

export const getCategoryService = (): CategoryService => {
	let categoryServiceInstance: CategoryService | null = null;

	if (categoryServiceInstance === null) {
		categoryServiceInstance = new CategoryService(prisma);
	}

	return categoryServiceInstance;
};

export const categoryService = getCategoryService();
