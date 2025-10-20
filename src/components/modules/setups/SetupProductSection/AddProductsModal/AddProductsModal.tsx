"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddProductsModalProps } from "./types";
import { addProductToSetup } from "@/app/actions/setup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useMyProductsQuery } from "@/graphql/generated/graphql";

export function AddProductsModal({
	open,
	onOpenChange,
	setupId,
	currentProductIds,
}: AddProductsModalProps) {
	const router = useRouter();
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isAdding, setIsAdding] = useState(false);

	const { data, loading, error } = useMyProductsQuery();

	const availableProducts =
		data?.myProducts?.filter(
			(product) => !currentProductIds.includes(product.id),
		) || [];

	useEffect(() => {
		if (!open) {
			setSelectedIds([]);
		}
	}, [open]);

	const toggleProduct = (productId: string) => {
		setSelectedIds((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId],
		);
	};

	const handleAddProducts = async () => {
		if (selectedIds.length === 0) return;

		setIsAdding(true);

		try {
			const results = await Promise.all(
				selectedIds.map((productId) =>
					addProductToSetup(setupId, productId),
				),
			);

			const failed = results.filter((r) => !r.success);

			if (failed.length === 0) {
				toast.success(
					`${selectedIds.length} product${selectedIds.length > 1 ? "s" : ""} added`,
				);
				onOpenChange(false);
				router.refresh();
			} else {
				toast.error(`Failed to add ${failed.length} product(s)`);
			}
		} catch (error) {
			toast.error("An error occurred");
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex max-h-[80vh] max-w-2xl flex-col">
				<DialogHeader>
					<DialogTitle>Add Products to Setup</DialogTitle>
					<DialogDescription>
						Select products from your collection to add to this setup
					</DialogDescription>
				</DialogHeader>
				<div className="flex-1 overflow-y-auto py-4">
					{loading && (
						<div className="flex items-center justify-center py-8">
							<Loader2 className="h-6 w-6 animate-spin" />
						</div>
					)}
					{error && (
						<div className="py-8 text-center text-destructive">
							Failed to load products
						</div>
					)}
					{!loading && !error && availableProducts.length === 0 && (
						<div className="py-8 text-center text-muted-foreground">
							<p className="mb-2">No products available to add</p>
							<p className="text-sm">
								All your products are already in this setup or you
								haven't created any products yet.
							</p>
						</div>
					)}
					{!loading && availableProducts.length > 0 && (
						<div className="space-y-2">
							{availableProducts.map((product) => {
								const primaryImage = product.images?.find(
									(img) => img?.isPrimary,
								)?.url;
								const isSelected = selectedIds.includes(product.id);

								return (
									<div
										key={product.id}
										onClick={() => toggleProduct(product.id)}
										className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
											isSelected
												? "border-primary bg-primary/5"
												: "hover:bg-muted/50"
										}`}
									>
										<input
											type="checkbox"
											className="h-4 w-4 flex-shrink-0 cursor-pointer rounded border-gray-300 text-blue-600"
											checked={isSelected}
											onChange={() => toggleProduct(product.id)}
										/>

										{/* Image */}
										<div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-muted">
											{primaryImage ? (
												<Image
													src={primaryImage}
													alt={product.title}
													fill
													className="object-cover"
												/>
											) : (
												<div className="flex h-full items-center justify-center">
													<span className="text-xl opacity-40">
														📦
													</span>
												</div>
											)}
										</div>

										{/* Info */}
										<div className="min-w-0 flex-1">
											<h4 className="truncate font-medium">
												{product.title}
											</h4>
											<p className="text-sm text-muted-foreground">
												${product.price.toFixed(2)}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
				<DialogFooter>
					<div className="flex w-full items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{selectedIds.length} selected
						</p>
						<div className="flex gap-2">
							<Button
								variant="outline"
								onClick={() => onOpenChange(false)}
							>
								Cancel
							</Button>
							<Button
								onClick={handleAddProducts}
								disabled={selectedIds.length === 0 || isAdding}
							>
								{isAdding ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Adding...
									</>
								) : (
									`Add ${selectedIds.length || ""} Product${selectedIds.length !== 1 ? "s" : ""}`
								)}
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
