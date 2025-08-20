"use client";

import { useState } from "react";
import {
	useSearchParams,
	useRouter,
	usePathname,
} from "next/navigation";
import { X } from "lucide-react";
import { TagFilterProps } from "./types";
import { TagBadge } from "@/components/common/atoms/TagBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/components/utils/helpers";

export const TagFilter = ({
	availableTags,
	className,
	"data-testid": testId = "tag-filter",
	"data-cc": dataCc,
	id,
	maxHeight = "200px",
}: TagFilterProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const selectedTagSlugs =
		searchParams.get("tags")?.split(",").filter(Boolean) || [];

	const [searchQuery, setSearchQuery] = useState("");

	const filteredTags = searchQuery.trim()
		? availableTags.filter((tag) =>
				tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		: availableTags;

	const toggleTag = (tagSlug: string) => {
		const params = new URLSearchParams(searchParams.toString());

		let newSelectedTags: string[];
		if (selectedTagSlugs.includes(tagSlug)) {
			newSelectedTags = selectedTagSlugs.filter(
				(slug) => slug !== tagSlug,
			);
		} else {
			newSelectedTags = [...selectedTagSlugs, tagSlug];
		}

		if (newSelectedTags.length > 0) {
			params.set("tags", newSelectedTags.join(","));
		} else {
			params.delete("tags");
		}

		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	};

	const resetFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("tags");
		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
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
