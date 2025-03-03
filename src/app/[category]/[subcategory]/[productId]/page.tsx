import { notFound } from "next/navigation";
import { getProduct } from "@/hooks/getProduct";
import { getSubcategory } from "@/hooks/getSubcategory";
import { CategoryType } from "@/graphql/generated/graphql";
import { Product } from "@/components/modules/Product";

type ProductPageProps = {
	params: Promise<{
		productId: string;
		subcategory: string;
		category: string;
	}>;
};

export default async function ProductPage(props: ProductPageProps) {
	const params = await props.params;

	const { category, subcategory, productId } = params;
	const fullSlug = `${category}/${subcategory}`;

	const [productData, subcategoryData] = await Promise.all([
		getProduct(productId),
		getSubcategory(fullSlug),
	]);

	if (!productData || !subcategoryData) {
		notFound();
	}

	const isInCorrectCategory = productData.categories.includes(
		category.toUpperCase() as CategoryType,
	);

	if (!isInCorrectCategory) {
		notFound();
	}

	return <Product {...productData} />;
}
