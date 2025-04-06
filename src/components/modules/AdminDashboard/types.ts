import { BaseProps } from "@/components/utils/types";
import {
	ProductFieldsFragment,
	UserFieldsFragment,
} from "@/graphql/generated/graphql";

export type RecentUserProps = Pick<
	UserFieldsFragment,
	"name" | "email" | "image" | "role" | "id" | "createdAt"
>;

export type ReportedPRoductsProps = Pick<
	ProductFieldsFragment,
	"title" | "imageUrl" | "reportCount" | "id"
> & {
	createdBy: string;
};

export type AdminDashboardProps = BaseProps & {
	recentUsers: RecentUserProps[];
	reportedProducts: ReportedPRoductsProps[];
};
