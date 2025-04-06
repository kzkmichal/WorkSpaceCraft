import { BaseProps } from "@/components/utils/types";

export type FilterOptionsProps = BaseProps;

export const FilterOptions = ({
	"data-testid": testId = "filters",
}: FilterOptionsProps) => {
	return (
		<div className="mb-6" data-testId={testId}>
			<h2 className="mb-2 text-lg font-semibold">Filter Options</h2>
			{/* TODO: Add filter options (e.g., category, price range) */}
		</div>
	);
};
