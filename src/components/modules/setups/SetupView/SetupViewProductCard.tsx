import { SetupViewProductCardProps } from "./types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const SetupViewProductCard = ({
	product,
	order,
}: SetupViewProductCardProps) => {
	return (
		<div className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg">
			<Link href={`/products/${product.id}`} className="block">
				<div className="relative mb-4 h-48 w-full overflow-hidden rounded-md">
					{product.images?.[0]?.url ? (
						<Image
							src={product.images[0].url}
							alt={product.title}
							fill
							className="object-cover transition-transform group-hover:scale-105"
						/>
					) : (
						<div className="flex h-full items-center justify-center rounded-md bg-muted">
							<div className="text-center">
								<div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted-foreground/10">
									<span className="text-lg">📸</span>
								</div>
								<p className="text-xs text-muted-foreground">
									No image
								</p>
							</div>
						</div>
					)}
					<div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-sm">
						#{order}
					</div>
				</div>
				<div className="space-y-2">
					<h3 className="line-clamp-2 font-semibold leading-tight">
						{product.title}
					</h3>

					<p className="text-xl font-bold text-primary">
						${product.price.toFixed(2)}
					</p>
					{product.categories && product.categories.length > 0 && (
						<div className="flex flex-wrap gap-1">
							{product.categories.slice(0, 2).map((cat) => (
								<Badge
									key={cat}
									variant="secondary"
									className="px-2 py-0.5 text-xs"
								>
									{cat}
								</Badge>
							))}
							{product.categories.length > 2 && (
								<Badge
									variant="outline"
									className="px-2 py-0.5 text-xs"
								>
									+{product.categories.length - 2}
								</Badge>
							)}
						</div>
					)}
				</div>
			</Link>
		</div>
	);
};
