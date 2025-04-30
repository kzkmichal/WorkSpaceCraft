import { BaseProps } from "@/components/utils/types";
import { TagFieldsFragment } from "@/graphql/generated/graphql";

export type FilterSidebarProps = BaseProps & {
	popularTags: TagFieldsFragment[];
};
