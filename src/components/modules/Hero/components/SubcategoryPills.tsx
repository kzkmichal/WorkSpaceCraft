import { SubcategoryPillsProps } from "../types";
import { cn } from "@/components/utils/helpers";
import Link from "next/link";

export const SubcategoryPills = ({
	subcategories,
	className,
	"data-testid": testId = "subcategory-pills",
	...props
}: SubcategoryPillsProps) => {
	return (
		<div
			className={cn("flex h-48 flex-col", className)}
			data-testid={testId}
			{...props}
		>
			<h3
				className="mb-4 text-base font-semibold text-slate-900 drop-shadow-lg md:mb-6 md:text-lg"
				style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
			>
				Popular Categories
			</h3>
			<div className="flex flex-1 flex-col">
				<div className="flex flex-wrap gap-2">
					{subcategories?.map(({ name, link }, index) => {
						return link ? (
							<Link
								key={name}
								href={link}
								className="group cursor-pointer rounded-full border border-border/70 bg-white/75 px-4 py-2 shadow-md backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:bg-primary/15 hover:shadow-lg"
								data-testid={`${testId}-pill-${index}`}
							>
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-primary opacity-80 transition-opacity group-hover:opacity-100"></div>
									<span
										className="text-sm font-medium text-slate-800 transition-colors group-hover:text-primary"
										style={{
											textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.1)",
										}}
									>
										{name}
									</span>
								</div>
							</Link>
						) : null;
					})}
				</div>
			</div>
		</div>
	);
};
