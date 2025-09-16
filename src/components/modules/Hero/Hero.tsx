"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/common/molecules";
import { BackgroundGrid, ContentPanel } from "./components";
import { categories } from "./constants";
import { HeroProps, Category } from "./types";
import { cn } from "@/components/utils/helpers";
import { CategoryType } from "@prisma/client";

export const Hero = ({
	staticSubcategories,
	className,
	"data-testid": testId = "hero",
	...props
}: HeroProps) => {
	const categoriesWithSubcategories = useMemo(() => {
		if (!staticSubcategories) return categories;

		return categories.map((category): Category => {
			let categoryType: CategoryType | null = null;

			switch (category.id) {
				case "home":
					categoryType = CategoryType.HOME;
					break;
				case "remote":
					categoryType = CategoryType.REMOTE;
					break;
				case "office":
					categoryType = CategoryType.OFFICE;
					break;
			}

			const subcategories =
				categoryType && staticSubcategories[categoryType]
					? staticSubcategories[categoryType]
					: [];

			return {
				...category,
				subcategories,
			};
		});
	}, [staticSubcategories]);

	const defaultCategory = categoriesWithSubcategories[0];
	const [currentCategory, setCurrentCategory] =
		useState(defaultCategory);

	return (
		<Container
			size="full"
			paddingX={{ "": "none" }}
			paddingY={{ "": "none" }}
			className={cn(
				"relative min-h-screen overflow-hidden",
				className,
			)}
			data-testid={testId}
			{...props}
		>
			<BackgroundGrid
				categories={categoriesWithSubcategories}
				activeCategory={currentCategory}
				data-testid={`${testId}-background-grid`}
			/>
			{/* <div className="absolute right-8 top-8 hidden space-y-3 lg:block">
				<div className="rounded-xl border border-border/60 bg-white/35 p-4 shadow-lg backdrop-blur-xl">
					<div className="text-center text-slate-900">
						<div
							className="text-2xl font-bold drop-shadow-lg"
							style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
						>
							2,500+
						</div>
						<div
							className="text-xs font-medium drop-shadow-md"
							style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.2)" }}
						>
							Products Reviewed
						</div>
					</div>
				</div>
				<div className="rounded-xl border border-border/60 bg-white/35 p-4 shadow-lg backdrop-blur-xl">
					<div className="text-center text-slate-900">
						<div
							className="text-2xl font-bold drop-shadow-lg"
							style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
						>
							98%
						</div>
						<div
							className="text-xs font-medium drop-shadow-md"
							style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.2)" }}
						>
							Satisfaction Rate
						</div>
					</div>
				</div>
			</div> */}
			<div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
				<div className="rounded-full border border-border/60 bg-white/35 px-3 py-2 shadow-lg backdrop-blur-xl md:px-6 md:py-3">
					<div className="flex items-center gap-2 text-slate-900 md:gap-3">
						<currentCategory.icon className="h-4 w-4 drop-shadow-md md:h-5 md:w-5" />
						<span
							className="text-xs font-medium drop-shadow-md md:text-sm"
							style={{ textShadow: "1px 1px 1px rgba(0,0,0,0.2)" }}
						>
							<span className="hidden sm:inline">
								{currentCategory?.title} Collection
							</span>
							<span className="sm:hidden">
								{currentCategory?.title}
							</span>
						</span>
						<div className="h-2 w-2 animate-pulse rounded-full bg-secondary shadow-sm"></div>
					</div>
				</div>
			</div>
			{categoriesWithSubcategories && (
				<ContentPanel
					categories={categoriesWithSubcategories}
					activeCategory={currentCategory}
					onCategoryChange={setCurrentCategory}
					data-testid={`${testId}-content-panel`}
				/>
			)}
		</Container>
	);
};
