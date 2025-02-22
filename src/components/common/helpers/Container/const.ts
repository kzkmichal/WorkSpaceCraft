import { SpacingSize } from "./types";

export const sizes = {
	sm: "max-w-screen-sm",
	md: "max-w-screen-md",
	lg: "max-w-screen-lg",
	xl: "max-w-screen-xl",
	"2xl": "max-w-screen-2xl",
	full: "max-w-full",
};

export const PADDING_X: Record<SpacingSize, string> = {
	none: "px-0",
	sm: "px-2",
	md: "px-4",
	lg: "px-6",
	xl: "px-8",
	"2xl": "px-12",
};
export const PADDING_Y: Record<SpacingSize, string> = {
	none: "py-0",
	sm: "py-2",
	md: "py-4",
	lg: "py-6",
	xl: "py-8",
	"2xl": "py-12",
};
