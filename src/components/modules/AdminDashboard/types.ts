import { BaseProps } from "@/components/utils/types";
import {
	ProductFieldsFragment,
	UserFieldsFragment,
} from "@/graphql/generated/graphql";

export type RecentUserProps = Pick<
	UserFieldsFragment,
	"name" | "email" | "image" | "role" | "id" | "createdAt"
>;

export type ReportedProductsProps = Pick<
	ProductFieldsFragment,
	"title" | "reportCount" | "id"
> & {
	createdBy: string;
	imageUrl?: string;
};

export type AdminDashboardProps = BaseProps & {
	recentUsers: RecentUserProps[];
	reportedProducts: ReportedProductsProps[];
};
