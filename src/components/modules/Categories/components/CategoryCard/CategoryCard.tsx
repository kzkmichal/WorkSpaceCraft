import Image from "next/image";
import { CategoryCardProps } from "./types";
import { Stack } from "@/components/common/molecules";

export const CategoryCard = ({
	name,
	image,
	desc,
	reverse,
	"data-testid": testId = "category-card",
}: CategoryCardProps) => (
	<Stack
		className={`w-full lg:items-center ${reverse ? "lg:flex-row-reverse" : ""}`}
		direction={{ "": "column", lg: "row" }}
		spacing={{ "": 4, lg: 8 }}
		data-testid={testId}
	>
		<div className="flex flex-1 flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h2 className="font-regular text-left text-xl tracking-tighter md:text-3xl lg:max-w-xl">
					{name}
				</h2>
				<p className="text-muted-foreground max-w-xl text-left text-lg leading-relaxed tracking-tight lg:max-w-sm">
					{desc}
				</p>
			</div>
		</div>
		<div className="bg-muted aspect-video h-full w-full flex-1 rounded-md bg-slate-200">
			{image && name && (
				<Image
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className="rounded-md"
					src={image}
					alt={name}
				/>
			)}
		</div>
	</Stack>
);
