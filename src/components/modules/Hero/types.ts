import { BaseProps } from "@/components/utils/types";
import { LucideIcon } from "lucide-react";
import type { CategoryType } from "@prisma/client";

export type Subcategory = {
	name: string;
	description: string;
	link?: string;
};

export type SubcategoriesByCategory = {
	[CategoryType.HOME]: Subcategory[];
	[CategoryType.REMOTE]: Subcategory[];
	[CategoryType.OFFICE]: Subcategory[];
};

export type Category = BaseProps & {
	title: string;
	description: string;
	image: string;
	link: string;
	icon: LucideIcon;
	subcategories?: Subcategory[];
	images: string[];
	buttonText: string;
};

export type HeroProps = BaseProps & {
	activeCategory?: Category;
	categories?: Category[];
	staticSubcategories?: SubcategoriesByCategory;
};

export type BackgroundGridProps = BaseProps & {
	categories: Category[];
	activeCategory: Category;
};

export type ContentPanelProps = BaseProps & {
	categories: Category[];
	activeCategory: Category;
	onCategoryChange: (category: Category) => void;
};

export type CategoryTabsProps = BaseProps & {
	categories: Category[];
	activeCategory: Category;
	onCategoryChange: (category: Category) => void;
};

export type CategoryContentProps = BaseProps & {
	category: Category;
};

export type SubcategoryPillsProps = BaseProps & {
	subcategories?: Subcategory[];
};
