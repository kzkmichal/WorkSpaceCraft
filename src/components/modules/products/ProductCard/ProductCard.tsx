"use client";
import Link from "next/link";
import Image from "next/image";
import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";
import { TagList } from "@/components/common/molecules/TagList";

export type ProductCardProps = BaseProps & ProductFieldsFragment;

export const ProductCard = ({
	id,
	title,
	images,
	price = 2,
	tags,
	"data-testid": testId = "product-card",
}: ProductCardProps) => {
	const imageUrl = images?.find((image) => image?.isPrimary)?.url;

	return (
		<div
			className="relative rounded-lg border p-4 transition-shadow hover:shadow-md"
			data-testid={testId}
		>
			<Link href={`/products/${id}`} className="block">
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
			</Link>
			<h3 className="text-lg font-semibold">{title}</h3>
			<p className="text-gray-600">${price.toFixed(2)}</p>
			{tags && tags.length > 0 && (
				<div className="mt-3">
					<TagList tags={tags} />
				</div>
			)}
		</div>
	);
};
