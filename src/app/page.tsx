import { SearchBar } from "@/components/common/molecules/SearchBar";
import { FilterOptions } from "@/components/common/molecules/FilterOptions";
import { ProductList } from "@/components/products/ProductList";

export default function HomePage() {
	// TODO: Implement product fetching logic
	// TODO: Implement search and filter functionality

	return (
		<div>
			<h1 className="mb-6 text-3xl font-bold">
				Welcome to WorkSpaceCraft
			</h1>
			<SearchBar />
			<FilterOptions />
			<ProductList />
		</div>
	);
}
