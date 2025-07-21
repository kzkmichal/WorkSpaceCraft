import { BaseProps } from "@/components/utils/types";

export type Tag = {
	id: string;
	name: string;
	slug: string;
};

export type TagBadgeProps = BaseProps & {
	tag: Tag | string;
	onClick?: () => void;
	isSelected?: boolean;
	variant?: "default" | "secondary" | "outline" | "destructive";
	asLink?: boolean;
};
