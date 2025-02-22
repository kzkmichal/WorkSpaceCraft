import { notFound } from "next/navigation";
import { Category } from "@/components/modules";
import { getCategory } from "@/hooks/getCategory";

type CategoryPageProps = {
	params: {
		category: string;
	};
};

export default async function CategoryPage({
	params,
}: CategoryPageProps) {
	const category = await getCategory(params.category);

	if (!category) {
		notFound();
	}

	return <Category {...category} />;
}
