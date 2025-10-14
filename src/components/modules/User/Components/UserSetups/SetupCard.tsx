import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SetupCardProps } from "./types";
import { getCategoryIcon, getCategoryLabel } from "./utils";
import { SetupCardActionButtons } from "./SetupCardActionButtons";

export function SetupCard({
	status,
	productCount,
	id,
	category,
	title,
	description,
	imageUrl,
	isOwner,
}: SetupCardProps) {
	const isDraft = status === "DRAFT";
	const productsCount = productCount || 0;

	const actionButtonsProps = {
		id,
		title,
		isDraft,
		category,
		productsCount,
	};

	return (
		<div className="group overflow-hidden transition-all hover:shadow-lg">
			<div className="relative h-48 w-full overflow-hidden bg-muted">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt={title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
						<span className="text-6xl opacity-20">
							{getCategoryIcon(category)}
						</span>
					</div>
				)}
				<div className="absolute left-3 top-3 flex gap-2">
					<Badge
						variant={isDraft ? "secondary" : "default"}
						className={
							isDraft
								? "bg-yellow-100 text-yellow-800"
								: "bg-green-100 text-green-800"
						}
					>
						{status}
					</Badge>
					<Badge variant="outline" className="bg-white/90">
						{getCategoryIcon(category)} {getCategoryLabel(category)}
					</Badge>
				</div>
			</div>
			<h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
			{description && (
				<p className="line-clamp-2 text-sm text-muted-foreground">
					{description}
				</p>
			)}
			<div className="flex items-center justify-between text-sm text-muted-foreground">
				<span className="flex items-center gap-1">
					<span className="font-medium">{productsCount}</span>
					{productsCount === 1 ? "product" : "products"}
				</span>
			</div>
			{isOwner && <SetupCardActionButtons {...actionButtonsProps} />}
		</div>
	);
}
