import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductCardProps = BaseProps &
	ProductFieldsFragment & {
		rating?: number;
		reviewCount?: number;
		positiveLikes?: number;
		negativeLikes?: number;
	};
