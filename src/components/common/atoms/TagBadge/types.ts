import { BaseProps } from "@/components/utils/types";

export type Tag = {
	id: string;
	name: string;
	slug: string;
};

export type TagBadgeVariantType =
	| "default"
	| "secondary"
	| "outline"
	| "destructive"
	| "primary"
	| "accent";

export type TagBadgeProps = BaseProps & {
	tag: Tag | string;
	onClick?: () => void;
	isSelected?: boolean;
	variant?: TagBadgeVariantType;
	asLink?: boolean;
};
