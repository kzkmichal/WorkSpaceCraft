import { ResponsiveProps } from "@/components/utils/responsive";
import { WithChildrenProps } from "@/components/utils/types";

type Direction = "row" | "column";
type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type Alignment =
	| "start"
	| "center"
	| "end"
	| "between"
	| "around"
	| "evenly";

export type StackProps = WithChildrenProps &
	ResponsiveProps<{
		direction?: Direction;
		spacing?: Spacing;
		align?: Alignment;
		wrap?: boolean;
	}>;
