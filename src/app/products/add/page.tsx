import { ProductForm } from "@/components/modules/Products/ProductForm";
import { getCategories } from "@/hooks/getCategories";
import { requireAuth } from "@/lib/session-helpers";

export const metadata = {
	title: "Add Product - WorkSpaceCraft",
	description: "Add a new product to WorkSpaceCraft",
};

export default async function AddProductPage() {
	await requireAuth();

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

	return <ProductForm categories={formattedCategories} />;
}
