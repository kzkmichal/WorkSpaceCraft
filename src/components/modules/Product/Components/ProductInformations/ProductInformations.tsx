"use client";
import { ProductInformationsProps } from "./types";
import { Bookmark, ShoppingCart } from "lucide-react";
import { Link } from "@/components/common/atoms";
import { CommunityFeedback } from "./CommunityFeedback";
import { TagBadge } from "@/components/common/atoms";
import { useState } from "react";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/components/ui/tooltip";

export const ProductInformations = ({
	model,
	brand,
	title,
	price,
	tags,
	description,
	originalStoreLink,
	...props
}: ProductInformationsProps) => {
	const [isBookmarked, setIsBookmarked] = useState(false);

	const handleSave = () => {
		setIsBookmarked(!isBookmarked);
	};

	return (
		<div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm lg:sticky lg:top-8">
			<div className="flex flex-col gap-4 p-3 sm:p-6">
				<div className="rounded-lg border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-3 sm:p-4">
					<div className="space-y-2 sm:space-y-3">
						<div className="text-xs font-medium uppercase tracking-widest text-muted-foreground/80">
							{brand}
						</div>
						<h1 className="text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
							{title}
						</h1>
						<div className="text-sm text-muted-foreground/90">
							Model
							<span className="ml-1 font-medium text-foreground/80">
								{model}
							</span>
						</div>
					</div>
					<div className="mt-3 border-t border-border/20 pt-3">
						<div className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
							{price}
						</div>
					</div>
					<div className="mt-6 flex items-center gap-3">
						<Link
							className="w-full p-3 shadow-sm hover:shadow"
							variant="primary"
							size="lg"
							href={originalStoreLink}
							external
						>
							<ShoppingCart className="mr-2 h-4 w-4" />
							Visit Store
						</Link>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										onClick={handleSave}
										className={`group relative flex h-11 w-11 items-center justify-center rounded-md transition-all duration-300 ${
											isBookmarked
												? "bg-primary/10 hover:bg-primary/15"
												: "bg-muted/30 hover:bg-muted/50"
										}`}
									>
										<Bookmark
											className={`h-5 w-5 transition-all duration-300 ${
												isBookmarked
													? "scale-110 fill-primary text-primary"
													: "text-muted-foreground group-hover:scale-110 group-hover:text-foreground"
											}`}
										/>
										{isBookmarked && (
											<span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary duration-200 animate-in zoom-in-50" />
										)}
									</button>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>
										{isBookmarked
											? "Saved to collection"
											: "Save to collection"}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						{/* <Popover open={shareOpen} onOpenChange={setShareOpen}>
							<Tooltip>
								<TooltipTrigger asChild>
									<PopoverTrigger asChild>
										<button className="group flex h-11 w-11 items-center justify-center rounded-xl bg-muted/30 transition-all duration-300 hover:bg-muted/50 sm:h-12 sm:w-12">
											<Share2 className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-foreground" />
										</button>
									</PopoverTrigger>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>Share product</p>
								</TooltipContent>
							</Tooltip>
							<PopoverContent className="w-72 p-3" align="start">
								<div className="space-y-2">
									<div className="border-b border-border/60 pb-2.5">
										<p className="font-medium">Share this product</p>
										<p className="mt-0.5 text-xs text-muted-foreground">
											Choose how you'd like to share
										</p>
									</div>

									<button
										onClick={handleCopyLink}
										className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-accent"
									>
										<div
											className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
												copiedLink
													? "bg-green-100 dark:bg-green-900/30"
													: "bg-muted/50 group-hover:bg-muted"
											}`}
										>
											{copiedLink ? (
												<Check className="h-4 w-4 text-green-600 dark:text-green-400" />
											) : (
												<Copy className="h-4 w-4 text-muted-foreground" />
											)}
										</div>
										<div className="flex-1">
											<p className="text-sm font-medium">
												{copiedLink ? "Link copied!" : "Copy link"}
											</p>
											<p className="text-xs text-muted-foreground">
												{copiedLink
													? "Ready to paste anywhere"
													: "Share via clipboard"}
											</p>
										</div>
									</button>

									<div className="grid grid-cols-2 gap-2">
										<button
											onClick={() => handleShare("twitter")}
											className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
										>
											<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1DA1F2]/10 transition-colors group-hover:bg-[#1DA1F2]/20">
												<Twitter className="h-4 w-4 text-[#1DA1F2]" />
											</div>
											<span className="text-sm font-medium">
												Twitter
											</span>
										</button>

										<button
											onClick={() => handleShare("facebook")}
											className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
										>
											<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1877F2]/10 transition-colors group-hover:bg-[#1877F2]/20">
												<Facebook className="h-4 w-4 text-[#1877F2]" />
											</div>
											<span className="text-sm font-medium">
												Facebook
											</span>
										</button>

										<button
											onClick={() => handleShare("linkedin")}
											className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
										>
											<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]/10 transition-colors group-hover:bg-[#0A66C2]/20">
												<Linkedin className="h-4 w-4 text-[#0A66C2]" />
											</div>
											<span className="text-sm font-medium">
												LinkedIn
											</span>
										</button>

										<button
											onClick={() => handleShare("email")}
											className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
										>
											<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50 transition-colors group-hover:bg-muted">
												<Mail className="h-4 w-4 text-muted-foreground" />
											</div>
											<span className="text-sm font-medium">
												Email
											</span>
										</button>
									</div>
								</div>
							</PopoverContent>
						</Popover> */}
					</div>
				</div>
				<div className="rounded-lg border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-3">
					<h3 className="mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
						Community Feedback
					</h3>
					<CommunityFeedback {...props} />
				</div>
				{tags && tags.length > 0 && (
					<div className="rounded-lg border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-3">
						<h3 className="mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
							Features
						</h3>
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{tags.map((tag, index) => (
								<TagBadge
									key={index}
									variant="secondary"
									className="cursor-default rounded-lg px-2 py-1 text-xs font-medium transition-colors hover:bg-secondary/80 sm:px-2.5"
									tag={tag}
								/>
							))}
						</div>
					</div>
				)}
				<div className="rounded-lg border border-border/30 bg-gradient-to-br from-muted/10 to-transparent p-3">
					<h3 className="mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-lg font-semibold sm:text-xl">
						About This Product
					</h3>
					<p className="text-sm leading-relaxed text-muted-foreground">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};
