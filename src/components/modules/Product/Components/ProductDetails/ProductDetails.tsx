"use client";

import { ProductDetailsProps } from "./types";
import { ThumbsUp, ThumbsDown, Heart, Send } from "lucide-react";
import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const ProductDetails = ({
	cons,
	pros,
	dimensions,
	technicalFeatures,
	userExperience,
}: ProductDetailsProps) => {
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState([
		{
			id: 1,
			author: "sarah_chen",
			avatar: "SC",
			text: "Just got this desk! The height adjustment is so smooth 🙌",
			time: "2h",
			likes: 12,
		},
		{
			id: 2,
			author: "mike_designs",
			avatar: "MD",
			text: "Perfect for my home office setup. Quality is amazing!",
			time: "5h",
			likes: 8,
		},
		{
			id: 3,
			author: "workspace_pro",
			avatar: "WP",
			text: "Been using this for 6 months - still love it!",
			time: "1d",
			likes: 15,
		},
		{
			id: 4,
			author: "desk_enthusiast",
			avatar: "DE",
			text: "The bamboo surface feels premium and looks great in my office.",
			time: "2d",
			likes: 9,
		},
	]);

	const {
		setupDifficulty,
		assemblyRequired,
		toolsNeeded,
		compatibility,
		userManualLink,
	} = userExperience || {};

	const handleAddComment = () => {
		if (newComment.trim()) {
			const comment = {
				id: comments.length + 1,
				author: "you",
				avatar: "YU",
				text: newComment.trim(),
				time: "now",
				likes: 0,
			};
			setComments([comment, ...comments]);
			setNewComment("");
		}
	};

	const SpecsContent = () => (
		<div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
			{dimensions && dimensions.length > 0 && (
				<div className="space-y-4 sm:space-y-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
							<div className="h-4 w-4 rounded-sm bg-primary/20"></div>
						</div>
						<h3 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
							Physical Dimensions
						</h3>
					</div>
					<div className="space-y-3 sm:space-y-4">
						{dimensions.map((dim, index) => (
							<div
								key={index}
								className="group flex items-center justify-between rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30"
							>
								<span className="font-medium text-muted-foreground">
									{dim.name}
								</span>
								<span className="font-semibold text-foreground">
									{dim.value}
									{dim.unit}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
			{/* Technical Features */}
			{technicalFeatures && technicalFeatures.length > 0 && (
				<div className="space-y-4 sm:space-y-6">
					<div className="mb-6 flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
							<div className="h-4 w-4 rounded-full bg-secondary/40"></div>
						</div>
						<h3 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
							Technical Features
						</h3>
					</div>
					<div className="space-y-3 sm:space-y-4">
						{technicalFeatures.map((feature, index) => (
							<div
								key={index}
								className="group flex items-center justify-between rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30"
							>
								<span className="font-medium text-muted-foreground">
									{feature.name}
								</span>
								<span className="font-semibold text-foreground">
									{feature.value}
								</span>
							</div>
						))}
					</div>
				</div>
			)}
			{/* User Experience */}
			<div className="space-y-4 sm:space-y-6">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/10">
						<div className="h-4 w-4 rounded-full bg-accent/40"></div>
					</div>
					<h3 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
						User Experience
					</h3>
				</div>
				<div className="space-y-3 sm:space-y-4">
					{setupDifficulty && (
						<div className="group flex items-center justify-between rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30">
							<span className="font-medium text-muted-foreground">
								Setup Difficulty
							</span>
							<span className="font-semibold text-foreground">
								{setupDifficulty.charAt(0) +
									setupDifficulty.slice(1).toLowerCase()}
							</span>
						</div>
					)}
					{assemblyRequired !== undefined && (
						<div className="group flex items-center justify-between rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30">
							<span className="font-medium text-muted-foreground">
								Assembly Required
							</span>
							<span className="font-semibold text-foreground">
								{assemblyRequired ? "Yes" : "No"}
							</span>
						</div>
					)}
					{toolsNeeded && toolsNeeded.length > 0 && (
						<div className="group flex flex-col rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30">
							<span className="mb-2 font-medium text-muted-foreground">
								Tools Needed
							</span>
							<div className="flex flex-wrap gap-1">
								{toolsNeeded.map((tool, index) => (
									<Badge key={index} variant="secondary">
										{tool}
									</Badge>
								))}
							</div>
						</div>
					)}
					{compatibility && compatibility.length > 0 && (
						<div className="group flex flex-col rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30">
							<span className="mb-2 font-medium text-muted-foreground">
								Compatibility
							</span>
							<div className="flex flex-wrap gap-1">
								{compatibility.map((item, index) => (
									<span
										key={index}
										className="rounded-md bg-muted/60 px-2 py-1 text-xs font-medium text-foreground"
									>
										{item}
									</span>
								))}
							</div>
						</div>
					)}
					{userManualLink && (
						<div className="group flex items-center justify-between rounded-xl border border-border/40 bg-gradient-to-r from-muted/20 to-transparent px-4 py-3 transition-all duration-200 hover:border-border/60 hover:from-muted/30">
							<span className="font-medium text-muted-foreground">
								User Manual
							</span>
							<a
								href={userManualLink}
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-primary underline transition-colors hover:text-primary/80"
							>
								Download PDF
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	const ProsConsContent = () => (
		<div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
			<div className="space-y-6">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm">
						<ThumbsUp className="h-5 w-5 text-primary" />
					</div>
					<h3 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-lg font-semibold sm:text-xl">
						What I Like
					</h3>
				</div>
				<div className="space-y-3 sm:space-y-4">
					{pros?.map(({ text }, index) => (
						<div
							key={index}
							className="group rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
						>
							<span className="flex-1 pr-3 text-sm font-medium text-primary/90 sm:text-base">
								{text}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-6">
				<div className="mb-6 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/20 bg-gradient-to-br from-destructive/10 to-destructive/5 shadow-sm">
						<ThumbsDown className="h-5 w-5 text-destructive" />
					</div>
					<h3 className="bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-lg font-semibold sm:text-xl">
						What I Don't Like
					</h3>
				</div>
				<div className="space-y-3 sm:space-y-4">
					{cons?.map(({ text }, index) => (
						<div
							key={index}
							className="group rounded-xl border border-destructive/20 bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent px-4 py-3 transition-all duration-300 hover:border-destructive/30 hover:shadow-md hover:shadow-destructive/10"
						>
							<span className="flex-1 pr-3 text-sm font-medium text-destructive/90 sm:text-base">
								{text}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const CommentsContent = () => (
		<div className="mb-6 bg-card">
			<div className="mb-4 flex items-center justify-between sm:mb-6">
				<h2 className="text-lg font-semibold sm:text-xl">
					Comments ({comments.length})
				</h2>
			</div>

			{/* Add Comment */}
			<div className="mb-6 flex gap-3">
				<Input
					placeholder="Add a comment..."
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
					className="flex-1"
				/>
				<Button
					onClick={handleAddComment}
					disabled={!newComment.trim()}
				>
					<Send className="h-4 w-4" />
				</Button>
			</div>

			{/* Comments List */}
			<div className="space-y-4">
				{comments.map((comment) => (
					<div
						key={comment.id}
						className="flex gap-3 rounded-lg bg-muted/20 p-3 sm:p-4"
					>
						<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
							<span className="text-xs font-semibold text-primary/70">
								{comment.avatar}
							</span>
						</div>
						<div className="min-w-0 flex-1">
							<div className="mb-1 flex items-center gap-2">
								<span className="text-sm font-semibold">
									{comment.author}
								</span>
								<span className="text-xs text-muted-foreground">
									{comment.time}
								</span>
							</div>
							<p className="mb-2 text-sm leading-relaxed">
								{comment.text}
							</p>
							<div className="flex items-center gap-4">
								<Button
									variant="ghost"
									size="sm"
									className="h-auto p-0 text-xs text-muted-foreground sm:text-sm"
								>
									<Heart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
									{comment.likes}
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="h-auto p-0 text-xs text-muted-foreground sm:text-sm"
								>
									Reply
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-card via-card to-card/95 shadow-sm">
			<div className="p-6">
				<Tabs defaultValue="specs" className="w-full">
					<TabsList className="mb-8 flex h-auto w-full flex-wrap gap-2 bg-transparent p-0">
						<TabsTrigger
							value="specs"
							className="rounded-full bg-muted/60 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 ease-out hover:bg-muted hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20"
						>
							<span className="hidden sm:inline">Specifications</span>
							<span className="sm:hidden">Specs</span>
						</TabsTrigger>
						<TabsTrigger
							value="pros-cons"
							className="rounded-full bg-muted/60 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 ease-out hover:bg-muted hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20"
						>
							<span className="hidden sm:inline">Pros & Cons</span>
							<span className="sm:hidden">Pros/Cons</span>
						</TabsTrigger>
						<TabsTrigger
							value="comments"
							className="rounded-full bg-muted/60 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 ease-out hover:bg-muted hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20"
						>
							<span>Comments</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="specs"
						className="mt-0 rounded-xl bg-gradient-to-br from-background to-muted/10 p-6 lg:p-8"
					>
						<SpecsContent />
					</TabsContent>
					<TabsContent
						value="pros-cons"
						className="mt-0 rounded-xl bg-gradient-to-br from-background to-muted/10 p-6 lg:p-8"
					>
						<ProsConsContent />
					</TabsContent>
					<TabsContent
						value="comments"
						className="mt-0 rounded-xl bg-gradient-to-br from-background to-muted/10 p-6 lg:p-8"
					>
						<CommentsContent />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
