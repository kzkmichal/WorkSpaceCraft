import { render, screen, fireEvent } from "@/tests/utils/render";
import { Button } from "../Button";
import {
	defaultButtonProps,
	buttonVariants,
	buttonSizes,
	testScenarios,
	accessibilityTestProps,
} from "./data";

jest.mock("@/components/utils/helpers", () => ({
	cn: (...classes: unknown[]) => classes.filter(Boolean).join(" "),
}));

jest.mock("@/components/ui/button", () => ({
	Button: jest.fn(({ children, className, ...props }) => (
		<button className={className} {...props}>
			{children}
		</button>
	)),
}));

describe("Button Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Basic Rendering", () => {
		it("renders with default props", () => {
			render(<Button {...defaultButtonProps} />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Test Button");
		});

		it("renders children correctly", () => {
			render(<Button {...defaultButtonProps}>Custom Content</Button>);

			expect(screen.getByText("Custom Content")).toBeInTheDocument();
		});

		it("applies custom className", () => {
			render(<Button {...testScenarios.withCustomClass} />);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveClass("custom-class");
		});

		it("applies default data-testid when not provided", () => {
			const { "data-testid": _, ...propsWithoutTestId } =
				defaultButtonProps;
			render(<Button {...propsWithoutTestId} />);

			expect(screen.getByTestId("button")).toBeInTheDocument();
		});
	});

	describe("Variants", () => {
		it.each(buttonVariants)(
			"renders %s variant correctly",
			(variant) => {
				render(
					<Button
						{...defaultButtonProps}
						variant={variant}
						data-testid={`button-${variant}`}
					/>,
				);

				const button = screen.getByTestId(`button-${variant}`);
				expect(button).toBeInTheDocument();
			},
		);
	});

	describe("Sizes", () => {
		it.each(buttonSizes)("renders %s size correctly", (size) => {
			render(
				<Button
					{...defaultButtonProps}
					size={size}
					data-testid={`button-${size}`}
				/>,
			);

			const button = screen.getByTestId(`button-${size}`);
			expect(button).toBeInTheDocument();
		});
	});

	describe("Loading State", () => {
		it("shows loading spinner when isLoading is true", () => {
			render(<Button {...testScenarios.loading} />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Loading Button");

			// Check for loading spinner (div with specific classes)
			const spinner = button.querySelector(
				"div.h-4.w-4.animate-spin.rounded-full.border-2.border-current.border-t-transparent",
			);
			expect(spinner).toBeInTheDocument();
		});

		it("disables button when isLoading is true", () => {
			render(<Button {...testScenarios.loading} />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeDisabled();
		});

		it("does not show loading spinner when isLoading is false", () => {
			render(<Button {...defaultButtonProps} isLoading={false} />);

			const button = screen.getByTestId("test-button");
			const spinner = button.querySelector(
				"div.h-4.w-4.animate-spin.rounded-full.border-2.border-current.border-t-transparent",
			);
			expect(spinner).not.toBeInTheDocument();
		});
	});

	describe("Disabled State", () => {
		it("disables button when disabled prop is true", () => {
			render(<Button {...testScenarios.disabled} />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeDisabled();
		});

		it("disables button when both disabled and isLoading are true", () => {
			render(
				<Button
					{...defaultButtonProps}
					disabled={true}
					isLoading={true}
				/>,
			);

			const button = screen.getByTestId("test-button");
			expect(button).toBeDisabled();
		});
	});

	describe("Event Handling", () => {
		it("calls onClick when clicked", () => {
			const mockOnClick = jest.fn();
			render(
				<Button {...defaultButtonProps} onClick={mockOnClick} />,
			);

			const button = screen.getByTestId("test-button");
			fireEvent.click(button);

			expect(mockOnClick).toHaveBeenCalledTimes(1);
		});

		it("does not call onClick when disabled", () => {
			const mockOnClick = jest.fn();
			render(
				<Button
					{...defaultButtonProps}
					onClick={mockOnClick}
					disabled={true}
				/>,
			);

			const button = screen.getByTestId("test-button");
			fireEvent.click(button);

			expect(mockOnClick).not.toHaveBeenCalled();
		});

		it("does not call onClick when loading", () => {
			const mockOnClick = jest.fn();
			render(
				<Button
					{...defaultButtonProps}
					onClick={mockOnClick}
					isLoading={true}
				/>,
			);

			const button = screen.getByTestId("test-button");
			fireEvent.click(button);

			expect(mockOnClick).not.toHaveBeenCalled();
		});
	});

	describe("HTML Attributes", () => {
		it("applies type attribute correctly", () => {
			render(<Button {...defaultButtonProps} type="submit" />);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute("type", "submit");
		});

		it("defaults to type='button'", () => {
			render(<Button {...defaultButtonProps} />);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute("type", "button");
		});

		it("applies custom data attributes", () => {
			render(
				<Button
					{...defaultButtonProps}
					data-cc="custom-tracking"
					data-custom="test-value"
				/>,
			);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute("data-cc", "custom-tracking");
			expect(button).toHaveAttribute("data-custom", "test-value");
		});
	});

	describe("Accessibility", () => {
		it("supports aria-label", () => {
			render(<Button {...accessibilityTestProps.withAriaLabel} />);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute("aria-label", "Close dialog");
		});

		it("supports aria-describedby", () => {
			render(
				<Button {...accessibilityTestProps.withAriaDescribedBy} />,
			);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute(
				"aria-describedby",
				"button-description",
			);
		});

		it("supports custom role", () => {
			render(<Button {...accessibilityTestProps.withRole} />);

			const button = screen.getByTestId("test-button");
			expect(button).toHaveAttribute("role", "button");
		});

		it("is focusable when not disabled", () => {
			render(<Button {...defaultButtonProps} />);

			const button = screen.getByTestId("test-button");
			button.focus();
			expect(button).toHaveFocus();
		});

		it("is not focusable when disabled", () => {
			render(<Button {...testScenarios.disabled} />);

			const button = screen.getByTestId("test-button");
			button.focus();
			expect(button).not.toHaveFocus();
		});
	});

	describe("Integration with ShadcnButton", () => {
		const mockShadcnButton = require("@/components/ui/button").Button;

		it("passes all props to ShadcnButton", () => {
			render(
				<Button
					{...defaultButtonProps}
					variant="secondary"
					size="lg"
					className="test-class"
				/>,
			);

			expect(mockShadcnButton).toHaveBeenCalledWith(
				expect.objectContaining({
					variant: "secondary",
					size: "lg",
					disabled: false,
					"data-testid": "test-button",
					className: "test-class",
					type: "button",
					children: expect.anything(),
				}),
				expect.anything(),
			);
		});

		it("combines disabled state from props and loading state", () => {
			render(
				<Button
					{...defaultButtonProps}
					disabled={false}
					isLoading={true}
				/>,
			);

			expect(mockShadcnButton).toHaveBeenCalledWith(
				expect.objectContaining({
					disabled: true, // should be true because isLoading is true
				}),
				expect.anything(),
			);
		});
	});

	describe("Edge Cases", () => {
		it("handles undefined children", () => {
			render(<Button {...defaultButtonProps} children={undefined} />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeInTheDocument();
		});

		it("handles empty string children", () => {
			render(<Button {...defaultButtonProps} children="" />);

			const button = screen.getByTestId("test-button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("");
		});

		it("handles JSX children", () => {
			render(
				<Button {...defaultButtonProps}>
					<span>Icon</span>
					<span>Text</span>
				</Button>,
			);

			expect(screen.getByText("Icon")).toBeInTheDocument();
			expect(screen.getByText("Text")).toBeInTheDocument();
		});

		it("handles both isLoading and disabled being true", () => {
			render(
				<Button
					{...defaultButtonProps}
					isLoading={true}
					disabled={true}
				/>,
			);

			const button = screen.getByTestId("test-button");
			expect(button).toBeDisabled();

			// Should still show loading spinner
			const spinner = button.querySelector(
				"div.h-4.w-4.animate-spin.rounded-full.border-2.border-current.border-t-transparent",
			);
			expect(spinner).toBeInTheDocument();
		});
	});
});
