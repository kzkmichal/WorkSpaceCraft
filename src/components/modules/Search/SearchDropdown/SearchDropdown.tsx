"use client";

import React from "react";
import Image from "next/image";
import {
	Package,
	Folder,
	Tag,
	Search,
	TrendingUp,
	Loader2,
} from "lucide-react";
import type { SearchSuggestion } from "@/graphql/generated/graphql";
import { groupSuggestionsByType } from "@/utils/search-utils";
import { cn } from "@/components/utils/helpers";
import {
	SearchDropdownProps,
	SuggestionItemProps,
	SuggestionSectionProps,
} from "./types";

/**
 * Smart dropdown component for search suggestions
 */
export const SearchDropdown = ({
	suggestions,
	isLoading,
	query,
	onSelect,
	onClose,
}: SearchDropdownProps) => {
	const groupedSuggestions = groupSuggestionsByType(suggestions);

	const handleSuggestionClick = (suggestion: SearchSuggestion) => {
		onSelect(suggestion);
	};

	const handleViewAllClick = () => {
		onSelect({
			type: "SEARCH_QUERY",
			title: `View all results for "${query}"`,
			subtitle: "",
			url: `/products?search=${encodeURIComponent(query)}`,
		});
	};

	return (
		<div
			className={cn(
				"absolute left-0 right-0 top-full z-50 mt-1",
				"rounded-lg border bg-white shadow-lg",
				"max-h-96 overflow-hidden",
			)}
		>
			{isLoading && suggestions.length === 0 && (
				<div className="flex items-center justify-center p-4">
					<Loader2 className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
					<span className="text-sm text-muted-foreground">
						Searching...
					</span>
				</div>
			)}
			{!isLoading &&
				suggestions.length === 0 &&
				query.length >= 2 && (
					<div className="p-4 text-center">
						<Search className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
						<p className="text-sm text-muted-foreground">
							No results found for "
							<span className="font-medium">{query}</span>"
						</p>
						<button
							onClick={handleViewAllClick}
							className="mt-2 text-sm text-primary hover:underline"
						>
							Search all products
						</button>
					</div>
				)}

			{/* Results */}
			{suggestions.length > 0 && (
				<div className="max-h-80 overflow-y-auto">
					{/* Products Section */}
					{groupedSuggestions.products.length > 0 && (
						<SuggestionSection
							title="Products"
							suggestions={groupedSuggestions.products}
							onSelect={handleSuggestionClick}
						/>
					)}

					{/* Categories Section */}
					{groupedSuggestions.categories.length > 0 && (
						<SuggestionSection
							title="Categories"
							suggestions={groupedSuggestions.categories}
							onSelect={handleSuggestionClick}
						/>
					)}

					{/* Tags Section */}
					{groupedSuggestions.tags.length > 0 && (
						<SuggestionSection
							title="Tags"
							suggestions={groupedSuggestions.tags}
							onSelect={handleSuggestionClick}
						/>
					)}

					{/* Popular Searches */}
					{groupedSuggestions.queries.length > 0 && (
						<SuggestionSection
							title="Popular Searches"
							suggestions={groupedSuggestions.queries}
							onSelect={handleSuggestionClick}
						/>
					)}

					{/* View All Results Footer */}
					<div className="border-t p-2">
						<button
							onClick={handleViewAllClick}
							className={cn(
								"w-full rounded-md px-3 py-2 text-left text-sm",
								"transition-colors hover:bg-muted",
								"flex items-center gap-2 text-primary",
							)}
						>
							<Search className="h-4 w-4" />
							<span>
								View all results for "
								<span className="font-medium">{query}</span>"
							</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

/**
 * Section component for grouped suggestions
 */
const SuggestionSection = ({
	title,
	suggestions,
	onSelect,
}: SuggestionSectionProps) => {
	if (suggestions.length === 0) return null;

	return (
		<div className="border-b last:border-b-0">
			<div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
				{title}
			</div>
			<div>
				{suggestions.map((suggestion, index) => (
					<SuggestionItem
						key={`${suggestion.type}-${index}`}
						suggestion={suggestion}
						onClick={() => onSelect(suggestion)}
					/>
				))}
			</div>
		</div>
	);
};

/**
 * Individual suggestion item component
 */
const SuggestionItem = ({
	suggestion,
	onClick,
}: SuggestionItemProps) => {
	const getIcon = () => {
		switch (suggestion.type) {
			case "PRODUCT":
				return <Package className="h-4 w-4" />;
			case "CATEGORY":
				return <Folder className="h-4 w-4" />;
			case "TAG":
				return <Tag className="h-4 w-4" />;
			case "SEARCH_QUERY":
				return <TrendingUp className="h-4 w-4" />;
			default:
				return <Search className="h-4 w-4" />;
		}
	};

	return (
		<button
			onClick={onClick}
			className={cn(
				"w-full px-3 py-2 text-left transition-colors hover:bg-muted",
				"flex items-center gap-3",
			)}
		>
			{suggestion.type === "PRODUCT" && suggestion.imageUrl ? (
				<div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded bg-muted">
					<Image
						src={suggestion.imageUrl}
						alt={suggestion.title}
						fill
						className="object-cover"
						sizes="32px"
					/>
				</div>
			) : (
				<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
					{getIcon()}
				</div>
			)}

			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between">
					<p className="truncate text-sm font-medium">
						{suggestion.title}
					</p>
					{suggestion.badge && (
						<span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
							{suggestion.badge}
						</span>
					)}
				</div>
				{suggestion.subtitle && (
					<p className="truncate text-xs text-muted-foreground">
						{suggestion.subtitle}
					</p>
				)}
			</div>
		</button>
	);
};
