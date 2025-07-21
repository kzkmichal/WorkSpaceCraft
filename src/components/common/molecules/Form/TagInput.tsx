"use client";

import React, { useState } from "react";
import {
	useFormContext,
	Controller,
	Path,
	FieldValues,
	PathValue,
} from "react-hook-form";
import { Tag as TagIcon, X, Plus } from "lucide-react";
import { TagInputProps } from "./types";
import { Tag } from "@/components/common/atoms/TagBadge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/components/utils/helpers";
import { tagExists, normalizeTagName } from "@/utils/tag-utils";

export function TagInput<TFieldValues extends FieldValues>({
	name,
	label,
	existingTags = [],
	placeholder = "Search or add tags...",
	className,
}: TagInputProps<TFieldValues>) {
	const {
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useFormContext<TFieldValues>();

	const errorMessage = errors[name]?.message as string | undefined;

	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);

	const getCurrentTags = (): Tag[] => {
		const value = getValues(name);
		return Array.isArray(value) ? (value as Tag[]) : [];
	};

	const getFilteredTags = (): Tag[] => {
		if (!search.trim()) return [];

		const currentTags = getCurrentTags();
		const currentTagIds = currentTags
			.filter((tag): tag is Tag & { id: string } => !!tag?.id)
			.map((tag) => tag.id);

		return existingTags.filter(
			(tag) =>
				tag.name.toLowerCase().includes(search.toLowerCase()) &&
				!currentTagIds.includes(tag.id || ""),
		);
	};

	const addNewTag = () => {
		const trimmedSearch = search.trim();
		if (trimmedSearch.length < 2) return;

		const currentTags = getCurrentTags();

		if (tagExists(currentTags, trimmedSearch)) {
			setSearch("");
			return;
		}

		const existingTag = existingTags.find(
			(tag) =>
				normalizeTagName(tag.name) ===
				normalizeTagName(trimmedSearch),
		);

		if (existingTag) {
			setValue(
				name,
				[...currentTags, existingTag] as PathValue<
					TFieldValues,
					Path<TFieldValues>
				>,
				{ shouldValidate: true },
			);
		} else {
			setValue(
				name,
				[...currentTags, { name: trimmedSearch }] as PathValue<
					TFieldValues,
					Path<TFieldValues>
				>,
				{ shouldValidate: true },
			);
		}

		setSearch("");
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && search.trim().length >= 2) {
			e.preventDefault();
			addNewTag();
		}
	};

	const removeTag = (indexToRemove: number) => {
		const currentTags = getCurrentTags();
		setValue(
			name,
			currentTags.filter(
				(_, index) => index !== indexToRemove,
			) as PathValue<TFieldValues, Path<TFieldValues>>,
			{ shouldValidate: true },
		);
	};

	const filteredTags = getFilteredTags();

	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-start justify-between">
				<label className="block text-sm font-medium text-gray-700">
					{label}
				</label>
				{errorMessage && (
					<p className="text-sm text-red-600">{errorMessage}</p>
				)}
			</div>

			<Controller
				control={control}
				name={name}
				render={({ field }) => (
					<div className="space-y-2">
						{Array.isArray(field.value) && field.value.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{(field.value as (Tag | string)[]).map(
									(tag: Tag | string, index: number) => {
										const tagName =
											typeof tag === "string" ? tag : tag.name;

										return (
											<Badge
												key={
													typeof tag === "object" &&
													tag !== null &&
													"id" in tag
														? tag.id
														: `new-tag-${index}`
												}
												variant="secondary"
												className="flex items-center gap-1 px-3 py-1.5"
											>
												<TagIcon className="h-3 w-3" />
												<span>{tagName}</span>
												<X
													className="ml-1 h-3 w-3 cursor-pointer"
													onClick={() => removeTag(index)}
												/>
											</Badge>
										);
									},
								)}
							</div>
						)}
						<Command
							className={cn(
								"border-input overflow-hidden rounded-md border",
								errorMessage && "border-red-500",
							)}
						>
							<CommandInput
								placeholder={placeholder}
								value={search}
								onValueChange={setSearch}
								onKeyDown={handleKeyDown}
								onFocus={() => setOpen(true)}
								onBlur={() => setTimeout(() => setOpen(false), 100)}
							/>

							{open && (
								<CommandList>
									<ScrollArea className="max-h-40">
										<CommandEmpty>
											{search.trim().length >= 2 ? (
												<button
													type="button"
													className="hover:bg-accent flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm"
													onClick={addNewTag}
												>
													<span>
														Create &quot;{search.trim()}&quot;
													</span>
													<Plus className="h-4 w-4" />
												</button>
											) : (
												<span>
													Type at least 2 characters to search or
													create
												</span>
											)}
										</CommandEmpty>

										{filteredTags.length > 0 && (
											<CommandGroup heading="Existing Tags">
												{filteredTags.map((tag) => (
													<CommandItem
														key={tag.id}
														onSelect={() => {
															const currentTags = getCurrentTags();
															setValue(
																name,
																[...currentTags, tag] as PathValue<
																	TFieldValues,
																	Path<TFieldValues>
																>,
																{ shouldValidate: true },
															);
															setSearch("");
														}}
													>
														<TagIcon className="mr-2 h-4 w-4" />
														<span>{tag.name}</span>
													</CommandItem>
												))}
											</CommandGroup>
										)}
									</ScrollArea>
								</CommandList>
							)}
						</Command>
					</div>
				)}
			/>
		</div>
	);
}
