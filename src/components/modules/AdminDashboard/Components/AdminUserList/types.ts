import { BaseProps } from "@/components/utils/types";
import { UserFieldsFragment } from "@/graphql/generated/graphql";

export type UserProps = Pick<
	UserFieldsFragment,
	"id" | "name" | "email" | "role" | "createdAt" | "image"
>;

export type AdminUserListProps = BaseProps & {
	users: UserProps[];
	currentPage: number;
	totalPages: number;
};
