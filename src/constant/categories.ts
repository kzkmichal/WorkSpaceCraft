export const categories = [
	{
		type: "HOME" as const,
		name: "Home",
		slug: "home",
		description: "Essential products for your home office setup",
		imageUrl: "/images/categories/home.jpg",
	},
	{
		type: "REMOTE" as const,
		name: "Remote",
		slug: "remote",
		description: "Tools and equipment for remote work",
		imageUrl: "/images/categories/remote.jpg",
	},
	{
		type: "OFFICE" as const,
		name: "Office",
		slug: "office",
		description: "Professional office equipment and furniture",
		imageUrl: "/images/categories/office.jpg",
	},
] as const;

export type CategoryType = (typeof categories)[number]["type"];

export const getCategoryByType = (type: CategoryType) =>
	categories.find((cat) => cat.type === type);

export const getCategoryBySlug = (slug: string) =>
	categories.find((cat) => cat.slug === slug);

export const getAllCategories = () => categories;
