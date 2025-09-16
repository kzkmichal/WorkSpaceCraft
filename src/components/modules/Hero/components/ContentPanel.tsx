import { ContentPanelProps } from "../types";
import { CategoryTabs } from "./CategoryTabs";
import { CategoryContent } from "./CategoryContent";
import { SubcategoryPills } from "./SubcategoryPills";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/components/utils/helpers";
import Link from "next/link";

export const ContentPanel = ({
	categories,
	activeCategory,
	onCategoryChange,
	className,
	"data-testid": testId = "content-panel",
	...props
}: ContentPanelProps) => {
	return (
		<div
			className={cn(
				"absolute inset-0 flex items-center justify-center",
				className,
			)}
			data-testid={testId}
			{...props}
		>
			<div
				className="mx-4 w-full max-w-4xl rounded-2xl border border-border/50 bg-background/40 p-6 shadow-xl backdrop-blur-2xl md:p-12"
				style={{
					background:
						"linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.25) 100%)",
					backdropFilter: "blur(20px)",
					WebkitBackdropFilter: "blur(20px)",
					boxShadow:
						"0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)",
				}}
			>
				{/* Header */}
				<div className="mb-6 text-center md:mb-8">
					<p
						className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-700 drop-shadow-lg md:mb-4 md:text-base"
						style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
					>
						Workspace Solutions
					</p>
					<h1
						className="mb-4 text-3xl font-bold leading-tight text-slate-900 drop-shadow-lg md:mb-6 md:text-5xl lg:text-6xl"
						style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
					>
						Find Your Perfect
						<br />
						<span
							className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg"
							style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
						>
							Work Environment
						</span>
					</h1>
					<p
						className="mx-auto max-w-3xl text-base leading-relaxed text-slate-700 drop-shadow-lg md:text-xl"
						style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.25)" }}
					>
						Discover curated workspace essentials tailored to your
						unique work style and environment needs.
					</p>
				</div>
				<CategoryTabs
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={onCategoryChange}
					data-testid={`${testId}-category-tabs`}
				/>
				<div className="mb-6 grid gap-6 md:mb-8 md:grid-cols-2 md:gap-12">
					<CategoryContent
						category={activeCategory}
						data-testid={`${testId}-category-content`}
					/>
					<SubcategoryPills
						subcategories={activeCategory.subcategories}
						data-testid={`${testId}-subcategory-pills`}
					/>
				</div>
				<div className="flex justify-center">
					<Button
						className="group rounded-lg border border-border/30 px-8 py-4 text-base shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
						data-testid={`${testId}-cta-button`}
						asChild
					>
						<Link href={activeCategory.link}>
							<span>{activeCategory.buttonText}</span>
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
