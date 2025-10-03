import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductMediaProps = BaseProps &
	Pick<ProductFieldsFragment, "images">;
