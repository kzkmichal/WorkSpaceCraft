import { BaseProps } from "@/components/utils/types";
import {
	SetupFieldsFragment,
	SetupCategory,
} from "@/graphql/generated/graphql";

export type SetupsGalleryProps = BaseProps & {
	setups?: Omit<SetupFieldsFragment, "createdAt" | "updatedAt">[];
	totalCount?: number;
	currentPage: number;
	activeCategory?: SetupCategory;
};
