"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { CommunityFeedbackProps } from "./types";

export const CommunityFeedback = ({
	reviewCount,
}: CommunityFeedbackProps) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);
	const [likes, setLikes] = useState(reviewCount || 1 * 0.8); // Approximate likes
	const [dislikes, setDislikes] = useState(reviewCount || 2 * 0.2); // Approximate dislikes

	const handleLike = () => {
		if (isLiked) {
			setIsLiked(false);
			setLikes(likes - 1);
		} else {
			setIsLiked(true);
			setLikes(likes + 1);
			if (isDisliked) {
				setIsDisliked(false);
				setDislikes(dislikes - 1);
			}
		}
	};

	const handleDislike = () => {
		if (isDisliked) {
			setIsDisliked(false);
			setDislikes(dislikes - 1);
		} else {
			setIsDisliked(true);
			setDislikes(dislikes + 1);
			if (isLiked) {
				setIsLiked(false);
				setLikes(likes - 1);
			}
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<button
					onClick={handleLike}
					className={`group relative flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-300 ease-out sm:gap-2 sm:py-2.5 ${
						isLiked
							? "border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm"
							: "border border-border/40 bg-gradient-to-br from-muted/30 to-muted/10 text-muted-foreground hover:border-border/60 hover:from-muted/40 hover:to-muted/20 hover:text-foreground hover:shadow-sm"
					}`}
				>
					<ThumbsUp
						className={`h-3.5 w-3.5 transition-all duration-300 sm:h-4 sm:w-4 ${isLiked ? "scale-110 fill-current" : "group-hover:scale-105"}`}
					/>
					<span className="text-xs font-semibold tabular-nums sm:text-sm">
						{Math.round(likes)}
					</span>
				</button>
				<button
					onClick={handleDislike}
					className={`group relative flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-300 ease-out sm:gap-2 sm:py-2.5 ${
						isDisliked
							? "border border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive shadow-sm"
							: "border border-border/40 bg-gradient-to-br from-muted/30 to-muted/10 text-muted-foreground hover:border-border/60 hover:from-muted/40 hover:to-muted/20 hover:text-foreground hover:shadow-sm"
					}`}
				>
					<ThumbsDown
						className={`h-3.5 w-3.5 transition-all duration-300 sm:h-4 sm:w-4 ${isDisliked ? "scale-110 fill-current" : "group-hover:scale-105"}`}
					/>
					<span className="text-xs font-semibold tabular-nums sm:text-sm">
						{Math.round(dislikes)}
					</span>
				</button>
			</div>

			<div className="space-y-2">
				<div className="relative">
					<div className="h-1.5 overflow-hidden rounded-full bg-gradient-to-r from-muted/60 to-muted/40 shadow-inner">
						<div
							className="h-full bg-gradient-to-r from-primary to-primary/80 shadow-sm transition-all duration-700 ease-out"
							style={{
								width: `${(likes / (likes + dislikes)) * 100}%`,
							}}
						></div>
					</div>
					<div className="absolute -top-0.5 left-0 h-2.5 w-2.5 animate-pulse rounded-full bg-primary/20" />
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<div className="h-1.5 w-1.5 rounded-full bg-primary" />
						<span className="text-xs font-medium text-foreground">
							{Math.round((likes / (likes + dislikes)) * 100)}%
							positive
						</span>
					</div>
					<span className="text-xs font-medium text-muted-foreground">
						{reviewCount} reviews
					</span>
				</div>
			</div>
		</div>
	);
};
