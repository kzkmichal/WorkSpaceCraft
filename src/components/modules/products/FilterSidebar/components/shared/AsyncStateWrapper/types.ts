import { ReactNode } from "react";

export type AsyncStateProps = {
	loading: boolean;
	error?: Error | null;
	data?: any;
	loadingMessage?: string;
	errorMessage?: string;
	"data-testid"?: string;
	children: ReactNode;
};
