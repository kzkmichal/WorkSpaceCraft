export const generateSlug = (name: string): string => {
	return name
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/--+/g, "-")
		.trim();
};

export const normalizeTagName = (name: string): string => {
	return name.trim().toLowerCase().replace(/\s+/g, " ");
};

export const tagExists = (
	tags: Array<{ name: string; id?: string }>,
	name: string,
): boolean => {
	const normalizedName = normalizeTagName(name);
	return tags.some(
		(tag) => normalizeTagName(tag.name) === normalizedName,
	);
};
