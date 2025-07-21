import { BaseProps } from "@/components/utils/types";

export type GlobalSearchProps = BaseProps & {
	placeholder?: string;
	className?: string;
	autoFocus?: boolean;
	onFocus?: () => void;
	onBlur?: () => void;
};
