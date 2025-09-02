import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from "@/components/ui/sheet";
import { FilterSidebar } from "../FilterSidebar";
import { useFilterStore } from "@/stores";
import type { MobileFilterSheetProps } from "./types";

export const MobileFilterSheet = ({
	popularTags,
	"data-testid": testId = "mobile-filter-sheet",
	className,
	mode = "staged",
}: MobileFilterSheetProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const isCommitting = useFilterStore((state) => state.isCommitting);
	const hasUncommittedChanges = useFilterStore((state) =>
		state.hasUncommittedChanges(),
	);
	const getActiveFiltersCount = useFilterStore(
		(state) => state.getActiveFiltersCount,
	);
	const commitStagedFilters = useFilterStore(
		(state) => state.commitStagedFilters,
	);
	const resetStagedFilters = useFilterStore(
		(state) => state.resetStagedFilters,
	);
	const clearAllFilters = useFilterStore(
		(state) => state.clearAllFilters,
	);

	const activeFiltersCount = getActiveFiltersCount();

	const handleApplyFilters = async () => {
		try {
			await commitStagedFilters();
			setIsOpen(false);
		} catch (error) {
			console.error("Error applying filters:", error);
		}
	};

	const handleOpenChange = (open: boolean) => {
		if (isCommitting) {
			return;
		}

		if (!open && hasUncommittedChanges) {
			const shouldDiscard = window.confirm(
				"You have unsaved filter changes. Discard them?",
			);
			if (shouldDiscard) {
				resetStagedFilters();
				setIsOpen(false);
			}
		} else {
			setIsOpen(open);
		}
	};

	const handleClearAll = () => {
		clearAllFilters();
		setIsOpen(false);
	};

	const handleCancel = () => {
		resetStagedFilters();
		setIsOpen(false);
	};

	return (
		<Sheet open={isOpen} onOpenChange={handleOpenChange}>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					className={`relative lg:hidden ${className || ""}`}
					data-testid={`${testId}-trigger`}
				>
					<Filter className="mr-2 h-4 w-4" />
					Filters
					{activeFiltersCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
						>
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</SheetTrigger>

			<SheetContent
				side="left"
				className="w-80 overflow-y-auto"
				data-testid={testId}
			>
				<SheetHeader>
					<SheetTitle className="flex items-center justify-between">
						Filters
						{hasUncommittedChanges && (
							<Badge variant="secondary" className="text-xs">
								Unsaved changes
							</Badge>
						)}
					</SheetTitle>
				</SheetHeader>

				<div className="py-4">
					<FilterSidebar
						popularTags={popularTags}
						mode={mode}
						data-testid={`${testId}-sidebar`}
					/>
				</div>

				<SheetFooter className="flex-col gap-2">
					<Button
						onClick={handleApplyFilters}
						disabled={!hasUncommittedChanges}
						className="w-full"
						data-testid={`${testId}-apply`}
					>
						{isCommitting ? "Applying..." : "Apply Filters"}
					</Button>

					<div className="flex w-full gap-2">
						<Button
							variant="outline"
							onClick={handleClearAll}
							className="flex-1"
							data-testid={`${testId}-clear-all`}
						>
							Clear All
						</Button>
						<Button
							variant="ghost"
							onClick={handleCancel}
							className="flex-1"
							data-testid={`${testId}-cancel`}
						>
							Cancel
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
