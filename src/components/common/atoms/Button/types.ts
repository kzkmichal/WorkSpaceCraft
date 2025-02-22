import { ButtonHTMLAttributes } from "react";
import { BaseProps } from "@/components/utils/types";

export type ButtonVariant =
	| "default"
	| "secondary"
	| "outline"
	| "ghost"
	| "link";
export type ButtonSize = "sm" | "default" | "lg";

export type SharedButtonProps = BaseProps & {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
};

export type ButtonProps = SharedButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement>;
