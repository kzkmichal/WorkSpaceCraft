import React from "react";
import { TagListProps } from "./types";
import { TagBadge } from "@/components/common/atoms/TagBadge";

export const TagList = ({
	tags,
	onTagClick,
	className,
	"data-testid": testId = "tag-list",
	"data-cc": dataCc,
	id,
	selectedTags = [],
}: TagListProps) => (
	<div
		id={id}
		data-testid={testId}
		data-cc={dataCc}
		className={className}
	>
		<div className="flex flex-wrap gap-2">
			{tags.map((tag, index) => {
				const tagId = typeof tag === "string" ? tag : tag.id;
				const isSelected = selectedTags.includes(tagId);

				return (
					<TagBadge
						key={tagId || index}
						tag={tag}
						onClick={onTagClick ? () => onTagClick(tag) : undefined}
						isSelected={isSelected}
						asLink={!onTagClick}
						data-testid={`${testId}-tag-${index}`}
					/>
				);
			})}
		</div>
	</div>
);
