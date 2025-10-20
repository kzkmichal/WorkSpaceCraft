import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/components/utils/helpers";
import {
	getCategoryIcon,
	getCategoryLabel,
	getCategoryUrl,
} from "../../User/Components/UserSetups/utils";
import { SetupCardProps } from "./types";

export const SetupCard = ({
	id,
	title,
	description,
	imageUrl,
	category,
	user,
	isOwner,
	className,
}: SetupCardProps) => {
	return (
		<Link
			href={`/setup/${getCategoryUrl(category)}/${id}`}
			className="block"
		>
			<div
				className={cn(
					"group relative rounded-lg border bg-card p-0 transition-all duration-200 hover:shadow-lg",
					isOwner && "border-2 border-primary shadow-md",
					className,
				)}
			>
				{isOwner && (
					<div className="absolute right-3 top-3 z-10">
						<Badge variant="primary" className="text-xs font-medium">
							Your Setup
						</Badge>
					</div>
				)}
				{imageUrl ? (
					<div className="relative overflow-hidden rounded-t-lg">
						<Image
							src={imageUrl}
							alt={title}
							width={400}
							height={200}
							className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
						/>
					</div>
				) : (
					<div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-muted/50 to-muted">
						<div className="space-y-2 text-center">
							<div className="text-4xl opacity-50">
								{getCategoryIcon(category)}
							</div>
							<p className="text-sm font-medium text-muted-foreground">
								{getCategoryLabel(category)} Setup
							</p>
						</div>
					</div>
				)}
				<div className="space-y-3 p-4">
					<div className="flex items-center justify-between">
						<Badge variant="outline" className="text-xs">
							{getCategoryIcon(category)} {getCategoryLabel(category)}
						</Badge>
					</div>
					<h3 className="line-clamp-2 text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
						{title}
					</h3>
					{description && (
						<p className="line-clamp-2 text-sm text-muted-foreground">
							{description}
						</p>
					)}
					<div className="flex items-center gap-2 border-t border-border pt-2">
						<div className="flex items-center gap-2">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
								<span className="text-xs font-medium text-primary">
									{user.name?.[0]?.toUpperCase() ||
										user.email[0]?.toUpperCase()}
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								by {user.name || user.email}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};
