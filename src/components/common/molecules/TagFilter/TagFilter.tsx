"use client";

import { useState } from "react";
import {
	useSearchParams,
	useRouter,
	usePathname,
} from "next/navigation";
import { Check, X } from "lucide-react";
import { TagFilterProps } from "./types";
import { TagBadge } from "@/components/common/atoms/TagBadge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/components/utils/helpers";

export const TagFilter = ({
	availableTags,
	className,
	"data-testid": testId = "tag-filter",
	"data-cc": dataCc,
	id,
	maxHeight = "300px",
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

	return (
		<div
			id={id}
			data-testid={testId}
			data-cc={dataCc}
			className={cn("space-y-4", className)}
		>
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Tags</h3>
				{selectedTagSlugs.length > 0 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={resetFilters}
						className="h-8 px-2 text-xs"
						data-testid={`${testId}-clear-button`}
					>
						<X className="mr-1 h-3 w-3" />
						Clear
					</Button>
				)}
			</div>

			<div className="relative">
				<input
					type="text"
					placeholder="Search tags..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="border-input w-full rounded-md border px-3 py-2 text-sm"
				/>
				{searchQuery && (
					<button
						onClick={() => setSearchQuery("")}
						className="absolute right-2 top-1/2 -translate-y-1/2"
					>
						<X className="h-4 w-4 text-gray-400" />
					</button>
				)}
			</div>

			<ScrollArea className={`max-h-[${maxHeight}]`}>
				<div className="space-y-1">
					{filteredTags.map((tag) => {
						const isSelected = selectedTagSlugs.includes(tag.slug);
						return (
							<div
								key={tag.id}
								className={cn(
									"hover:bg-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5",
									isSelected && "bg-accent",
								)}
								onClick={() => toggleTag(tag.slug)}
							>
								<div className="flex items-center space-x-2">
									<TagBadge
										tag={tag}
										asLink={false}
										data-testid={`${testId}-tag-badge-${tag.slug}`}
									/>
								</div>
								{isSelected && (
									<Check className="text-primary h-4 w-4" />
								)}
							</div>
						);
					})}

					{filteredTags.length === 0 && (
						<div className="text-muted-foreground py-2 text-center text-sm">
							No tags found
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};
