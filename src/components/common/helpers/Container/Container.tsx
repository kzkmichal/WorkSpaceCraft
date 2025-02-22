import React from "react";
import { ContainerProps } from "./types";
import { PADDING_X, PADDING_Y, sizes } from "./const";
import { cn } from "@/components/utils/helpers";
import { createResponsiveClasses } from "@/components/utils/responsive";

export const Container = ({
	children,
	size = "full",
	as: Component = "div",
	paddingX = { "": "sm", sm: "lg" },
	paddingY = { "": "lg" },
	className,
	"data-testid": dataTestId,
	"data-cc": dataCc,
	id,
}: ContainerProps) => {
	return (
		<Component
			id={id}
			data-testid={dataTestId}
			data-cc={dataCc}
			className={cn(
				"mx-auto",
				createResponsiveClasses(size, sizes),
				createResponsiveClasses(paddingX, PADDING_X),
				createResponsiveClasses(paddingY, PADDING_Y),
				className,
			)}
		>
			{children}
		</Component>
	);
};
