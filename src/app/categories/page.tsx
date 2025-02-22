import { Categories } from "@/components/modules";

const data = [
	{
		name: "Category 1",
		// image: "https://via.placeholder.com/300",
		slug: "category-1",
		desc: "Category 1 description",
	},
	{
		name: "Category 2",
		// image: "https://via.placeholder.com/300",
		slug: "category-2",
		desc: "Category 2 description",
	},
	{
		name: "Category 3",
		// image: "https://via.placeholder.com/300",
		slug: "category-3",
		desc: "Category 3 description",
	},
];

export default function CategoriesPage() {
	return <Categories categories={data} />;
}
