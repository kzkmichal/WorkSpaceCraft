import { SearchBar } from "@/components/common/molecules/SearchBar";
import { FilterOptions } from "@/components/common/molecules/FilterOptions";
import { ProductList } from "@/components/products/ProductList";

export default function ProductsPage() {
	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">Products</h1>
			<SearchBar />
			<FilterOptions />
			<ProductList />
		</div>
	);
}
