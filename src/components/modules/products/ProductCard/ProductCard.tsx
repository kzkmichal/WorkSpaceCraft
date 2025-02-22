import Link from "next/link";
import Image from "next/image";

export type ProductCardProps = {
	id?: string | number;
	title?: string;
	imageUrl?: string;
	price?: number;
};

export const ProductCard = ({
	id,
	title,
	imageUrl,
	price = 2,
}: ProductCardProps) => {
	return (
		<Link href={`/products/${id}`} className="block">
			<div className="rounded-lg border p-4 transition-shadow hover:shadow-md">
				{imageUrl && title && (
					<Image
						src={imageUrl}
						alt={title}
						className="mb-4 h-48 w-full object-cover"
					/>
				)}
				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-gray-600">${price.toFixed(2)}</p>
			</div>
		</Link>
	);
};
