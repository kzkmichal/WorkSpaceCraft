import React from "react";
import Link from "next/link";
import { TagBadgeProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/utils/helpers";

export const TagBadge = ({
	tag,
	onClick,
	isSelected = false,
	variant = "default",
	className,
	"data-testid": testId = "tag-badge",
	"data-cc": dataCc,
	id,
	asLink = true,
}: TagBadgeProps) => {
	const tagName = typeof tag === "string" ? tag : tag.name;
	const tagSlug = typeof tag === "string" ? tag : tag.slug;

	const badgeContent = (
		<Badge
			id={id}
			data-testid={testId}
			data-cc={dataCc}
			variant={variant}
			className={cn(
				"hover:bg-primary/80 cursor-pointer transition-all",
				isSelected && "bg-primary-700 hover:bg-primary-800",
				className,
			)}
			onClick={onClick}
		>
			{tagName}
		</Badge>
	);

	if (asLink && !onClick) {
		return (
			<Link
				href={`/products/tags/${tagSlug}`}
				data-testid={`${testId}-link`}
			>
				{badgeContent}
			</Link>
		);
	}

	return badgeContent;
};
