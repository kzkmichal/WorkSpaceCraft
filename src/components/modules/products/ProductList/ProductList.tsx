import { ProductCard } from "@/components/modules/products/ProductCard";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductListProps = {
	products: ProductFieldsFragment[];
};

export const ProductList = ({ products }: ProductListProps) => {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{products &&
				products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
		</div>
	);
};
