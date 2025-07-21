import { FieldValues, Path } from "react-hook-form";
import { Tag } from "@/components/common/atoms/TagBadge/types";

export type TagInputProps<TFieldValues extends FieldValues> = {
	name: Path<TFieldValues>;
	label: string;
	existingTags?: Tag[];
	placeholder?: string;
	className?: string;
};
