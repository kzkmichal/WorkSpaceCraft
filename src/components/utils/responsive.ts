import { BaseProps } from "./types";

export type ResponsiveValue<T> = {
	""?: T;
	xs?: T;
	sm?: T;
	md?: T;
	lg?: T;
	xl?: T;
	"2xl"?: T;
};

export type MakeResponsive<T> = T | ResponsiveValue<T>;

export type ResponsiveProps<T> = {
	[K in keyof T]: MakeResponsive<T[K]>;
};

export type WithResponsiveProps<T> = BaseProps & ResponsiveProps<T>;

export const createResponsiveClasses = <T>(
	prop: T | ResponsiveValue<T> | undefined,
	classMap: Record<string, string>,
): string => {
	if (!prop) return "";

	if (typeof prop !== "object") {
		return classMap[prop as string];
	}

	return Object.entries(prop)
		.map(([breakpoint, value]) => {
			if (!value) return "";
			const className = classMap[value as string];
			return breakpoint === ""
				? className
				: `${breakpoint}:${className}`;
		})
		.join(" ");
};
