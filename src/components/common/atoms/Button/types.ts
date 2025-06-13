import { ButtonHTMLAttributes } from "react";
import { BaseProps } from "@/components/utils/types";

export type ButtonVariant =
	| "default"
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "destructive"
	| "accent"
	| "link";
export type ButtonSize = "sm" | "default" | "lg" | "icon";

export type SharedButtonProps = BaseProps & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
};

export type ButtonProps = SharedButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement>;
