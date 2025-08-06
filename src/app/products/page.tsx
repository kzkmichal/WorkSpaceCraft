import { getPopularTags } from "@/hooks/tags/getPopularTags";
import { Container } from "@/components/common/molecules";
import { ProductListLoading } from "@/components/modules/Search";
import { Suspense } from "react";
import { Products } from "@/components/modules/Products/Products";

type ProductsPageProps = {
	searchParams: Promise<{
		page?: string;
		tags?: string;
		search?: string;
		category?: string;
		subcategory?: string;
	}>;
};

export async function generateMetadata() {
	return {
		title: "Products",
		description: "Browse products",
		openGraph: {
			title: "Products | WorkSpaceCraft",
			description: "Browse products",
		},
	};
}

export default async function ProductsPage({
	searchParams,
}: ProductsPageProps) {
	const params = await searchParams;
	const popularTags = await getPopularTags(20);

	return (
		<Container data-testid="products-page">
			<h1 className="mb-6 text-3xl font-bold">Products</h1>
			<Suspense fallback={<ProductListLoading count={6} />}>
				<Products
					initialParams={params}
					initialPopularTags={popularTags}
				/>
			</Suspense>
		</Container>
	);
}
