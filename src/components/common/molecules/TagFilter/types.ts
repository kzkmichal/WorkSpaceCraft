import { Tag } from "@/components/common/atoms/TagBadge";
import { BaseProps } from "@/components/utils/types";

export type TagFilterProps = BaseProps & {
	availableTags: Tag[];
	maxHeight?: string;
};
