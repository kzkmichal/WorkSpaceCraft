import { Product } from "@/graphql/generated/graphql";
import { TagList } from "@/components/common/molecules/TagList";

export type ProductDetailsProps = Product;

export const ProductDetails = ({
	title,
	description,
	price,
	tags,
}: ProductDetailsProps) => {
	return (
		<div className="mx-auto max-w-2xl p-4">
			<h1 className="text-2xl font-bold">{title}</h1>
			{tags && tags.length > 0 && (
				<div className="mt-3">
					<TagList tags={tags} />
				</div>
			)}
			<p className="mt-4 text-gray-600">{description}</p>
			<div className="mt-4">
				<span className="font-bold">Price: </span>${price.toFixed(2)}
			</div>
		</div>
	);
};
