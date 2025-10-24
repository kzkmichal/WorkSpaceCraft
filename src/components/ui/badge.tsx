import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils/helpers";
import { BaseProps } from "../utils/types";
import { Url } from "url";
import Link from "next/link";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded border px-1 py-[2px] text-xs font-primary font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 w-fit",
	{
		variants: {
			variant: {
				default:
					"bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 border-zinc-100 dark:border-zinc-800",
				primary:
					"bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground border-primary dark:border-primary",
				secondary:
					"bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground border-secondary dark:border-secondary",
				accent:
					"bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground border-accent dark:border-accent",
				destructive:
					"bg-destructive text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground border-destructive dark:border-destructive",
				outline:
					"border border-accent bg-background text-accent-foreground dark:border-accent dark:bg-background dark:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof badgeVariants> &
	BaseProps & {
		isSelected?: boolean;
		url?: string | Url;
	};

function Badge({
	className,
	variant,
	url,
	isSelected = false,
	"data-testid": testId = "badge",
	"data-cc": dataCc,
	onClick,
	...props
}: BadgeProps) {
	const selectedVariantClasses = {
		default: "bg-zinc-100/80 dark:bg-zinc-800/80",
		primary: "bg-primary/80 dark:bg-primary/80",
		secondary:
			"bg-secondary/80 dark:bg-secondary/80 border-secondary-foreground",
		accent:
			"bg-accent/80 dark:bg-accent/80 border-accent-foreground hover:border-accent-foreground",
		destructive: "bg-destructive/80 dark:bg-destructive/80",
		outline:
			"bg-accent/80 dark:bg-accent/80 border-accent-foreground",
	};
	const urlVariantClasses = {
		default: "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
		primary: "hover:bg-primary/80 dark:hover:bg-primary/80",
		secondary:
			"hover:bg-secondary/80 dark:hover:bg-secondary/80 hover:border-secondary-foreground",
		accent:
			" hover:bg-accent/80 dark:hover:bg-accent/80 dark:hover:border-accent hover:border-accent-foreground",
		destructive:
			" hover:bg-destructive/80 dark:hover:bg-destructive/80",
		outline:
			"hover:bg-accent dark:hover:bg-accent/80 dark:hover:border-accent hover:border-accent",
	};

	const badgeContent = (
		<div
			className={cn(
				badgeVariants({ variant }),
				isSelected && variant && selectedVariantClasses[variant],
				url && variant && urlVariantClasses[variant],
				url && "cursor-pointer",
				className,
			)}
			data-testid={testId}
			data-cc={dataCc}
			onClick={onClick}
			{...props}
		/>
	);

	if (url && !onClick) {
		return <Link href={url}>{badgeContent}</Link>;
	}

	return badgeContent;
}

export { Badge, badgeVariants };
