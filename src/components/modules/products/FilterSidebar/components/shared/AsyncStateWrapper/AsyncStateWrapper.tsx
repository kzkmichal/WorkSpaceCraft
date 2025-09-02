import { Loader2 } from "lucide-react";
import { AsyncStateProps } from "./types";

export const AsyncStateWrapper = ({
	loading,
	error,
	data,
	loadingMessage = "Loading...",
	errorMessage = "Failed to load data",
	"data-testid": testId,
	children,
}: AsyncStateProps) => {
	if (loading) {
		return (
			<div
				className="flex items-center justify-center py-4"
				data-testid={testId ? `${testId}-loading` : undefined}
			>
				<Loader2 className="h-4 w-4 animate-spin" />
				<span className="ml-2 text-sm text-muted-foreground">
					{loadingMessage}
				</span>
			</div>
		);
	}

	if (error || !data) {
		return (
			<div
				className="text-sm text-muted-foreground"
				data-testid={testId ? `${testId}-error` : undefined}
			>
				{errorMessage}
			</div>
		);
	}

	return <>{children}</>;
};
