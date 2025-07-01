"use client";

import React from "react";
import { Search, AlertCircle, Loader2, Package } from "lucide-react";
import { cn } from "@/components/utils/helpers";
import {
	ProductListLoadingProps,
	SearchEmptyProps,
	SearchErrorProps,
	SearchLoadingProps,
	SuggestionListLoadingProps,
} from "./types";

/**
 * Loading state for search operations
 */
export const SearchLoading = ({
	className,
	message = "Searching...",
}: SearchLoadingProps) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center p-8",
				className,
			)}
		>
			<div className="text-center">
				<Loader2 className="mx-auto mb-3 h-8 w-8 animate-spin text-muted-foreground" />
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
};

/**
 * Empty state when no search results found
 */
export const SearchEmpty = ({
	className,
	query,
	title,
	description,
	action,
}: SearchEmptyProps) => {
	const defaultTitle = query
		? `No results found for "${query}"`
		: "No products found";

	const defaultDescription = query
		? "Try adjusting your search or browse our categories"
		: "Try searching for something or browse our categories";

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center",
				className,
			)}
		>
			<div className="mb-4 rounded-full bg-muted p-3">
				<Search className="h-6 w-6 text-muted-foreground" />
			</div>

			<h3 className="mb-2 text-lg font-semibold">
				{title || defaultTitle}
			</h3>

			<p className="mb-4 max-w-md text-muted-foreground">
				{description || defaultDescription}
			</p>

			{action && <div>{action}</div>}
		</div>
	);
};

/**
 * Error state for search operations
 */
export const SearchError = ({
	className,
	title = "Search failed",
	description = "Something went wrong while searching. Please try again.",
	onRetry,
}: SearchErrorProps) => {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 text-center",
				className,
			)}
		>
			<div className="mb-4 rounded-full bg-destructive/10 p-3">
				<AlertCircle className="h-6 w-6 text-destructive" />
			</div>

			<h3 className="mb-2 text-lg font-semibold">{title}</h3>

			<p className="mb-4 max-w-md text-muted-foreground">
				{description}
			</p>

			{onRetry && (
				<button
					onClick={onRetry}
					className={cn(
						"inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						"transition-colors hover:bg-primary/90",
					)}
				>
					Try Again
				</button>
			)}
		</div>
	);
};

/**
 * Loading skeleton for product list
 */
export const ProductListLoading = ({
	className,
	count = 6,
}: ProductListLoadingProps) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
				className,
			)}
		>
			{Array.from({ length: count }).map((_, index) => (
				<ProductCardSkeleton key={index} />
			))}
		</div>
	);
};

/**
 * Loading skeleton for individual product card
 */
const ProductCardSkeleton = () => {
	return (
		<div className="rounded-lg border p-4">
			{/* Image skeleton */}
			<div className="relative mb-4 h-48 w-full animate-pulse rounded bg-muted" />

			{/* Content skeleton */}
			<div className="space-y-2">
				<div className="h-4 animate-pulse rounded bg-muted" />
				<div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
				<div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
			</div>
		</div>
	);
};

/**
 * Loading skeleton for search suggestions
 */
export const SuggestionListLoading = ({
	className,
	count = 4,
}: SuggestionListLoadingProps) => {
	return (
		<div className={cn("space-y-1", className)}>
			{Array.from({ length: count }).map((_, index) => (
				<SuggestionItemSkeleton key={index} />
			))}
		</div>
	);
};

/**
 * Loading skeleton for individual suggestion
 */
const SuggestionItemSkeleton = () => {
	return (
		<div className="flex items-center gap-3 px-3 py-2">
			<div className="h-8 w-8 animate-pulse rounded bg-muted" />
			<div className="flex-1 space-y-1">
				<div className="h-3 animate-pulse rounded bg-muted" />
				<div className="h-2 w-2/3 animate-pulse rounded bg-muted" />
			</div>
		</div>
	);
};
