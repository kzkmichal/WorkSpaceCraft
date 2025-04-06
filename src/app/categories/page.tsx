import { notFound } from "next/navigation";
import { Categories } from "@/components/modules";
import { getCategories } from "@/hooks/getCategories";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
	const categories = await getCategories();

	if (!categories || categories.length === 0) {
		return {
			title: "Categories Not Found",
		};
	}

	const categoryNames = categories.map((category) => category.name);

	return {
		title: "Categories",
		description: `Browse products by category: ${categoryNames.join(", ")}`,
		openGraph: {
			title: "Categories | WorkSpaceCraft",
			description: "Browse products by category.",
		},
	};
}

export default async function CategoriesPage() {
	const categories = await getCategories();

	if (!categories || categories.length === 0) {
		notFound();
	}

	return <Categories categories={categories} />;
}
