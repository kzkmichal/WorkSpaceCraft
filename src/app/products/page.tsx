import { SearchBar } from "@/components/common/molecules/SearchBar";
import { FilterOptions } from "@/components/common/molecules/FilterOptions";
import { ProductList } from "@/components/products/ProductList";
import { getProducts } from "@/hooks/getProducts";

type ProductPageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductsPage({
	searchParams,
}: ProductPageProps) {
	const page = Number(searchParams.page) || 1;
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
