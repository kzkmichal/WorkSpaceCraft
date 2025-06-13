"use client";

import { useState } from "react";
import { TagsListViewProps } from "./types";
import { Container, Stack } from "@/components/common/molecules";
import { Input } from "@/components/ui/input";
import { TagBadge } from "@/components/common/atoms/TagBadge";

export const TagsListView = ({
	tags,
	"data-testid": testId = "tags-list-view",
}: TagsListViewProps) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTags = searchQuery.trim()
		? tags.filter((tag) =>
				tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
			)
		: tags;

	const sortedTags = [...filteredTags].sort((a, b) =>
		a.name.localeCompare(b.name),
	);

	return (
		<Container data-testid={testId} as={"section"}>
			<Stack direction="column" spacing={6}>
				<div>
					<h1 className="text-3xl font-bold">All Tags</h1>
					<p className="mt-2 text-gray-600">
						Browse all available product tags
					</p>
				</div>

				<div>
					<Input
						placeholder="Search tags..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="max-w-md"
					/>
				</div>

				{sortedTags.length === 0 ? (
					<div className="rounded-lg border bg-gray-50 p-8 text-center">
						<h2 className="text-lg font-medium">No tags found</h2>
						<p className="mt-2 text-gray-600">
							{searchQuery.trim()
								? `No tags matching "${searchQuery}" found.`
								: "There are no tags available yet."}
						</p>
					</div>
				) : (
					<div className="flex flex-wrap gap-3">
						{sortedTags.map((tag) => (
							<TagBadge
								tag={tag}
								data-testid={`${testId}-tag-${tag.id}`}
								key={tag.id}
								variant="primary"
							/>
						))}
					</div>
				)}
			</Stack>
		</Container>
	);
};
