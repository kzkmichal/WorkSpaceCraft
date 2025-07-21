import { Tag } from "@prisma/client";
import { prisma } from "@/lib/prisma/prisma";
import { generateSlug, normalizeTagName } from "@/utils/tag-utils";

export type TagInput = {
	id?: string;
	name: string;
	slug?: string;
};

export async function processProductTags(
	existingTags: TagInput[] = [],
): Promise<string[]> {
	const tagIds: string[] = [];
	const newTagNames: string[] = [];

	existingTags.forEach((tag) => {
		if (tag.id) {
			tagIds.push(tag.id);
		} else if (tag.name) {
			newTagNames.push(tag.name);
		}
	});

	if (newTagNames.length > 0) {
		const createdTagIds = await Promise.all(
			newTagNames.map(async (tagName) => {
				const normalizedName = normalizeTagName(tagName);
				const slug = generateSlug(normalizedName);

				const existingTag = await prisma.tag.findFirst({
					where: {
						OR: [{ name: normalizedName }, { slug }],
					},
				});

				if (existingTag) {
					return existingTag.id;
				}

				const newTag = await prisma.tag.create({
					data: {
						name: normalizedName,
						slug,
					},
				});

				return newTag.id;
			}),
		);

		tagIds.push(...createdTagIds);
	}

	return [...new Set(tagIds)];
}

export async function getTagsByIds(ids: string[]): Promise<Tag[]> {
	if (!ids.length) return [];

	return prisma.tag.findMany({
		where: { id: { in: ids } },
	});
}
