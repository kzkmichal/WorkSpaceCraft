import { ThumbsDown, ThumbsUp } from "lucide-react";
import { LikeWidgetProps } from "./types";
import { Badge } from "@/components/ui/badge";

export const LikeWidget = ({
	isLiked,
	totalVotes = 500,
	likePercentage = 92,
	"data-testid": testId = "like-widget",
}: LikeWidgetProps) => {
	return (
		<Badge
			data-testid={testId}
			variant="outline"
			className="rounded-lg px-2 py-1"
		>
			<div className="flex items-center gap-2 text-xs">
				{isLiked ? (
					<div className="flex items-center gap-1 text-green-600">
						{
							<ThumbsUp
								className="h-3 w-3"
								data-testid={`${testId}-thumbs-up`}
							/>
						}
						<span className="font-medium">{likePercentage}%</span>
					</div>
				) : (
					<div className="flex items-center gap-1 text-red-600">
						{
							<ThumbsDown
								className="h-3 w-3"
								data-testid={`${testId}-thumbs-down`}
							/>
						}
						<span className="font-medium">0%</span>
					</div>
				)}
				<div className="h-3 w-px bg-gray-300"></div>
				<span
					className="font-medium"
					data-testid={`${testId}-total-votes`}
				>
					{totalVotes}
				</span>
			</div>
		</Badge>
	);
};
