import { FilterSidebarProps } from "./types";
import { TagFilter } from "@/components/common/molecules/TagFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import { SubcategoryFilter } from "./components/SubcategoryFilter";
import { PriceRangeFilter } from "./components/PriceRangeFilter";
import { SortFilter } from "./components/SortFilter/SortFilter";
import { FilterItem } from "./components/shared/FilterItem";
import { cn } from "@/components/utils/helpers";

export const FilterSidebar = ({
	popularTags,
	mode = "staged",
	className,
	"data-testid": testId = "filter-sidebar",
}: FilterSidebarProps) => {
	return (
		<ul
			className={cn("flex flex-col gap-4", className)}
			data-testid={testId}
		>
			<FilterItem
				name="Categories"
				data-testid={`${testId}-filter-item`}
			>
				<CategoryFilter
					data-testid={`${testId}-category-filter`}
					mode={mode}
				/>
			</FilterItem>
			<FilterItem
				name="Subcategories"
				data-testid={`${testId}-subcategory-filter`}
			>
				<SubcategoryFilter
					data-testid={`${testId}-subcategory-filter`}
					mode={mode}
				/>
			</FilterItem>
			<FilterItem
				name="Price Range"
				data-testid={`${testId}-price-range-filter`}
			>
				<PriceRangeFilter
					data-testid={`${testId}-price-range-filter`}
					mode={mode}
				/>
			</FilterItem>
			<FilterItem
				name="Sort By"
				data-testid={`${testId}-sort-filter`}
			>
				<SortFilter
					data-testid={`${testId}-sort-filter`}
					mode={mode}
				/>
			</FilterItem>
			<FilterItem name="Tags" data-testid={`${testId}-tag-filter`}>
				<TagFilter
					availableTags={popularTags}
					maxHeight="200px"
					data-testid={`${testId}-tag-filter`}
					mode={mode}
				/>
			</FilterItem>
		</ul>
	);
};
