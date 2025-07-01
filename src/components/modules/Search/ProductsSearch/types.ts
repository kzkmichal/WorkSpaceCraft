import { BaseProps } from "@/components/utils/types";

export type ProductsSearchProps = BaseProps & {
	placeholder?: string;
	className?: string;
	autoFocus?: boolean;
};
