import { FilterSidebarProps } from "./types";
import { TagFilter } from "@/components/common/molecules/TagFilter";

export const FilterSidebar = ({
	popularTags,
	className,
	"data-testid": testId = "filter-sidebar",
}: FilterSidebarProps) => {
	return (
		<div className={className}>
			<div className="space-y-6">
				<TagFilter
					availableTags={popularTags}
					maxHeight="300px"
					data-testid={`${testId}-tag-filter`}
				/>
			</div>
		</div>
	);
};
