import { BaseProps } from "@/components/utils/types";

export type BreadcrumbItem = {
	label: string;
	href: string;
	isActive?: boolean;
};

export type BreadcrumbsProps = BaseProps & {
	hideOnPaths?: string[];
};
