import { StackProps } from "./types";
import { alignments, directions, flexWrap, gaps } from "./const";
import { createResponsiveClasses } from "@/components/utils/responsive";
import { cn } from "@/components/utils/helpers";

export const Stack = ({
	children,
	direction,
	spacing,
	align = "start",
	wrap = false,
	className,
	"data-testid": testId,
	"data-cc": dataCc,
	id,
}: StackProps) => {
	return (
		<div
			id={id}
			data-testid={testId}
			data-cc={dataCc}
			className={cn(
				"flex",
				createResponsiveClasses(direction, directions),
				createResponsiveClasses(wrap, flexWrap),
				createResponsiveClasses(spacing, gaps),
				createResponsiveClasses(align, alignments),
				className,
			)}
		>
			{children}
		</div>
	);
};
