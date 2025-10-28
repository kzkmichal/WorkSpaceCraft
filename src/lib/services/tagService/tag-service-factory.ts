import { prisma } from "@/lib/prisma/prisma";
import { TagService } from "./tag-service";

export const getTagService = (): TagService => {
	let tagServiceInstance: TagService | null = null;

	if (tagServiceInstance === null) {
		tagServiceInstance = new TagService(prisma);
	}

	return tagServiceInstance;
};

export const tagService = getTagService();
