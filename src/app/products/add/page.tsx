import { redirect } from "next/navigation";
import { CategoryType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { ProductForm } from "@/components/modules/products/ProductForm";

export const metadata = {
	title: "Add Product - WorkSpaceCraft",
	description: "Add a new product to WorkSpaceCraft",
};

export default async function AddProductPage() {
	const session = await auth();

	if (!session) {
		redirect("/auth/signin?callbackUrl=/products/add");
	}

	const subcategories = await prisma.subcategory.findMany({
		select: {
			id: true,
			name: true,
			slug: true,
			fullSlug: true,
			categoryType: true,
		},
		orderBy: [{ categoryType: "asc" }, { name: "asc" }],
	});

	const categoriesMap = subcategories.reduce(
		(acc, subcategory) => {
			const categoryType = subcategory.categoryType;

			if (!acc[categoryType]) {
				acc[categoryType] = {
					type: categoryType,
					name:
						categoryType.charAt(0) +
						categoryType.slice(1).toLowerCase(),
					subcategories: [],
				};
			}

			acc[categoryType].subcategories.push(subcategory);
			return acc;
		},
		{} as Record<
			string,
			{
				type: CategoryType;
				name: string;
				subcategories: typeof subcategories;
			}
		>,
	);

	const formattedCategories = Object.values(categoriesMap);

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold">Add New Product</h1>
			<ProductForm categories={formattedCategories} />
		</div>
	);
}
