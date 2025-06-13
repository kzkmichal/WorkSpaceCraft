import React from "react";
import Link from "next/link";
import { TagBadgeProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/utils/helpers";

export const TagBadge = ({
	tag,
	onClick,
	isSelected = false,
	variant = "primary",
	className,
	"data-testid": testId = "tag-badge",
	"data-cc": dataCc,
	id,
	asLink = true,
}: TagBadgeProps) => {
	const tagName = typeof tag === "string" ? tag : tag.name;
	const tagSlug = typeof tag === "string" ? tag : tag.slug;

	return (
		<Badge
			id={id}
			data-testid={testId}
			data-cc={dataCc}
			variant={variant}
			isSelected={isSelected}
			className={cn("cursor-pointer transition-all", className)}
			onClick={onClick}
			url={asLink ? `/products/tags/${tagSlug}` : undefined}
		>
			{tagName}
		</Badge>
	);
};
