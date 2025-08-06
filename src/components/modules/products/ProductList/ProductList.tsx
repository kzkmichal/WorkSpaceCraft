import { ProductCard } from "@/components/modules/Products/ProductCard";
import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductListProps = BaseProps & {
	products: ProductFieldsFragment[];
};

export const ProductList = ({
	products,
	"data-testid": testId = "product-list",
}: ProductListProps) => {
	return (
		<div
			className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
			data-testid={testId}
		>
			{products &&
				products.map((product) => (
					<ProductCard
						key={product.id}
						{...product}
						data-testid={`${testId}-product-${product.id}`}
					/>
				))}
		</div>
	);
};
