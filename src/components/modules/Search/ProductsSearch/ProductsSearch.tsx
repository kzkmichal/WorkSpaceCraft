"use client";

import React, { useState, useRef, useEffect } from "react";
import {
	useSearchParams,
	useRouter,
	usePathname,
} from "next/navigation";
import { Search, X } from "lucide-react";
import { useDebouncedCallback } from "@/hooks/utils/useDebounce";
import { cn } from "@/components/utils/helpers";
import { ProductsSearchProps } from "./types";

export const ProductsSearch = ({
	placeholder = "Search in products...",
	className,
	autoFocus = false,
}: ProductsSearchProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	const initialQuery = searchParams.get("search") || "";
	const [query, setQuery] = useState(initialQuery);
	const [isFocused, setIsFocused] = useState(false);

	const debouncedUpdateURL = useDebouncedCallback(
		(searchQuery: string) => {
			const params = new URLSearchParams(searchParams.toString());

			if (searchQuery.trim()) {
				params.set("search", searchQuery.trim());
			} else {
				params.delete("search");
			}

			params.delete("page");

			const newUrl = params.toString()
				? `${pathname}?${params}`
				: pathname;
			router.replace(newUrl, { scroll: false });
		},
		300,
	);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		setQuery(value);
		debouncedUpdateURL(value);
	};

	const handleClear = () => {
		setQuery("");
		debouncedUpdateURL("");
		inputRef.current?.focus();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const params = new URLSearchParams(searchParams.toString());

		if (query.trim()) {
			params.set("search", query.trim());
		} else {
			params.delete("search");
		}

		params.delete("page");

		const newUrl = params.toString()
			? `${pathname}?${params}`
			: pathname;
		router.replace(newUrl, { scroll: false });
	};

	useEffect(() => {
		const urlQuery = searchParams.get("search") || "";
		if (urlQuery !== query) {
			setQuery(urlQuery);
		}
	}, [searchParams]);

	useEffect(() => {
		if (autoFocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autoFocus]);

	return (
		<form
			onSubmit={handleSubmit}
			className={cn("relative", className)}
		>
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
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					placeholder={placeholder}
					className={cn(
						"flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none",
						"placeholder:text-muted-foreground",
					)}
					autoComplete="off"
					spellCheck={false}
				/>
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className={cn(
							"mr-3 rounded-full p-1 transition-colors hover:bg-muted",
							"text-muted-foreground hover:text-foreground",
						)}
						aria-label="Clear search"
					>
						<X className="h-3 w-3" />
					</button>
				)}
			</div>
		</form>
	);
};
