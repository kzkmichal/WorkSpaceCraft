import { BaseProps } from "@/components/utils/types";

export type SearchLoadingProps = BaseProps & {
	className?: string;
	message?: string;
};

export type SearchEmptyProps = BaseProps & {
	className?: string;
	query?: string;
	title?: string;
	description?: string;
	action?: React.ReactNode;
};

export type SearchErrorProps = {
	className?: string;
	title?: string;
	description?: string;
	onRetry?: () => void;
};

export type ProductListLoadingProps = {
	className?: string;
	count?: number;
};

export type SuggestionListLoadingProps = {
	className?: string;
	count?: number;
};
