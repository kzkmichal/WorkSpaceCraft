import Image from "next/image";
import { AspectRatioProps } from "./types";
import { RATIO } from "./const";
import { cn } from "@/components/utils/helpers";

export const AspectRatio = ({
	ratio = "RATIO_1_1",
	className,
	"data-testid": testId,
	"data-cc": dataCc,
	id,
	src,
	alt,
	fill = true,
	quality = 90,
	priority = false,
	sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: AspectRatioProps) => {
	return (
		<div
			id={id}
			data-testid={testId}
			data-cc={dataCc}
			className={cn("relative w-full", className)}
			style={{ paddingBottom: `${(1 / RATIO[ratio]) * 100}%` }}
		>
			<Image
				src={src}
				alt={alt}
				fill={fill}
				quality={quality}
				priority={priority}
				sizes={sizes}
				className="object-cover"
				data-testid={`${testId}-image`}
			/>
		</div>
	);
};
