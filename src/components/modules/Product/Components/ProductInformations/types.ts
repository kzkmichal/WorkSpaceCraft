import { BaseProps } from "@/components/utils/types";
import { ProductFieldsFragment } from "@/graphql/generated/graphql";

export type ProductInformationsProps = BaseProps &
	Pick<
		ProductFieldsFragment,
		| "brand"
		| "model"
		| "title"
		| "price"
		| "tags"
		| "description"
		| "originalStoreLink"
	> & {
		rating?: number;
		reviewCount?: number;
	};

export type CommunityFeedbackProps = BaseProps & {
	rating?: number;
	reviewCount?: number;
	likes?: number;
	dislikes?: number;
	isDisliked?: boolean;
	isLiked?: boolean;
};
