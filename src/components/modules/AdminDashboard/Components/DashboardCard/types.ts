import { BaseProps } from "@/components/utils/types";

export type DashboardCardProps = BaseProps & {
	title: string;
	count?: number;
	linkHref: string;
	linkText: string;
	color: string;
	textColor: string;
};
