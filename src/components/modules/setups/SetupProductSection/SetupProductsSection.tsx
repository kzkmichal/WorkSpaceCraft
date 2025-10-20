"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SetupProductsSectionProps } from "./types";
import { SetupProductItem } from "./SetupProductItem";
import { AddProductsModal } from "./AddProductsModal/AddProductsModal";
import { publishSetup } from "@/app/actions/setup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SetupProductsSection({
	setupId,
	products,
	setupStatus,
}: SetupProductsSectionProps) {
	const router = useRouter();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);

	const productsCount = products.length;
	const canPublish = productsCount >= 1 && setupStatus === "DRAFT";
	const isDraft = setupStatus === "DRAFT";

	const handlePublish = async () => {
		if (productsCount < 1) {
			toast.error("Add at least 1 product before publishing");
			return;
		}

		setIsPublishing(true);
		try {
			const result = await publishSetup(setupId);

			if (result.success) {
				toast.success("Setup published successfully!");
				router.refresh();
			} else {
				toast.error(result.error || "Failed to publish setup");
			}
		} catch (error) {
			toast.error("An error occurred");
		} finally {
			setIsPublishing(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">Products</h2>
					<p className="text-sm text-muted-foreground">
						{productsCount}{" "}
						{productsCount === 1 ? "product" : "products"} in this
						setup
					</p>
				</div>
				<Button onClick={() => setIsAddModalOpen(true)}>
					<Plus className="mr-2 h-4 w-4" />
					Add Products
				</Button>
			</div>
			{productsCount > 0 ? (
				<div className="space-y-3">
					{products.map((setupProduct, index) => (
						<SetupProductItem
							key={setupProduct.id}
							setupProduct={setupProduct}
							setupId={setupId}
							index={index}
						/>
					))}
				</div>
			) : (
				<div className="rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 py-12 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
						<span className="text-3xl opacity-40">📦</span>
					</div>
					<h3 className="mb-2 text-lg font-semibold text-muted-foreground">
						No products yet
					</h3>
					<p className="mb-6 text-sm text-muted-foreground">
						Add products to showcase in this setup
					</p>
					<Button onClick={() => setIsAddModalOpen(true)}>
						<Plus className="mr-2 h-4 w-4" />
						Add your first product
					</Button>
				</div>
			)}
			{isDraft && (
				<div className="rounded-lg border bg-muted/20 p-6">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h3 className="mb-2 text-lg font-semibold">
								Publish Setup
							</h3>
							{canPublish ? (
								<p className="text-sm text-muted-foreground">
									Your setup is ready to be published and shared with
									the community.
								</p>
							) : (
								<p className="text-sm text-amber-600">
									⚠️ Add at least 1 product to publish this setup
								</p>
							)}
						</div>
						<Button
							onClick={handlePublish}
							disabled={!canPublish || isPublishing}
							className="ml-4"
						>
							{isPublishing ? "Publishing..." : "Publish Setup"}
						</Button>
					</div>
				</div>
			)}

			<AddProductsModal
				open={isAddModalOpen}
				onOpenChange={setIsAddModalOpen}
				setupId={setupId}
				currentProductIds={products.map((p) => p.productId)}
			/>
		</div>
	);
}
