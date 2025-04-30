import { BaseProps } from "@/components/utils/types";
import { Tag } from "@/components/common/atoms/TagBadge/types";

export type TagListProps = BaseProps & {
	tags: (Tag | string)[];
	onTagClick?: (tag: Tag | string) => void;
	selectedTags?: string[];
};
