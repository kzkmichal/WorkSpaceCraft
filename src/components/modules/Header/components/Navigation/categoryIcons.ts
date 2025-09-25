import { Home, Building2, Laptop } from "lucide-react";
import type { CategoryType } from "@prisma/client";
import type { CategoryIconMapping } from "./types";

export const CATEGORY_ICONS: CategoryIconMapping = {
	HOME: Home,
	OFFICE: Building2,
	REMOTE: Laptop,
} as const;

export const getCategoryIcon = (categoryType: CategoryType) => {
	return CATEGORY_ICONS[categoryType];
};

export const CATEGORY_DESCRIPTIONS: Record<CategoryType, string> = {
	HOME: "Create comfortable and functional living spaces with furniture and accessories designed for modern homes.",
	OFFICE:
		"Professional workspace solutions designed to boost productivity and create efficient work environments.",
	REMOTE:
		"Portable and flexible workspace solutions perfect for remote work, travel, and mobile professionals.",
} as const;
