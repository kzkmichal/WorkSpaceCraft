import { BaseProps } from "@/components/utils/types";
import {
	ProductFieldsFragment,
	SetupWithProductsFieldsFragment,
} from "@/graphql/generated/graphql";

export type SetupViewProps = BaseProps &
	SetupWithProductsFieldsFragment & {
		isOwner?: boolean;
	};

export type SetupViewProductCardProps = BaseProps & {
	product: ProductFieldsFragment;
	order: number;
};
