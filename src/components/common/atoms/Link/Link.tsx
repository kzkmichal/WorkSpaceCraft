import NextLink from "next/link";
import { LinkProps } from "./types";
import { cn } from "@/components/utils/helpers";
import { buttonVariants } from "@/components/ui/button";

export const Link = ({
	href,
	children,
	className,
	variant,
	disabled = false,
	external = false,
	size = "default",
	"data-testid": testId = "link",
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
			data-testid={testId}
			className={cn(
				disabled && "pointer-events-none opacity-50",
				variant && buttonVariants({ variant, size, className }),
			)}
			{...linkProps}
			{...props}
		>
			{children}
		</NextLink>
	);
};
