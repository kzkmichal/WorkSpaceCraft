import { notFound } from "next/navigation";
import { Category } from "@/components/modules";
import { getCategory } from "@/hooks/getCategory";

type CategoryPageProps = {
	params: Promise<{
		category: string;
	}>;
};

export default async function CategoryPage(props: CategoryPageProps) {
	const params = await props.params;
	const category = await getCategory(params.category);

	if (!category) {
		notFound();
	}

	return <Category {...category} />;
}
