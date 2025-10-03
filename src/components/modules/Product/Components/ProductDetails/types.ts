import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductDetailsProps = BaseProps &
	Pick<
		ProductFieldsFragment,
		| "technicalFeatures"
		| "dimensions"
		| "cons"
		| "pros"
		| "userExperience"
	> & {
		rating?: number;
		reviewCount?: number;
	};
