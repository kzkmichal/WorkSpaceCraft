import { ButtonProps } from "../types";

export const defaultButtonProps: ButtonProps = {
	children: "Test Button",
	variant: "primary",
	size: "default",
	"data-testid": "test-button",
};

export const buttonVariants = [
	"primary",
	"secondary",
	"outline",
	"ghost",
	"destructive",
	"accent",
	"link",
	"default",
] as const;

export const buttonSizes = ["sm", "default", "lg", "icon"] as const;

export const testScenarios = {
	loading: {
		...defaultButtonProps,
		isLoading: true,
		children: "Loading Button",
	},
	disabled: {
		...defaultButtonProps,
		disabled: true,
		children: "Disabled Button",
	},
	withCustomClass: {
		...defaultButtonProps,
		className: "custom-class",
		children: "Custom Class Button",
	},
	withOnClick: {
		...defaultButtonProps,
		onClick: jest.fn(),
		children: "Clickable Button",
	},
	iconButton: {
		...defaultButtonProps,
		size: "icon" as const,
		variant: "outline" as const,
		children: "🔍",
	},
} as const;

export const accessibilityTestProps = {
	withAriaLabel: {
		...defaultButtonProps,
		"aria-label": "Close dialog",
		children: "×",
	},
	withAriaDescribedBy: {
		...defaultButtonProps,
		"aria-describedby": "button-description",
		children: "Save",
	},
	withRole: {
		...defaultButtonProps,
		role: "button",
		children: "Custom Role",
	},
} as const;
