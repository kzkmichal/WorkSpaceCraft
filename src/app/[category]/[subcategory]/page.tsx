import { notFound } from "next/navigation";
import { SubCategory } from "@/components/modules";
import { getSubcategory } from "@/hooks/getSubcategory";

type SubcategoryPageProps = {
	params: Promise<{
		category: string;
		subcategory: string;
	}>;
};

export async function generateMetadata(props: SubcategoryPageProps) {
	const params = await props.params;

	const fullSlug = `${params.category}/${params.subcategory}`;

	const subcategory = await getSubcategory(fullSlug);

	if (!subcategory) {
		return {
			title: "Subcategory Not Found",
		};
	}

	return {
		title: subcategory.name,
		description:
			subcategory.description ||
			`Browse products in the ${subcategory.name} subcategory.`,
		openGraph: {
			title: `${subcategory.name} | WorkSpaceCraft`,
			description:
				subcategory.description ||
				`Browse products in the ${subcategory.name} subcategory.`,
		},
		alternates: {
			canonical: `${params.category}/${params.subcategory}`,
		},

		// twitter: {
		// 	title: `${subcategory.name} | WorkSpaceCraft`,
		// 	description:
		// 		subcategory.description ||
		// 		`Browse products in the ${subcategory.name} subcategory.`,
		// 	images: subcategory.imageUrl ? [subcategory.imageUrl] : [],
		// },
	};
}

export default async function SubcategoryPage(
	props: SubcategoryPageProps,
) {
	const params = await props.params;

	const fullSlug = `${params.category}/${params.subcategory}`;

	const data = await getSubcategory(fullSlug);

	if (!data) {
		notFound();
	}

	return <SubCategory {...data} />;
}
