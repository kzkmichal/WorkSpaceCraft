import { BaseProps } from "@/components/utils/types";
import { SubcategoryFieldsFragment } from "@/graphql/generated/graphql";

export type SubCategoryProps = BaseProps & SubcategoryFieldsFragment;
