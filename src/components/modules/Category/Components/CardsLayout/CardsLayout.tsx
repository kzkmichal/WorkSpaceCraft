import { CardsLayoutProps } from "./types";
import { getCardSize } from "./utils";
import { cn } from "@/components/utils/helpers";

export const CardsLayout = ({
	items,
	className,
	"data-testid": testId = "cards-layout",
}: CardsLayoutProps) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 gap-8 lg:grid-cols-3",
				className,
			)}
			data-testid={testId}
		>
			{items?.map((item, index) => (
				<div
					key={index}
					className={cn(
						"bg-muted flex flex-col justify-between rounded-md p-6",
						getCardSize(index),
						getCardSize(index).includes("col-span-2")
							? "lg:aspect-auto"
							: "aspect-square",
					)}
					data-testid={`${testId}-card-${index}`}
				>
					<div className="flex flex-col">
						<h3 className="text-xl tracking-tight">{item.title}</h3>
						<p className="text-muted-foreground max-w-xs text-base">
							{item.desc}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};
