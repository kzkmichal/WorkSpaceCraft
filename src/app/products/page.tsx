import { SearchBar } from "@/components/common/molecules/SearchBar";
import { FilterOptions } from "@/components/common/molecules/FilterOptions";
import { ProductList } from "@/components/modules/products/ProductList";
import { getProducts } from "@/hooks/getProducts";

type ProductPageProps = {
	searchParams: Promise<{
		[key: string]: string | string[] | undefined;
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
}: ProductPageProps) {
	const params = await searchParams;

	const page = Number(params.page) || 1;
	const limit = 12;
	const offset = (page - 1) * limit;

	const products = await getProducts(limit, offset);

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Products</h1>
			<SearchBar />
			<FilterOptions />
			<ProductList products={products} />
		</div>
	);
}
