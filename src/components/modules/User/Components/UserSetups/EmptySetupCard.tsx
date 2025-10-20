import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptySetupCardProps } from "./types";
import { getCategoryIcon, getCategoryLabel } from "./utils";

export function EmptySetupCard({ category }: EmptySetupCardProps) {
	const categoryUrl = category.toLowerCase().replace("_", "-");

	return (
		<div className="border-2 border-dashed border-muted-foreground/25 bg-muted/5 transition-colors hover:border-muted-foreground/50 hover:bg-muted/10">
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
					<span className="text-4xl opacity-40">
						{getCategoryIcon(category)}
					</span>
				</div>
				<h3 className="mb-2 text-lg font-semibold text-muted-foreground">
					No {getCategoryLabel(category)} Setup
				</h3>
				<p className="mb-6 text-sm text-muted-foreground">
					Create a setup to showcase your{" "}
					{getCategoryLabel(category).toLowerCase()} workspace
				</p>
				<Button asChild size="sm">
					<Link href={`/setup/create/${categoryUrl}`}>
						<Plus className="mr-2 h-4 w-4" />
						Create Setup
					</Link>
				</Button>
			</div>
		</div>
	);
}
