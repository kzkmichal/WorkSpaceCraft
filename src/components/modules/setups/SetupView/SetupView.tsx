import { Container } from "@/components/common/molecules/Container/Container";
import { SetupViewProps } from "./types";
import {
	getCategoryIcon,
	getCategoryLabel,
	getCategoryUrl,
} from "../../User/Components/UserSetups/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { SetupViewProductCard } from "./SetupViewProductCard";

export const SetupView = ({
	title,
	category,
	imageUrl,
	isOwner,
	id,
	status,
	user,
	description,
	createdAt,
	products,
}: SetupViewProps) => {
	return (
		<Container>
			<div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-1">
					<div>
						<div className="mb-3 flex flex-wrap gap-2">
							<Badge>
								{getCategoryIcon(category)}{" "}
								{getCategoryLabel(category)}
							</Badge>
							{status === "DRAFT" && isOwner && (
								<Badge variant="secondary">Draft</Badge>
							)}
						</div>
						<h1 className="text-3xl font-bold leading-tight lg:text-4xl">
							{title}
						</h1>
					</div>
					<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-4">
						{user && (
							<Avatar className="h-10 w-10 rounded-full border-2 border-background shadow-sm">
								<AvatarImage
									src={undefined}
									alt={user.name || "User"}
									className="rounded-full"
								/>
								<div className="flex h-full w-full items-center justify-center rounded-full bg-primary font-medium text-primary-foreground">
									{user.name?.charAt(0)?.toUpperCase() || "U"}
								</div>
							</Avatar>
						)}
						<div>
							<p className="font-medium text-foreground">
								{user.name}
							</p>
							<p className="text-sm text-muted-foreground">
								Created{" "}
								{new Date(createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
						</div>
					</div>
					{description && (
						<div className="rounded-lg bg-muted/50 p-4">
							<h2 className="mb-3 text-lg font-semibold">
								About this setup
							</h2>
							<p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
								{description}
							</p>
						</div>
					)}
					{isOwner && (
						<div className="flex gap-2">
							<Button asChild variant="outline" className="w-full">
								<Link
									href={`/setup/${getCategoryUrl(category)}/${id}/edit`}
								>
									<Edit className="mr-2 h-4 w-4" /> Edit Setup
								</Link>
							</Button>
						</div>
					)}
				</div>
				<div className="lg:col-span-2">
					<div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted lg:h-96">
						{imageUrl ? (
							<Image
								src={imageUrl}
								alt={title}
								fill
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center">
								<div className="text-center">
									<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted-foreground/10">
										<span className="text-2xl">🖼️</span>
									</div>
									<p className="text-sm text-muted-foreground">
										No image available
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold">Products</h2>
					<Badge variant="outline" className="text-sm">
						{products.length}{" "}
						{products.length === 1 ? "item" : "items"}
					</Badge>
				</div>
				{products.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{products.map((setupProduct, index) => (
							<SetupViewProductCard
								key={setupProduct.id}
								product={setupProduct.product}
								order={index + 1}
							/>
						))}
					</div>
				) : (
					<div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
								<span className="text-xl">📦</span>
							</div>
							<p className="text-muted-foreground">
								No products in this setup yet
							</p>
							<p className="text-sm text-muted-foreground/75">
								Start adding products to showcase your workspace
							</p>
						</div>
					</div>
				)}
			</div>
		</Container>
	);
};
