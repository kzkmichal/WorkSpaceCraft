import { BaseProps } from "@/components/utils/types";
import { TagFieldsFragment } from "@/graphql/generated/graphql";
import { ModeType } from "../FilterSidebar";

export type MobileFilterSheetProps = BaseProps & {
	mode?: ModeType;
	popularTags: TagFieldsFragment[];
};
