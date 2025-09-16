import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CategoryContentProps } from "../types";
import { cn } from "@/components/utils/helpers";

export const CategoryContent = ({
	category,
	className,
	"data-testid": testId = "category-content",
	...props
}: CategoryContentProps) => {
	const IconComponent = category.icon;

	return (
		<div
			className={cn("flex h-48 flex-col", className)}
			data-testid={testId}
			{...props}
		>
			<div className="mb-4 flex items-center gap-3 md:mb-6">
				<div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 bg-primary shadow-sm md:h-10 md:w-10">
					<IconComponent className="h-4 w-4 text-primary-foreground md:h-5 md:w-5" />
				</div>
				<h2
					className="text-xl font-bold text-slate-900 drop-shadow-lg md:text-2xl"
					style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
				>
					{category.title} Workspace
				</h2>
			</div>
			<p
				className="flex-1 text-sm leading-relaxed text-slate-800 drop-shadow-lg md:text-base lg:text-lg"
				style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.25)" }}
			>
				{category.description}
			</p>
		</div>
	);
};
