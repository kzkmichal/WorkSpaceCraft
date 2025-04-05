import { cn } from "@/components/utils/helpers";

type FormSubmitProps = {
	children: React.ReactNode;
	isLoading?: boolean;
	className?: string;
	loadingText?: string;
};

export const SubmitButton = ({
	children,
	isLoading = false,
	className,
	loadingText = "Processing...",
}: FormSubmitProps) => {
	return (
		<button
			type="submit"
			disabled={isLoading}
			className={cn(
				"flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50",
				className,
			)}
		>
			{isLoading ? loadingText : children}
		</button>
	);
};
