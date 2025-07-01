import { FilterOptions } from "@/components/common/molecules/FilterOptions";
import { ProductList } from "@/components/modules/products/ProductList";
import { getProducts } from "@/hooks/getProducts";
import { getPopularTags } from "@/hooks/getPopularTags";
import { FilterSidebar } from "@/components/modules/products/FilterSidebar";
import { Container } from "@/components/common/molecules";
import { ProductsSearch } from "@/components/modules/Search";

type ProductsPageProps = {
	searchParams: Promise<{
		page?: string;
		tags?: string;
		search?: string;
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

	const page = Number(params.page) || 1;
	const limit = 12;
	const offset = (page - 1) * limit;

	const tagSlugs = params.tags ? params.tags.split(",") : undefined;
	const searchQuery = params.search || "";
	const products = await getProducts(limit, offset, tagSlugs);
	const popularTags = await getPopularTags(20);

	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<Container>
			<h1 className="mb-6 text-3xl font-bold">Products</h1>
			<ProductsSearch />
			<FilterOptions />
			<FilterSidebar popularTags={popularTags} />
			<ProductList products={filteredProducts} />
		</Container>
	);
}
