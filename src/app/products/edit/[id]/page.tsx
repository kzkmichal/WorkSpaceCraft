import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/modules/Products/ProductForm";
import { getProductForEdit } from "@/hooks/products/getProductForEdit";
import { getCategories } from "@/hooks/getCategories";
import { checkResourceOwnership } from "@/lib/session-helpers";

type EditProductPageProps = {
	params: Promise<{ id: string }>;
};

export const metadata = {
	title: "Edit Product - WorkSpaceCraft",
	description: "Edit your product on WorkSpaceCraft",
};

export default async function EditProductPage(
	props: EditProductPageProps,
) {
	const params = await props.params;
	const product = await getProductForEdit(params.id);

	if (!product) {
		notFound();
	}
	const { canEdit } = await checkResourceOwnership(product.userId);

	if (!canEdit) {
		redirect("/products");
	}

	const categories = await getCategories();

	const formattedCategories = categories.map((cat) => ({
		type: cat.type,
		name: cat.name,
		subcategories: (cat.subcategories || [])
			.filter((sub) => sub != null)
			.map((sub) => ({
				id: sub.id,
				name: sub.name,
				slug: sub.slug,
				fullSlug: sub.fullSlug,
				categoryType: sub.categoryType,
			})),
	}));

	return (
		<ProductForm
			product={product}
			categories={formattedCategories}
			isEditing
		/>
	);
}
