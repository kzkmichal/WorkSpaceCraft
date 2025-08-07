import { BaseProps } from "@/components/utils/types";

export type LikeWidgetProps = BaseProps & {
	isLiked: boolean;
	totalVotes?: number;
	likePercentage?: number;
};
