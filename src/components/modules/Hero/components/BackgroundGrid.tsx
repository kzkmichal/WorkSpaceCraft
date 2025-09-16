import Image from "next/image";
import { BackgroundGridProps } from "../types";
import { cn } from "@/components/utils/helpers";

export const BackgroundGrid = ({
	categories,
	activeCategory,
	className,
	"data-testid": testId = "background-grid",
	...props
}: BackgroundGridProps) => {
	return (
		<div
			className={cn("absolute inset-0 p-3 md:p-6", className)}
			data-testid={testId}
			{...props}
		>
			{categories.map((category) => (
				<div
					key={category.id}
					className={cn(
						"absolute inset-0 transition-opacity duration-700 ease-out",
						activeCategory.id === category.id
							? "opacity-100"
							: "opacity-0",
					)}
				>
					{/* Desktop Grid */}
					<div className="hidden h-full w-full md:block">
						<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
							<div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-sm">
								<Image
									src={category.images[0]}
									alt={`${category.title} Workspace 1`}
									fill
									className="object-cover"
									priority={activeCategory.id === category.id}
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-2 row-span-1 overflow-hidden rounded-xl shadow-sm">
								<Image
									src={category.images[1]}
									alt={`${category.title} Workspace 2`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[2]}
									alt={`${category.title} Workspace 3`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[3]}
									alt={`${category.title} Workspace 4`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-xl shadow-sm">
								<Image
									src={category.images[4]}
									alt={`${category.title} Workspace 5`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-2 row-span-1 overflow-hidden rounded-2xl shadow-sm">
								<Image
									src={category.images[5]}
									alt={`${category.title} Workspace 6`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[2]}
									alt={`${category.title} Workspace 7`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
						</div>
					</div>
					{/* Mobile Grid */}
					<div className="h-full w-full md:hidden">
						<div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2">
							<div className="relative col-span-2 row-span-1 overflow-hidden rounded-xl shadow-sm">
								<Image
									src={category.images[0]}
									alt={`${category.title} Workspace 1`}
									fill
									className="object-cover"
									priority={activeCategory.id === category.id}
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[1]}
									alt={`${category.title} Workspace 2`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[2]}
									alt={`${category.title} Workspace 3`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[3]}
									alt={`${category.title} Workspace 4`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
							<div className="relative col-span-1 row-span-1 overflow-hidden rounded-lg shadow-sm">
								<Image
									src={category.images[4]}
									alt={`${category.title} Workspace 5`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-black/5"></div>
								<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className="absolute inset-0 bg-black/10"></div>
		</div>
	);
};
