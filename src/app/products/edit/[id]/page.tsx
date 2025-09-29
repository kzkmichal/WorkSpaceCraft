import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProductForm } from "@/components/modules/Products/ProductForm";
import { getProductForEdit } from "@/hooks/products/getProductForEdit";
import { getCategories } from "@/hooks/getCategories";

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
	const session = await auth();

	if (!session) {
		redirect(`/auth/signin?callbackUrl=/products/edit/${params.id}`);
	}

	const product = await getProductForEdit(params.id);

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

	if (!product) {
		notFound();
	}

	if (
		product.userId !== session.user.id &&
		session.user.role !== "ADMIN"
	) {
		redirect("/products");
	}

	return (
		<ProductForm
			product={product}
			categories={formattedCategories}
			isEditing
		/>
	);
}
