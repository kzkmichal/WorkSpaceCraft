import { BaseProps } from "@/components/utils/types";
import { CategoryFieldsFragment } from "@/graphql/generated/graphql";

export type CategoriesProps = BaseProps & {
	categories?: CategoryFieldsFragment[];
};
