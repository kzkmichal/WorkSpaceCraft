"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useSearch } from "@/hooks/search/useSearch";
import { SearchDropdown } from "../SearchDropdown";
import { cn } from "@/components/utils/helpers";
import { GlobalSearchProps } from "./types";
import { SearchSuggestion } from "@/graphql/generated/graphql";

export const GlobalSearch = ({
	placeholder = "Search products, categories...",
	className,
	autoFocus = false,
	onFocus,
	onBlur,
}: GlobalSearchProps) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const {
		query,
		suggestions,
		isLoading,
		hasResults,
		canSearch,
		updateQuery,
		clearSearch,
		executeSearch,
		selectSuggestion,
	} = useSearch({
		debounceMs: 300,
		minQueryLength: 2,
		suggestionsLimit: 8,
	});

	const shouldShowDropdown =
		showDropdown && (hasResults || isLoading) && canSearch;

	const handleFocus = () => {
		setIsFocused(true);
		setShowDropdown(true);
		onFocus?.();
	};

	const handleBlur = () => {
		setIsFocused(false);
		setTimeout(() => {
			setShowDropdown(false);
			onBlur?.();
		}, 150);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		updateQuery(value);

		if (value.trim()) {
			setShowDropdown(true);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			executeSearch();
			setShowDropdown(false);
			inputRef.current?.blur();
		}
	};

	const handleClear = () => {
		clearSearch();
		setShowDropdown(false);
		inputRef.current?.focus();
	};

	const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
		selectSuggestion(suggestion);
		setShowDropdown(false);
		inputRef.current?.blur();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			setShowDropdown(false);
			inputRef.current?.blur();
		}
		// TODO: Add arrow key navigation in future branches
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (autoFocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autoFocus]);

	return (
		<div
			ref={containerRef}
			className={cn("relative w-full max-w-lg", className)}
		>
			<form onSubmit={handleSubmit} className="relative">
				<div
					className={cn(
						"relative flex items-center rounded-lg border bg-white shadow-sm transition-all",
						isFocused
							? "border-primary ring-2 ring-primary/20"
							: "border-border",
						"hover:border-primary/60",
					)}
				>
					<Search className="ml-3 h-4 w-4 text-muted-foreground" />
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={handleInputChange}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						className={cn(
							"flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none",
							"placeholder:text-muted-foreground",
						)}
						autoComplete="off"
						spellCheck={false}
					/>
					<div className="mr-3 flex items-center">
						{isLoading && (
							<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
						)}
						{query && !isLoading && (
							<button
								type="button"
								onClick={handleClear}
								className={cn(
									"rounded-full p-1 transition-colors hover:bg-muted",
									"text-muted-foreground hover:text-foreground",
								)}
								aria-label="Clear search"
							>
								<X className="h-3 w-3" />
							</button>
						)}
					</div>
				</div>
			</form>
			{shouldShowDropdown && (
				<SearchDropdown
					suggestions={suggestions}
					isLoading={isLoading}
					query={query}
					onSelect={handleSuggestionSelect}
					onClose={() => setShowDropdown(false)}
				/>
			)}
		</div>
	);
};
