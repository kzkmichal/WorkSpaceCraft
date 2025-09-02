import { BaseProps } from "@/components/utils/types";

export type FilterMode = "instant" | "staged";

export type BaseFilterProps = BaseProps & {
	mode?: FilterMode;
};
