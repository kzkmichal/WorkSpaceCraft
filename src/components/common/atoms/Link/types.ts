import { ComponentPropsWithoutRef } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { BaseProps } from "@/components/utils/types";

type LinkVariantType =
	| "default"
	| "ghost"
	| "primary"
	| "secondary"
	| "outline"
	| "accent"
	| "destructive"
	| "link";

export type LinkProps = BaseProps &
	Omit<ComponentPropsWithoutRef<"a">, keyof NextLinkProps> &
	NextLinkProps & {
		variant?: LinkVariantType;
		disabled?: boolean;
		external?: boolean;
		linkWrapper?: boolean;
		size?: "sm" | "default" | "lg";
	};
