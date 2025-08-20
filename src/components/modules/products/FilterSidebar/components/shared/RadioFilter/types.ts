import { BaseProps } from "@/components/utils/types";
import { ReactNode } from "react";

export type RadioFilterOption = {
	value?: string;
	label?: string;
	count?: number;
	badge?: ReactNode;
};

export type RadioFilterProps = BaseProps & {
	name: string;
	options: RadioFilterOption[];
	value?: string;
	onChange: (value?: string) => void;
	defaultLabel?: string;
	defaultValue?: string;
};
