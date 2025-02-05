import NextLink from "next/link";
import { LinkProps } from "./types";
import { variants } from "./const";
import { cn } from "@/components/utils/helpers";

export const Link = ({
	href,
	children,
	className,
	variant = "default",
	disabled = false,
	external = false,
	...props
}: LinkProps) => {
	const linkProps = external
		? {
				target: "_blank",
				rel: "noopener noreferrer",
			}
		: {};

	return (
		<NextLink
			href={href}
			className={cn(
				"transition-colors",
				variants[variant],
				disabled && "pointer-events-none opacity-50",
				className,
			)}
			{...linkProps}
			{...props}
		>
			{children}
		</NextLink>
	);
};
