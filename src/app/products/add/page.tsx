import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProductForm } from "@/components/modules/Products/ProductForm";
import { getCategories } from "@/hooks/getCategories";

export const metadata = {
	title: "Add Product - WorkSpaceCraft",
	description: "Add a new product to WorkSpaceCraft",
};

export default async function AddProductPage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/signin?callbackUrl=/products/add");
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

	return <ProductForm categories={formattedCategories} />;
}
