import { prisma } from "@/lib/prisma/prisma";
import { SubcategoryService } from "./subcategory-service";

export const getSubcategoryService = (): SubcategoryService => {
	let subcategoryServiceInstance: SubcategoryService | null = null;

	if (subcategoryServiceInstance === null) {
		subcategoryServiceInstance = new SubcategoryService(prisma);
	}

	return subcategoryServiceInstance;
};

export const subcategoryService = getSubcategoryService();
