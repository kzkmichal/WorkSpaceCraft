import { ElementType } from "react";
import { WithChildrenProps } from "@/components/utils/types";
import { ResponsiveProps } from "@/components/utils/responsive";

export type ContainerSize =
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "full";

export type SpacingSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ContainerProps = WithChildrenProps &
	ResponsiveProps<{
		size?: ContainerSize;
		paddingX?: SpacingSize;
		paddingY?: SpacingSize;
	}> & {
		as?: ElementType;
		wrapperClassName?: string;
	};
