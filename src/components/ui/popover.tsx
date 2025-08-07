"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../utils/helpers";
import { BaseProps } from "@/components/utils/types";

export type PopoverProps = BaseProps &
	React.ComponentProps<typeof PopoverPrimitive.Root>;

export type PopoverTriggerProps = BaseProps &
	React.ComponentProps<typeof PopoverPrimitive.Trigger>;

export type PopoverContentProps = BaseProps &
	React.ComponentProps<typeof PopoverPrimitive.Content>;

export type PopoverAnchorProps = BaseProps &
	React.ComponentProps<typeof PopoverPrimitive.Anchor>;

const Popover = ({
	"data-testid": testId = "popover",
	...props
}: PopoverProps) => {
	return (
		<PopoverPrimitive.Root
			data-slot="popover"
			data-testid={testId}
			{...props}
		/>
	);
};

const PopoverTrigger = ({
	"data-testid": testId = "popover-trigger",
	...props
}: PopoverTriggerProps) => {
	return (
		<PopoverPrimitive.Trigger
			data-slot="popover-trigger"
			data-testid={testId}
			{...props}
		/>
	);
};

const PopoverContent = ({
	className,
	align = "center",
	sideOffset = 4,
	"data-testid": testId = "popover-content",
	...props
}: PopoverContentProps) => {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				data-testid={testId}
				className={cn(
					"origin-(--radix-popover-content-transform-origin) outline-hidden z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
};

const PopoverAnchor = ({
	"data-testid": testId = "popover-anchor",
	...props
}: PopoverAnchorProps) => {
	return (
		<PopoverPrimitive.Anchor
			data-slot="popover-anchor"
			data-testid={testId}
			{...props}
		/>
	);
};

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
