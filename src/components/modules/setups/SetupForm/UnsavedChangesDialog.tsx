"use client";

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

import { BaseProps } from "@/components/utils/types";

export type UnsavedChangesDialogProps = BaseProps & {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onDiscard: () => void;
	onSave?: () => void;
};

export function UnsavedChangesDialog({
	open,
	onOpenChange,
	onDiscard,
	onSave,
}: UnsavedChangesDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved changes. What would you like to do?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={onDiscard}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						Discard Changes
					</AlertDialogAction>
					{onSave && (
						<AlertDialogAction onClick={onSave}>
							Save & Leave
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
