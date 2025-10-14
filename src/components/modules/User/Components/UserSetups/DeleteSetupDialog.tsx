"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DeleteSetupDialogProps } from "./types";
import { deleteSetup } from "@/app/actions/setup";
import { toast } from "sonner";

export function DeleteSetupDialog({
	open,
	onOpenChange,
	setupId,
	setupTitle,
	onSuccess,
}: DeleteSetupDialogProps) {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);

		try {
			const result = await deleteSetup(setupId);
			if (result.success) {
				toast.success("Setup deleted successfully");
				onOpenChange(false);
				onSuccess();
			} else {
				toast.error(result.error || "Failed to delete setup");
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center gap-2">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
							<AlertTriangle className="h-5 w-5 text-destructive" />
						</div>
						<AlertDialogTitle>Delete Setup?</AlertDialogTitle>
					</div>
					<AlertDialogDescription className="pt-2">
						Are you sure you want to delete{" "}
						<span className="font-semibold text-foreground">
							"{setupTitle}"
						</span>
						?
						<br />
						<br />
						This action cannot be undone. All products in this setup
						will be removed from it.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting ? "Deleting..." : "Delete Setup"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
