import { notFound } from "next/navigation";
import { SubCategory } from "@/components/modules";
import { getSubcategory } from "@/hooks/getSubcategory";

type SubcategoryPageProps = {
	params: {
		category: string;
		subcategory: string;
	};
};

export default async function SubcategoryPage({
	params,
}: SubcategoryPageProps) {
	const fullSlug = `${params.category}/${params.subcategory}`;

	const data = await getSubcategory(fullSlug);

	if (!data) {
		notFound();
	}

	return <SubCategory {...data} />;
}
