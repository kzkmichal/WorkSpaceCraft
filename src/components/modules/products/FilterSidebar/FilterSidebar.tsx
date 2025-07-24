import { FilterSidebarProps } from "./types";
import { TagFilter } from "@/components/common/molecules/TagFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import { SubcategoryFilter } from "./components/SubcategoryFilter";
import { PriceRangeFilter } from "./components/PriceRangeFilter";
import { SortFilter } from "./components/SortFilter/SortFilter";

export const FilterSidebar = ({
	popularTags,
	className,
	"data-testid": testId = "filter-sidebar",
}: FilterSidebarProps) => {
	return (
		<div className={className}>
			<div className="space-y-6">
				<div>
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Categories
					</h3>
					<CategoryFilter data-testid={`${testId}-category-filter`} />
				</div>
				<div>
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Subcategories
					</h3>
					<SubcategoryFilter
						data-testid={`${testId}-subcategory-filter`}
					/>
				</div>
				<div>
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Price Range
					</h3>
					<PriceRangeFilter data-testid={`${testId}-price-filter`} />
				</div>
				<div>
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Sort By
					</h3>
					<SortFilter data-testid={`${testId}-sort-filter`} />
				</div>
				<div>
					<h3 className="mb-3 text-sm font-medium text-gray-900">
						Tags
					</h3>
					<TagFilter
						availableTags={popularTags}
						maxHeight="300px"
						data-testid={`${testId}-tag-filter`}
					/>
				</div>
			</div>
		</div>
	);
};
