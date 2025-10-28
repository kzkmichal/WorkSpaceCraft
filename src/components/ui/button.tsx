import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/helpers";
import { BaseProps } from "../utils/types";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-primary font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
	{
		variants: {
			variant: {
				primary:
					"bg-primary hover:bg-primary/80 text-primary-foreground",
				secondary:
					"bg-secondary hover:bg-secondary/80 text-secondary-foreground",
				outline:
					"border border-accent bg-background text-accent-foreground hover:bg-accent",
				accent: "bg-accent hover:bg-accent/80 text-accent-foreground",
				default:
					"bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
				destructive:
					"bg-destructive hover:bg-destructive/90 text-destructive-foreground dark:bg-destructive dark:text-destructive-foreground",
				ghost:
					"hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
				link: "text-foreground underline-offset-4 hover:underline dark:tex-foreground",
			},
			size: {
				default: "px-4 py-2",
				sm: "py-1.5 px-3",
				lg: "py-2 px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "default",
		},
	},
);

export type ButtonProps =
	React.ButtonHTMLAttributes<HTMLButtonElement> &
		VariantProps<typeof buttonVariants> &
		BaseProps & {
			asChild?: boolean;
		};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			"data-testid": testId = "button",
			"data-cc": dataCc,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				data-testid={testId}
				data-cc={dataCc}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
