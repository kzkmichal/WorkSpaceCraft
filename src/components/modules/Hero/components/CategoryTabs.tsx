import { Button } from "@/components/ui/button";
import { CategoryTabsProps } from "../types";
import { cn } from "@/components/utils/helpers";

export const CategoryTabs = ({
	categories,
	activeCategory,
	onCategoryChange,
	className,
	"data-testid": testId = "category-tabs",
	...props
}: CategoryTabsProps) => {
	return (
		<div
			className={cn("mb-6 flex justify-center md:mb-8", className)}
			data-testid={testId}
			{...props}
		>
			<div className="overflow-x-auto">
				<div className="inline-flex space-x-2 rounded-lg border border-border/60 bg-white/40 p-2 shadow-lg backdrop-blur-sm">
					{categories.map((category) => {
						const CategoryIcon = category.icon;
						return (
							<Button
								key={category.id}
								onClick={() => onCategoryChange(category)}
								variant={
									activeCategory.id === category.id
										? "default"
										: "ghost"
								}
								size="sm"
								data-testid={`${testId}-tab-${category.id}`}
								className={cn(
									"flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 md:gap-3 md:px-6 md:py-3 md:text-base",
									activeCategory.id === category.id
										? "border border-border/60 bg-white/80 text-slate-900 shadow-md hover:bg-white"
										: "text-slate-700 hover:bg-white/50 hover:text-slate-900",
								)}
								style={{
									textShadow:
										activeCategory.id === category.id
											? "1px 1px 2px rgba(0,0,0,0.2)"
											: "0.5px 0.5px 1px rgba(0,0,0,0.1)",
								}}
							>
								<CategoryIcon className="h-4 w-4 md:h-5 md:w-5" />
								{category.title}
							</Button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
