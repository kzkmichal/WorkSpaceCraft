import { ProductCard } from "@/components/products/ProductCard";

export type ProductListProps = {};

export const ProductList = ({}: ProductListProps) => {
	// TODO: Fetch products data
	const products = [{ id: 1 }]; // Replace with actual data

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{products.map((product) => (
				<ProductCard key={product.id} {...product} />
			))}
		</div>
	);
};
