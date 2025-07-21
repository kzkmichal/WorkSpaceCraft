import { BaseProps } from "@/components/utils/types";
import { TagFieldsFragment } from "@/graphql/generated/graphql";

export type TagsListViewProps = BaseProps & {
	tags: TagFieldsFragment[];
};
