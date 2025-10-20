"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Eye, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteSetupDialog } from "./DeleteSetupDialog";
import { publishSetup } from "@/app/actions/setup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SetupCardActionButtonsProps } from "./types";

export const SetupCardActionButtons = ({
	id,
	title,
	isDraft,
	category,
	productsCount,
}: SetupCardActionButtonsProps) => {
	const router = useRouter();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);

	const handlePublish = async () => {
		setIsPublishing(true);
		try {
			const result = await publishSetup(id);

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
		<>
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					className="flex-1"
					asChild
				>
					<Link
						href={`/setup/${category.toLowerCase().replace("_", "-")}/${id}/edit`}
					>
						<Edit className="mr-2 h-4 w-4" />
						Edit
					</Link>
				</Button>

				<Button
					variant="outline"
					size="sm"
					className="flex-1"
					asChild
				>
					<Link
						href={`/setup/${category.toLowerCase().replace("_", "-")}/${id}`}
					>
						<Eye className="mr-2 h-4 w-4" />
						View
					</Link>
				</Button>

				{isDraft && (
					<Button
						variant="default"
						size="sm"
						onClick={handlePublish}
						disabled={isPublishing || productsCount === 0}
						title={
							productsCount === 0
								? "Add at least 1 product to publish"
								: ""
						}
					>
						<Upload className="mr-2 h-4 w-4" />
						{isPublishing ? "Publishing..." : "Publish"}
					</Button>
				)}

				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsDeleteDialogOpen(true)}
					className="text-destructive hover:text-destructive"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>

			<DeleteSetupDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				setupId={id}
				setupTitle={title}
				onSuccess={() => router.refresh()}
			/>
		</>
	);
};
