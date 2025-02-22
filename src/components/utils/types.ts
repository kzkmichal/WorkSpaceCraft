import { PropsWithChildren, RefObject } from "react";

export type BaseProps = {
	className?: string;
	"data-testid"?: string;
	"data-cc"?: string;
	id?: string;
};

export type InteractiveProps = BaseProps & {
	disabled?: boolean;
	"aria-label"?: string;
	"aria-describedby"?: string;
	tabIndex?: number;
};

export type WithChildrenProps = BaseProps & PropsWithChildren;

export type WithRef<T> = {
	ref?: RefObject<T>;
};
