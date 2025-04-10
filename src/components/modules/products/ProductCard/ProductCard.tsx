"use client";
import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductCardProps = BaseProps & ProductFieldsFragment;

export const ProductCard = ({
	id,
	title,
	images,
	price = 2,
}: ProductCardProps) => {
	const imageUrl = images?.find((image) => image?.isPrimary)?.url;

	return (
		<Link href={`/products/${id}`} className="block">
			<div className="relative rounded-lg border p-4 transition-shadow hover:shadow-md">
				{imageUrl && (
					<div className="relative mb-4 h-48">
						<Image
							src={imageUrl}
							alt={title}
							fill
							objectFit="cover"
							className="absolute w-full"
						/>
					</div>
				)}

				<h3 className="text-lg font-semibold">{title}</h3>
				<p className="text-gray-600">${price.toFixed(2)}</p>
			</div>
		</Link>
	);
};
