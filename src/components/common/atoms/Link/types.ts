import { ComponentPropsWithoutRef } from "react";
import { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = Omit<
	ComponentPropsWithoutRef<"a">,
	keyof NextLinkProps
> &
	NextLinkProps & {
		variant?: "default" | "ghost" | "underline";
		disabled?: boolean;
		external?: boolean;
	};
