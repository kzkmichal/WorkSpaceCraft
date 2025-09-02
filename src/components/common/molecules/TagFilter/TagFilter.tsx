"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { TagFilterProps } from "./types";
import { TagBadge } from "@/components/common/atoms/TagBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/components/utils/helpers";
import { useFilterStore } from "@/stores";

export const TagFilter = ({
	availableTags,
	className,
	"data-testid": testId = "tag-filter",
	"data-cc": dataCc,
	id,
	maxHeight = "200px",
	mode = "instant",
}: TagFilterProps) => {
	const urlFilters = useFilterStore((state) => state.filters);
	const stagedFilters = useFilterStore(
		(state) => state.stagedFilters,
	);
	const updateFilterInstant = useFilterStore(
		(state) => state.updateFilterInstant,
	);
	const updateFilterStaged = useFilterStore(
		(state) => state.updateFilterStaged,
	);

	const filters = useMemo(() => {
		return mode === "instant"
			? urlFilters
			: { ...urlFilters, ...stagedFilters };
	}, [mode, urlFilters, stagedFilters]);

	const selectedTagSlugs = filters.tags || [];

	const [searchQuery, setSearchQuery] = useState("");

	const filteredTags = searchQuery.trim()
		? availableTags.filter((tag) =>
				tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		: availableTags;

	const toggleTag = (tagSlug: string) => {
		let newSelectedTags: string[];
		if (selectedTagSlugs.includes(tagSlug)) {
			newSelectedTags = selectedTagSlugs.filter(
				(slug) => slug !== tagSlug,
			);
		} else {
			newSelectedTags = [...selectedTagSlugs, tagSlug];
		}

		if (mode === "instant") {
			updateFilterInstant(
				"tags",
				newSelectedTags.length > 0 ? newSelectedTags : undefined,
			);
		} else {
			updateFilterStaged(
				"tags",
				newSelectedTags.length > 0 ? newSelectedTags : undefined,
			);
		}
	};

	const resetFilters = () => {
		if (mode === "instant") {
			updateFilterInstant("tags", undefined);
		} else {
			updateFilterStaged("tags", undefined);
		}
	};

	const inputCx =
		"w-full rounded-lg border border-border bg-accent px-3 py-2 text-sm text-accent-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/60 shadow-sm transition-all";

	return (
		<div
			id={id}
			data-testid={testId}
			className={cn("space-y-4", className)}
		>
			<div className="relative">
				<input
					type="text"
					placeholder="Search tags..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className={inputCx}
					data-testid={`${testId}-search-input`}
				/>
				{searchQuery && (
					<button
						onClick={() => setSearchQuery("")}
						className="absolute right-2 top-1/2 -translate-y-1/2"
						data-testid={`${testId}-clear-search`}
					>
						<X className="h-4 w-4 text-gray-400" />
					</button>
				)}
			</div>

			<ScrollArea
				className={cn(
					filteredTags.length > 20 ? `h-[${maxHeight}}]` : "h-auto",
					"w-full rounded-lg border",
				)}
				data-testid={`${testId}-scroll-area`}
			>
				<div
					className="flex flex-wrap gap-2 p-2"
					data-testid={`${testId}-tag-list`}
				>
					{filteredTags.map((tag) => {
						const isSelected = selectedTagSlugs.includes(tag.slug);
						return (
							<TagBadge
								key={tag.slug}
								tag={tag}
								onClick={() => toggleTag(tag.slug)}
								isSelected={isSelected}
								variant="secondary"
								asLink={false}
								data-testid={`${testId}-tag-badge-${tag.slug}`}
							/>
						);
					})}
					{filteredTags.length === 0 && (
						<div className="py-2 text-center text-sm text-muted-foreground">
							No tags found
						</div>
					)}
				</div>
				<ScrollBar orientation="vertical" />
			</ScrollArea>
			<div className="flex items-center justify-between">
				{selectedTagSlugs.length > 0 && (
					<Button
						variant="outline"
						size="sm"
						onClick={resetFilters}
						className="w-full"
						data-testid={`${testId}-clear-button`}
					>
						Clear Tags
					</Button>
				)}
			</div>
		</div>
	);
};
