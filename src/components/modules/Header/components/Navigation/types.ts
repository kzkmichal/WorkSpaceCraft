import { BaseProps } from "@/components/utils/types";
import type { CategoryType } from "@prisma/client";
import type { LucideIcon } from "lucide-react";
import type { CategoryFieldsFragment } from "@/graphql/generated/graphql";

export type NavigationSubcategory = {
	id?: string;
	name?: string;
	slug?: string;
	fullSlug: string;
};

export type NavigationCategory = {
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
	categoryType: CategoryType;
	subcategories: NavigationSubcategory[];
	link: string;
};

export type UserMenuProps = BaseProps & {
	user?:
		| {
				id?: string;
				name?: string | null;
				email?: string | null;
				image?: string | null;
		  }
		| undefined;
	isLoading?: boolean;
	onLogout?: () => Promise<void>;
};

export type MobileMenuProps = BaseProps & {
	categories: NavigationCategory[];
	isOpen: boolean;
	onClose: () => void;
	user?: UserMenuProps["user"];
	onLogout?: () => Promise<void>;
};

export type NavigationProps = BaseProps & {
	categories: CategoryFieldsFragment[];
	currentView?: string;
	onGoHome?: () => void;
	onExplore?: () => void;
};

export type NavigationMobileStepsType = "main" | "categories";

export type CategoryIconMapping = {
	[K in CategoryType]: LucideIcon;
};
