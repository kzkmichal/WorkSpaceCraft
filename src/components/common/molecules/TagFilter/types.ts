import { Tag } from "@/components/common/atoms/TagBadge";
import { ModeType } from "@/components/modules/Products/FilterSidebar";
import { BaseProps } from "@/components/utils/types";

export type TagFilterProps = BaseProps & {
	mode: ModeType;
	availableTags: Tag[];
	maxHeight?: string;
};
