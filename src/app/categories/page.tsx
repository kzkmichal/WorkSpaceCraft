import { notFound } from "next/navigation";
import { Categories } from "@/components/modules";
import { getCategories } from "@/hooks/getCategories";

export default async function CategoriesPage() {
	const categories = await getCategories();

	if (!categories || categories.length === 0) {
		notFound();
	}

	return <Categories categories={categories} />;
}
