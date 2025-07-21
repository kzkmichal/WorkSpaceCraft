import { SearchService } from "./search-service";
import { prisma } from "@/lib/prisma/prisma";

export const getSearchService = (): SearchService => {
	let searchServiceInstance: SearchService | null = null;

	if (!searchServiceInstance) {
		searchServiceInstance = new SearchService(prisma);
	}

	return searchServiceInstance;
};

export const searchService = getSearchService();
