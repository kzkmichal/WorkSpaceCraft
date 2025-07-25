import { notFound, redirect } from "next/navigation";
import { CategoryType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma/prisma";
import { ProductForm } from "@/components/modules/Products/ProductForm";

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

	const product = await prisma.product.findUnique({
		where: { id: params.id },
		include: {
			categories: true,
			subcategories: true,
			images: true,
			tags: {
				include: {
					tag: true,
				},
			},
		},
	});

	if (!product) {
		notFound();
	}

	if (
		product.userId !== session.user.id &&
		session.user.role !== "ADMIN"
	) {
		redirect("/products");
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

	const formattedProduct = {
		id: product.id,
		title: product.title,
		description: product.description,
		price: product.price,
		originalStoreLink: product.originalStoreLink,
		images: product.images.map((image) => ({
			id: image.id,
			url: image.url,
			fileName: image.fileName || "",
			isPrimary: image.isPrimary,
		})),
		tags: product.tags.map((tag) => ({
			id: tag.tag.id,
			name: tag.tag.name,
			slug: tag.tag.slug,
		})),
		categoryTypes: product.categories.map((pc) => pc.categoryType),
		subcategoryIds: product.subcategories.map(
			(ps) => ps.subcategoryId,
		),
	};

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold">Edit Product</h1>
			<ProductForm
				categories={formattedCategories}
				product={formattedProduct}
				isEditing={true}
			/>
		</div>
	);
}
