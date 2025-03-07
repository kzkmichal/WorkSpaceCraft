import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Category } from "@/components/modules";
import { getCategory } from "@/hooks/getCategory";
import { getAllCategories } from "@/constant/categories";

export const revalidate = 3600;

export async function generateStaticParams() {
	const categories = getAllCategories();
	return categories.map((category) => ({ category: category.slug }));
}

type CategoryPageProps = {
	params: Promise<{
		category: string;
	}>;
};

export async function generateMetadata(
	props: CategoryPageProps,
): Promise<Metadata> {
	const params = await props.params;
	const category = await getCategory(params.category);

	if (!category) {
		return {
			title: "Category Not Found",
		};
	}

	return {
		title: category.name,
		description:
			category.description ||
			`Browse products in the ${category.name} category.`,
		openGraph: {
			title: `${category.name} | WorkSpaceCraft`,
			description:
				category.description ||
				`Browse products in the ${category.name} category.`,
			images: category.imageUrl
				? [
						{
							url: category.imageUrl,
							width: 800,
							height: 600,
							alt: category.name,
						},
					]
				: [],
		},
		// twitter: {
		// 	title: `${category.name} | WorkSpaceCraft`,
		// 	description:
		// 		category.description ||
		// 		`Browse products in the ${category.name} category.`,
		// 	images: category.imageUrl ? [category.imageUrl] : [],
		// },
	};
}

export default async function CategoryPage(props: CategoryPageProps) {
	const params = await props.params;
	const category = await getCategory(params.category);

	if (!category) {
		notFound();
	}

	return <Category {...category} />;
}
