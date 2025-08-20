import { FilterItemProps } from "./types";

export const FilterItem = ({
	name,
	children,
	"data-testid": testId = "filter-item",
}: FilterItemProps) => {
	return (
		<li data-testid={testId} className="flex flex-col gap-3">
			<h3 className="text-lg font-medium">{name || "Filter"}</h3>
			{children}
		</li>
	);
};
