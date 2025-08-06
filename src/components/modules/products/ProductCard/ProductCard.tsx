"use client";

import { Heart, User, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@/components/common/atoms";
import { Badge } from "@/components/ui/badge";
import { TagBadge } from "@/components/common/atoms";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Stack } from "@/components/common/molecules";
import { LikeWidget } from "./Components/LikeWidget";
import { ProductCardProps } from "./types";

export const ProductCard = ({
	id,
	title,
	description,
	images,
	price,
	tags,
	rating,
	reviewCount,
	createdBy,
	positiveLikes,
	negativeLikes,
	"data-testid": testId = "product-card",
}: ProductCardProps) => {
	const [isFavorited, setIsFavorited] = useState(false);

	const { name } = createdBy;

	const imageUrl = images?.find((image) => image?.isPrimary)?.url;

	return (
		<Stack
			className="group flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
			data-testid={testId}
		>
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
				{imageUrl && (
					<Image
						src={imageUrl}
						alt={title}
						objectFit="cover"
						fill
						className="absolute h-full w-full scale-105 object-cover transition-transform duration-300 group-hover:scale-100"
						data-testid={`${testId}-image`}
					/>
				)}
				<div className="absolute inset-0 z-10 flex flex-col justify-between p-3">
					<div className="flex justify-between gap-4">
						<Badge
							variant="primary"
							className="rounded-lg px-2 py-1 text-sm font-semibold"
							data-testid={`${testId}-price`}
						>
							{`$${price}`}
						</Badge>
						<button
							onClick={() => setIsFavorited(!isFavorited)}
							className={`h-fit rounded-full p-2 shadow-sm transition-all duration-200 ${
								isFavorited
									? "bg-red-500 text-white"
									: "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
							}`}
						>
							<Heart
								className={`size-4 ${isFavorited ? "fill-current" : ""}`}
							/>
						</button>
					</div>
					<div
						className="flex items-end justify-between gap-4"
						data-testid={`${testId}-tags`}
					>
						{reviewCount && reviewCount > 0 && (
							<Badge
								variant="outline"
								className="rounded-lg px-2 py-1"
								data-testid={`${testId}-comments-badge`}
							>
								<div className="flex items-center gap-1">
									<MessageCircle className="h-3.5 w-3.5" />
									<span className="text-xs font-medium">
										{/* {comments} */}
										99
									</span>
								</div>
							</Badge>
						)}
						{positiveLikes && negativeLikes && (
							<LikeWidget
								isLiked={true}
								totalVotes={reviewCount}
								likePercentage={rating}
								data-testid={`${testId}-like-widget`}
							/>
						)}
					</div>
				</div>
			</div>

			<div className="flex w-full flex-col gap-2 p-3">
				<h3 className="line-clamp-2 text-base font-semibold">
					{title}
				</h3>
				<p
					className="line-clamp-2 text-xs text-muted-foreground"
					data-testid={`${testId}-description`}
				>
					{description}
				</p>
				{tags && tags.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{tags.slice(0, 2).map((tag, index) => (
							<TagBadge
								key={index}
								variant="secondary"
								tag={tag}
								data-testid={`${testId}-tag-${index}`}
							/>
						))}
						{tags.length > 2 && (
							<div className="relative">
								<Popover data-testid={`${testId}-popover`}>
									<PopoverTrigger
										asChild
										data-testid={`${testId}-popover-trigger`}
									>
										<Badge
											variant="secondary"
											className="cursor-pointer hover:border-secondary-foreground"
											data-testid={`${testId}-popover-badge`}
										>
											+{tags.length - 2}
										</Badge>
									</PopoverTrigger>
									<PopoverContent
										className="w-48 p-2"
										data-testid={`${testId}-popover-content`}
									>
										<div className="flex flex-wrap gap-1">
											{tags.slice(2).map((tag, index) => (
												<TagBadge
													key={index}
													variant="secondary"
													tag={tag}
													data-testid={`${testId}-popover-tag-${index}`}
												/>
											))}
										</div>
									</PopoverContent>
								</Popover>
							</div>
						)}
					</div>
				)}

				{name && (
					<div
						className="flex items-center gap-1.5 py-1 text-gray-600"
						data-testid={`${testId}-created-by`}
					>
						<User className="h-3.5 w-3.5" />
						<span className="text-xs font-medium text-gray-700">
							{name}
						</span>
					</div>
				)}
				<Link
					href={`/products/${id}`}
					variant="ghost"
					size="sm"
					className="w-full border text-xs"
					data-testid={`${testId}-button`}
				>
					View Product
				</Link>
			</div>
		</Stack>
	);
};
