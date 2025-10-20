"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetupProductItemProps } from "./types";
import { removeProductFromSetup } from "@/app/actions/setup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SetupProductItem({
	setupProduct,
	setupId,
	index,
}: SetupProductItemProps) {
	const router = useRouter();
	const [isRemoving, setIsRemoving] = useState(false);

	const product = setupProduct.product;
	const primaryImage = product.images?.find(
		(img) => img?.isPrimary,
	)?.url;

	const handleRemove = async () => {
		setIsRemoving(true);
		try {
			const result = await removeProductFromSetup(
				setupId,
				product.id,
			);

			if (result.success) {
				toast.success("Product removed from setup");
				router.refresh();
			} else {
				toast.error(result.error || "Failed to remove product");
			}
		} catch (error) {
			toast.error("An error occurred");
		} finally {
			setIsRemoving(false);
		}
	};

	return (
		<div className="group flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
			<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
				{index + 1}
			</div>
			<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
				{primaryImage ? (
					<Image
						src={primaryImage}
						alt={product.title}
						fill
						className="object-cover"
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<span className="text-2xl opacity-40">📦</span>
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<Link
					href={`/products/${product.id}`}
					className="block hover:underline"
				>
					<h3 className="truncate font-semibold">{product.title}</h3>
				</Link>
				<p className="text-sm text-muted-foreground">
					${product.price.toFixed(2)}
				</p>
				{product.brand && (
					<p className="text-xs text-muted-foreground">
						{product.brand}
					</p>
				)}
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={handleRemove}
					disabled={isRemoving}
					className="text-destructive opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
