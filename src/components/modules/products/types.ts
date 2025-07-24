import { BaseProps } from "@/components/utils/types";
import { TagFieldsFragment } from "@/graphql/generated/graphql";

export enum SearchParamsKeys {
	PAGE = "page",
	TAGS = "tags",
	SEARCH = "search",
	CATEGORY = "category",
	SUBCATEGORY = "subcategory",
	SORT_BY = "sortBy",
	MIN_PRICE = "minPrice",
	MAX_PRICE = "maxPrice",
}

export type ProductsProps = BaseProps & {
	initialParams: {
		page?: string;
		tags?: string;
		search?: string;
		category?: string;
		subcategory?: string;
	};
	initialPopularTags?: TagFieldsFragment[];
};
