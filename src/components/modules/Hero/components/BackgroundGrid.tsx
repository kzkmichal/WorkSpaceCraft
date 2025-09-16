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
			{categories.map((category, categoryIndex) => {
				const isActive = activeCategory.id === category.id;
				const isFirstCategory = categoryIndex === 0;

				return (
					<div
						key={category.id}
						className={cn(
							"absolute inset-0 transition-opacity duration-700 ease-out",
							isActive ? "opacity-100" : "opacity-0",
						)}
					>
						{/* Desktop Grid */}
						<div className="hidden h-full w-full md:block">
							<div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-4">
								{category.images.map((imageSrc, imageIndex) => {
									const shouldPrioritize =
										isFirstCategory && imageIndex === 0;

									const getGridClasses = (index: number) => {
										switch (index) {
											case 0:
												return "col-span-2 row-span-2 rounded-2xl";
											case 1:
												return "col-span-2 row-span-1 rounded-xl";
											case 2:
											case 3:
											case 4:
												return "col-span-1 row-span-1 rounded-lg";
											case 5:
												return "col-span-2 row-span-1 rounded-2xl";
											case 6:
												return "col-span-1 row-span-1 rounded-lg";
											default:
												return "col-span-1 row-span-1 rounded-lg";
										}
									};

									const getSizes = (index: number) => {
										switch (index) {
											case 0:
												return "(max-width: 768px) 100vw, 50vw";
											case 1:
											case 5:
												return "(max-width: 768px) 100vw, 25vw";
											default:
												return "(max-width: 768px) 50vw, 12.5vw";
										}
									};

									return (
										<div
											key={`${category.id}-${imageIndex}`}
											className={cn(
												"relative overflow-hidden shadow-sm",
												getGridClasses(imageIndex),
											)}
										>
											<Image
												src={imageSrc}
												alt={`${category.title} Workspace ${imageIndex + 1}`}
												fill
												className="object-cover"
												{...(shouldPrioritize
													? { priority: true }
													: { loading: "lazy" })}
												quality={isActive ? 85 : 70}
												sizes={getSizes(imageIndex)}
												placeholder="blur"
												blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="
											/>
											{isActive && (
												<>
													<div className="absolute inset-0 bg-black/5"></div>
													<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* Mobile Grid */}
						<div className="h-full w-full md:hidden">
							<div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2">
								{category.images
									.slice(0, 6)
									.map((imageSrc, imageIndex) => {
										const shouldPrioritize =
											isFirstCategory && imageIndex === 0;

										const getMobileGridClasses = (index: number) => {
											switch (index) {
												case 0:
													return "col-span-2 row-span-1 rounded-xl";
												default:
													return "col-span-1 row-span-1 rounded-lg";
											}
										};

										return (
											<div
												key={`${category.id}-mobile-${imageIndex}`}
												className={cn(
													"relative overflow-hidden shadow-sm",
													getMobileGridClasses(imageIndex),
												)}
											>
												<Image
													src={imageSrc}
													alt={`${category.title} Mobile Workspace ${imageIndex + 1}`}
													fill
													className="object-cover"
													{...(shouldPrioritize
														? { priority: true }
														: { loading: "lazy" })}
													quality={75}
													sizes="(max-width: 768px) 100vw"
													placeholder="blur"
													blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="
												/>
												{isActive && (
													<>
														<div className="absolute inset-0 bg-black/5"></div>
														<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
													</>
												)}
											</div>
										);
									})}
							</div>
						</div>
					</div>
				);
			})}
			<div className="absolute inset-0 bg-black/10"></div>
		</div>
	);
};
