import { BaseProps } from "@/components/utils/types";
import { SubcategoryFieldsFragment } from "@/graphql/generated/graphql";

export type ItemProps = Pick<
	SubcategoryFieldsFragment,
	"name" | "description" | "fullSlug"
>;

export type CardsLayoutProps = BaseProps & {
	items?: ItemProps[];
};
