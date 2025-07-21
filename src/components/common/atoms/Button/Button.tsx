import { ButtonProps } from "./types";
import { cn } from "@/components/utils/helpers";
import { Button as ShadcnButton } from "@/components/ui/button";

export const Button = ({
	children,
	className,
	variant = "primary",
	size = "default",
	isLoading,
	disabled,
	"data-testid": dataTestId = "button",
	"data-cc": dataCc,
	type = "button",
	...props
}: ButtonProps) => {
	return (
		<ShadcnButton
			type={type}
			variant={variant}
			size={size}
			disabled={disabled || isLoading}
			data-testid={dataTestId}
			data-cc={dataCc}
			className={cn(className)}
			{...props}
		>
			{isLoading ? (
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
					{children}
				</div>
			) : (
				children
			)}
		</ShadcnButton>
	);
};
