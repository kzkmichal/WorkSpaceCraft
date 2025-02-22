import { Product } from "@/graphql/generated/graphql";

export type ProductDetailsProps = Product;

export const ProductDetails = ({
	title,
	description,
	price,
}: ProductDetailsProps) => {
	return (
		<div className="mx-auto max-w-2xl p-4">
			<h1 className="text-2xl font-bold">{title}</h1>
			<p className="text-gray-600">{description}</p>
			<div className="mt-4">
				<span className="font-bold">Price: </span>${price}
			</div>
		</div>
	);
};
