import { RATIO } from "./const";
import { BaseProps } from "@/components/utils/types";

export type RatioType = keyof typeof RATIO;

export type AspectRatioProps = BaseProps & {
	ratio?: RatioType;
	src: string;
	alt: string;
	fill?: boolean;
	quality?: number;
	priority?: boolean;
	sizes?: string;
};
